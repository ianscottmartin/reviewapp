# app.py
from flask import request, session, jsonify
from flask_restful import Resource

from config import app, db, api # This line will run the config.py file and initialize our app
from models import User, Review, Artist, Museum, user_review_association


# All routes here!
#route for users
class UserResource(Resource):
    def get(self):
        users = User.query.all()
        user_list = [{"id": user.id, "username": user.username} for user in users]
        return jsonify(user_list), 200

#routes for reviews   
class ReviewResource(Resource):
    def get(self):
        reviews = Review.query.all()
        review_list = [{"id": review.id, "content": review.content} for review in reviews]
        return jsonify(review_list), 200

 # routes for artists

class ArtistResource(Resource):
    def get(self):
        artists = Artist.query.all()
        artist_list = [{"id": artist.id, "name": artist.name} for artist in artists]
        return jsonify(artist_list), 200

class MuseumResource(Resource):
    def get(self):
        museums = Museum.query.all()
        museum_list = [{"id": musuem.id, "name": musuem.name} for musuem in museums]
        return jsonify(museum_list), 200 

class UserReviewResource(Resource):
    def get(self, user_id):
        user = User.query.get(user_id)

        if user is None:
            return jsonify({"message": "user not found"}), 404
        
        reviews = user_reviews
        review_list = [{"id": review.id, "content": review.content} for review in reviews]
        return jsonify(review_list), 200
    
    #add routes to the API

api.add.resource(UserResource, '/api/users')
api.add.resource(ReviewResource, '/api/reviews') 
api.add.resource(ArtistResource, '/api/artists')
api.add.resource(MuseumResource, '/api/museums')
api.add.resource(UserReviewResource, '/api/user_reviews/<int:user_id>')




if __name__ == '__main__':
    app.run(port=4000, debug=True)