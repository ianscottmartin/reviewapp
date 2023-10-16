from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin

from config import db, bcrypt

user_review_association = db.Table(
    'user_review_association',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('review_id', db.Integer, db.ForeignKey('reviews.id'), primary_key=True)
)

class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True)
    _password_hash = db.Column(db.String)

    @hybrid_property
    def password_hash(self):
        raise Exception("Password hashes may not be viewed.")

    @password_hash.setter
    def password_hash(self, password):
        bcrypt_hash = bcrypt.generate_password_hash(password).decode("utf-8")
        self._password_hash = bcrypt_hash

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password)

    reviews = db.relationship(
        'Review',
        secondary=user_review_association,
        primaryjoin=(id == user_review_association.c.user_id),
        secondaryjoin=(id == user_review_association.c.review_id),
        back_populates='users'
    )

    def __repr__(self):
        return f"User {self.username}, ID: {self.id}"

class Artist(db.Model):
    __tablename__ = 'artists'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(55), nullable=False, unique=True)
    work = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255), nullable=False)

    
    reviews = db.relationship('Review', back_populates='artist')

class Museum(db.Model):
    __tablename__ = 'museums'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(55), nullable=False)
    location = db.Column(db.String(55), nullable=False)

class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    artist_id = db.Column(db.Integer, db.ForeignKey('artists.id'), nullable=False)

    
    users = db.relationship(
        'User',
        secondary=user_review_association,
        primaryjoin=(id == user_review_association.c.review_id),
        secondaryjoin=(id == user_review_association.c.user_id),
        back_populates='reviews'
    )


    artist = db.relationship('Artist', back_populates='reviews')
