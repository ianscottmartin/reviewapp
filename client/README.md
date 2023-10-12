FlatIron Phase 5 Project
Flask and React app exploring reviews of artists and museums.

Description

Create a phase 5 final project for The Flatiron school. First I used a Flask/SQLAlchemy API backend with a React frontend. Create models and use CRUD actions,that included create,read, update and delete. Used Sqlalchemy to create a database of tables with many to many relationships, including artists, users and their relationships with each other and museum and reviews of the artists. I also included different client-side routes using React Router. I protected passwords for all of my users when implementing password hashing and authentication. When registering and logging in used validations to set standards on the input fields. Then connect the backend to the frontend using fetch(). Overall, this project features my skills in web development, including backend and frontend, data management, and security measures.

Getting Started Fork & clone repository cd into server run the main directory with python app.py

Prerequisites Make sure to have these packages installed

flask, flask-sqlalchemy, flask-migrate, sqlalchemy-serlizer, flask-cors, formik,react, react-router-dom, Bcrypt,flask_restful

Installation run pipenv install & shell to download the dependencies We want to run flask db init, flask db upgrade head for our migrations.

You should see this message

Serving Flask app 'config' Debug mode: on WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead. Running on http://127.0.0.1:5555 Press CTRL+C to quit Restarting with stat Debugger is active! Debugger PIN: 111-864-616 Next we want to run the client side with npm start --prefix client we should see this in the terminal Compiled successfully!

You can now view client in the browser.

Local: http://localhost:5000

Note that the development build is not optimized. To create a production build, use npm run build.

webpack compiled successfully