from faker import Faker
from models import User, Artist, Museum, Review, user_review_association
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

    for artist in artists:
        print(f'Artist: {artist.name}, ID: {artist.id}')

    


    museums =[
        Museum(name=f'Museum {i}',location= f'Location {i}')
        for i in range(1, 11)
    ]

    
    db.session.add_all(museums)
    
    
    
    reviews = [
        Review(content=faker.paragraph(), artist_id=artist.id)
        for artist in artists
    ]

    for review in reviews:
        print(f'Review Artist ID: {review.artist_id}')


    db.session.add_all(reviews)

    user_id_to_associate = 1
    review_id_to_associate =1

    new_association = user_review_association.insert().values(user_id=user_id_to_associate, review_id=review_id_to_associate)
    db.session.execute(new_association)
    db.session.commit()
   
    try:
        db.session.commit()
        print('Database seed succesful')
    except Exception as e:
            db.session.rollback()
            print(f'Database seed failed with error: {str(e)}')
   

