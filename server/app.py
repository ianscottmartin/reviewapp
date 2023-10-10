# app.py
from flask import request, session, jsonify
from flask_restful import Resource, reqparse

from config import app, db, api , bcrypt # This line will run the config.py file and initialize our app
from models import User, Review, Artist, Museum, user_review_association


# All routes here!
#route for users
class UserResource(Resource):
    def get(self):
        users = User.query.all()
        user_list = [{"id": user.id, "username": user.username} for user in users]
        return jsonify(user_list), 200
    
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("username", type=str, required=True)
        parser.add_arguement("password", type=str, required=True)
        args = parser.parse_args()

        user = User(username=args["username"])
        user.password_hash = bcrypt.generate_password_hash(args["password"]).decode("utf-8")

        try:
            db.session.add(user)
            db.session.commit()
            return {"message": "User created successfully"}, 201
        except Exception as e:
            db.session.rollback()
            return {"message": f"failed to create user: {str(e)}"}, 500
        

    def delete(self, user_id):
        user = User.query.get(user_id)

        if user is None:
            return {"message": "User not found"}, 404
        
        try:
            db.session.delete(user)
            db.session.commit()
            return {"message": "User deleted"}, 200
        except Exception as e:
            db.session.rollback()
            return {"message": f"Failed to delete user: {str(e)}"}, 500
        

    def put(self, user_id):
        user = User.query.get(user_id)

        if user is None:
            return {"message": "User not found"}, 404


        parser = reqparse.RequestParser()
        parser.add_argument("username", type=str)
        parser.add_argument("password", type=str)
        args = parser.parse_args()

        if args["username"]:
            user.username = args["username"]
        if args["password"]:
            user.password_hash = bcrypt.generate_password_hash(args["password"]).decode("utf-8")

        try:
            db.session.commit()
            return{"message": "User updated"}, 200
        except Exception as e:
            db.session.rollback()
            return {"message": "Failed to update: {str(e)}"}, 500
                    
#routes for reviews   
class ReviewResource(Resource):
    def get(self):
        reviews = Review.query.all()
        review_list = [{"id": review.id, "content": review.content} for review in reviews]
        return jsonify(review_list), 200

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("content", type=str, required=True)
        parser.add_arguement("artist_id", type=str, required=True)
        args = parser.parse_args()

        review = Review(content=args["content"], artist_id=args["artist_id"])

        try:
            db.session.add(review)
            db.session.commit()
            return {"message": "Review create"}, 201
        except Exception as e:
            db.session.rollback()
            return {"message": f"Failed to create review: {str(e)}"}, 500



    def delete(self, review_id):
        review = Review.query.get(review_id)

        if review is None:
            return {"message": "Review not found"}, 404
        
        try:
            db.session.delete(review)
            db.session.commit()
            return {"message":"Review Deleted"}, 200
        except Exception as e:
            db.session.rollback()
            return {"message": f"Failed to delete review: {str(e)}"}, 500
        
    def put(self, review_id):
        review = Review.query.get(review_id)

        if review is None:
            return {"message": "Review not found"}, 404

        parser = reqparse.RequestParser()
        parser.add_argument("content", type=str)
        parser.add_argument("artist_id", type=str)
        args = parser.parse_args()  

        if args["content"]:
            review.content = args["content"]
        if args["artist_id"]:
            review.artist_id = args["artist_id"]

        try:
            db.session.commit()
            return {"message": "Review updated"}, 200
        except Exception as e:
            db.session.rollback()
            return {"message": f"Failed to update review{str(e)}"}, 500  
          
 # routes for artists

class ArtistResource(Resource):
    def get(self):
        artists = Artist.query.all()
        artist_list = [{"id": artist.id, "name": artist.name} for artist in artists]
        return jsonify(artist_list), 200

class MuseumResource(Resource):
    def get(self):
        museums = Museum.query.all()
        museum_list = [{"id": museum.id, "name": museum.name} for museum in museums]
        return jsonify(museum_list), 200 

class UserReviewResource(Resource):
    def get(self, user_id):
        user = User.query.get(user_id)

        if user is None:
            return jsonify({"message": "user not found"}), 404
        
        reviews = user.reviews
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