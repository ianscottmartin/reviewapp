from faker import Faker
from models import User, Artist, Museum, Review
from config import db, app, bcrypt

faker = Faker()

with app.app_context():
    #clear existing data
    User.query.delete()
    Artist.query.delete()
    Museum.query.delete()
    Review.query.delete()

#use faker for content and users
    for _ in range(20):
        username = faker.unique.user_name()
        password = faker.password()
        user = User(
            username=username
        )
        
        user.password_hash = bcrypt.generate_password_hash(password).decode("utf-8")
         # We are calling the password_hash setter method here
        db.session.add(user)

    artists = [
        Artist(name=f'Artist {i}', work=f'Work {i} by Artist {i}', description=f'Description {i} by Artist {i}')
        for i in range(1, 11)
    ]
    
    museums =[
        Museum(name=f'Museum {i}',location= f'Location {i}')
        for i in range(1, 11)
    ]

    db.session.add_all(artists)
    db.session.add_all(museums)
    
    
    
    reviews = [
        Review(content=faker.paragraph(), artist=artists[i])
        for i in range(10)
    ]


    db.session.add_all(reviews)


    db.session.commit()


    print('Database seed successful')
