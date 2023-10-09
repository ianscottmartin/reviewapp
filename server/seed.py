from faker import Faker
from models import User, Artist, Museum, Review
from config import db, app, bcrypt

faker = Faker()

with app.app_context():
    #clear exisitng data
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

    artist1 =Artist(name='Artist 1', work='Work 1 by Artist 1', description='Description 1 by Artist 1')
    artist2 =Artist(name='Artist 2', work='Work 2 by Artist 2', description='Description 2 by Artist 2')
    artist3 =Artist(name='Artist 3', work='Work 3 by Artist 3', description='Description 3 by Artist 3')
    artist4 =Artist(name='Artist 4', work='Work 4 by Artist 4', description='Description 4 by Artist 4')
    artist5 =Artist(name='Artist 5', work='Work 5 by Artist 5', description='Description 5 by Artist 5')
    artist6 =Artist(name='Artist 6', work='Work 6 by Artist 6', description='Description 6 by Artist 6')
    artist7 =Artist(name='Artist 7', work='Work 7 by Artist 7', description='Description 7 by Artist 7')
    artist8 =Artist(name='Artist 8', work='Work 8 by Artist 8', description='Description 8 by Artist 8')
    artist9 =Artist(name='Artist 9', work='Work 9 by Artist 9', description='Description 9 by Artist 9')
    artist10 =Artist(name='Artist 10', work='Work 10 by Artist 10', description='Description 10 by Artist 10')
    
    
    museum1 = Museum(name='Museum 1',location= 'Location 1')
    museum2 = Museum(name='Museum 2',location= 'Location 2')
    museum3 = Museum(name='Museum 3',location= 'Location 3')
    museum4 = Museum(name='Museum 4',location= 'Location 4')
    museum5 = Museum(name='Museum 5',location= 'Location 5')
    museum6 = Museum(name='Museum 6',location= 'Location 6')
    museum7 = Museum(name='Museum 7',location= 'Location 7')
    museum8 = Museum(name='Museum 8',location= 'Location 8')
    museum9 = Museum(name='Museum 9',location= 'Location 9')
    museum10 = Museum(name='Museum 10',location= 'Location 10')

    review1 = Review(content=faker.paragraph(), artist=artist1)
    review2 = Review(content=faker.paragraph(), artist=artist2)
    review3 = Review(content=faker.paragraph(), artist=artist3)
    review4 = Review(content=faker.paragraph(), artist=artist4)
    review5 = Review(content=faker.paragraph(), artist=artist5)
    review6 = Review(content=faker.paragraph(), artist=artist6)
    review7 = Review(content=faker.paragraph(), artist=artist7)
    review8 = Review(content=faker.paragraph(), artist=artist8)
    review9 = Review(content=faker.paragraph(), artist=artist9)
    review10 = Review(content=faker.paragraph(), artist=artist10)

    db.session.add(artist1)
    db.session.add(artist2)
    db.session.add(artist3)
    db.session.add(artist4)
    db.session.add(artist5)
    db.session.add(artist6)
    db.session.add(artist7)
    db.session.add(artist8)
    db.session.add(artist9)
    db.session.add(artist10)

    db.session.add(museum1)
    db.session.add(museum2)
    db.session.add(museum3)
    db.session.add(museum4)
    db.session.add(museum5)
    db.session.add(museum6)
    db.session.add(museum7)
    db.session.add(museum8)
    db.session.add(museum9)
    db.session.add(museum10)

    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)
    db.session.add(review4)
    db.session.add(review5)
    db.session.add(review6)
    db.session.add(review7)
    db.session.add(review8)
    db.session.add(review9)
    db.session.add(review10)






    db.session.commit()



    print('Database seed successful')
