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

    db.session.add_all([artist1, artist2, artist3, artist4, artist5, artist6, artist7, artist8, artist9, artist10])
    db.session.add_all([museum1, museum2, museum3, museum4, museum5, museum6, museum7, museum8, museum9, museum10])
    
    
    
    review1 = Review(content=faker.paragraph(), artist_id=artist1.id)
    review2 = Review(content=faker.paragraph(), artist_id=artist2.id)
    review3 = Review(content=faker.paragraph(), artist_id=artist3.id)
    review4 = Review(content=faker.paragraph(), artist_id=artist4.id)
    review5 = Review(content=faker.paragraph(), artist_id=artist5.id)
    review6 = Review(content=faker.paragraph(), artist_id=artist6.id)
    review7 = Review(content=faker.paragraph(), artist_id=artist7.id)
    review8 = Review(content=faker.paragraph(), artist_id=artist8.id)
    review9 = Review(content=faker.paragraph(), artist_id=artist9.id)
    review10 = Review(content=faker.paragraph(), artist_id=artist10.id)


    db.session.add_all([review1, review2, review3, review4, review5, review6, review7, review8, review9, review10])


    db.session.commit()


    print('Database seed successful')
