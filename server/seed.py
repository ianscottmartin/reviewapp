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
        user = User(username=username)
        
        user.password_hash = bcrypt.generate_password_hash(password).decode("utf-8")
         # We are calling the password_hash setter method here
        db.session.add(user)

    artists = [
        Artist(name=f'Artist {i}', work=f'Work {i} by Artist {i}', description=f'Description {i} by Artist {i}')
        for i in range(1, 11)
    ]

    db.session.add_all(artists)
    db.session.commit()

    # for artist in artists:
    #     print(f'Artist: {artist.name}, ID: {artist.id}')

    


    museums =[
        Museum(name=f'Museum {i}',location= f'Location {i}')
        for i in range(1, 11)
    ]

    
    db.session.add_all(museums)
    
    
    
    reviews = [
        Review(content=faker.paragraph(), artist_id=artist.id)
        for artist in artists
    ]

    # for review in reviews:
    #     print(f'Review Artist ID: {review.artist_id}')


    db.session.add_all(reviews)

    user1 = User.query.filter_by(username='user1').first()
    user2 = User.query.filter_by(username= 'user2').first()
    review1 = Review.query.filter_by(id=1).first()
    review2 =Review.query.filter_by(id=2).first()

    user1.reviews.append(review1)
    user2.reviews.append(review2)
    

    try:

        db.session.commit()
        print('Database seed successful')
    except Exception as e:

        db.session.rollback()
        print(f'Database seed failed with error: {str(e)}')


