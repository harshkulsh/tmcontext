# tmcontext
Assignment

To clone the project use the following command:
 git clone https://github.com/harshkulsh/tmcontext.git
 
After cloning, open the project and give the command:
npm install
npm start

and the project will run on localhost:3000

Register username and password and after that a login page will open. Enter your credentials for registering and the welcome page will open. 
If already registered, you can click on the login link below the register page.

You will get popups for invalid credentials and short username and passwords.

To run the docker image, run the following commands:

docker build . -t tmcontext
docker run -p 49160:8080 -d tmcontext

The npm package 'alert' is not working in the docker build, so alerts wont be there.

To make the app more secure, we can use https protocol using ssl certs.

