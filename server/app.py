from flask import request, session, jsonify, redirect, url_for
from flask_restful import Resource, reqparse
from config import app, db, api, bcrypt
from models import User, Review, Artist, Museum, user_review_association

@app.route("/", methods=["GET"])
def root():
    return "<h1>The Reflex!</h1>"

# RESTful route syntax
# class Users(Resource):
#     def get(self):
#         users = [user.to_dict() for user in User.query.all()] # Serialize your users - the password hashes should not be sent to the client
#         return users, 200
# api.add_resource(Users, '/users')

# All routes here!
# route for users
class UserResource(Resource):
    
    def get(self):
        users = User.query.all()
        user_list = [{"id": user.id, "username": user.username} for user in users]
        return (user_list), 200
    
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("username", type=str, required=True)
        parser.add_argument("password", type=str, required=True)
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
            return {"message": "User updated"}, 200
        except Exception as e:
            db.session.rollback()
            return {"message": f"Failed to update: {str(e)}"}, 500

# Routes for reviews   
class ReviewResource(Resource):
    def get(self):
        reviews = Review.query.all()
        review_list = [{"id": review.id, "content": review.content} for review in reviews]
        return (review_list), 200

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("content", type=str, required=True)
        parser.add_argument("artist_id", type=str, required=True)
        args = parser.parse_args()

        review = Review(content=args["content"], artist_id=args["artist_id"])

        try:
            db.session.add(review)
            db.session.commit()
            return {"message": "Review created"}, 201
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

# Routes for artists
class ArtistResource(Resource):
    def get(self):
        artists = Artist.query.all()
        artist_list = [{"id": artist.id, "name": artist.name, "work": artist.work, "description": artist.description} for artist in artists]
        return (artist_list), 200

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("name", type=str, required=True)
        parser.add_argument("work", type=str, required=True)
        parser.add_argument("description", type=str, required=True)
        args = parser.parse_args()

        artist = Artist(name=args["name"], work=args["work"], description=args["description"])

        try:
            db.session.add(artist)
            db.session.commit()
            return {"message": "Artist created successfully"}, 201
        except Exception as e:
            db.session.rollback()
            return {"message": f"Failed to create artist: {str(e)}"}, 500

class MuseumResource(Resource):
    def get(self):
        museums = Museum.query.all()
        museum_list = [{"id": museum.id, "name": museum.name} for museum in museums]
        return (museum_list), 200

class UserReviewResource(Resource):
    def get(self, user_id):
        user = User.query.get(user_id)

        if user is None:
            return ({"message": "user not found"}), 404

        reviews = user.reviews
        review_list = [{"id": review.id, "content": review.content} for review in reviews]
        return (review_list), 200

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    user = User.query.filter_by(username=username).first()

    if user and bcrypt.check_password_hash(user.password_hash, password):
        session["user_id"] = user.id
        return jsonify({"message": "Login successful"}), 200
    else:
        return jsonify({"message": "Invalid credentials"}, 401)

@app.route("/logout", methods=["GET"])
def logout():
    session.pop("user_id", None)
    return redirect(url_for("root"))

# Add routes to the API
api.add_resource(UserResource, '/api/users')
api.add_resource(ReviewResource, '/api/reviews')
api.add_resource(ArtistResource, '/api/artists')
api.add_resource(MuseumResource, '/api/museums')
api.add_resource(UserReviewResource, '/api/user_reviews/<int:user_id>')

if __name__ == '__main__':
    app.run(port=5000, debug=True)
