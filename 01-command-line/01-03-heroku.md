Creating an Node.js + Express + React App
====

[Heroku](https://www.heroku.com/) is a cloud application platform that makes it easy for developers to deploy their web applications to the public internet. Heroku manages servers and other resources so that developers can focus on writing code rather than maintaining hardware and internet systems.

# References


Additional material on Node.js and Express may be found at:

- Node: [nodejs.org](http://nodejs.org/)
- Express: [expressjs.com](http://expressjs.com/)
- React: [reactjs.org](https://reactjs.org/)


# Basic Express + React Application

Ensure you are familiar with the command line and git before working through this material.
Also ensure you have installed nodemon (`npm install -g nodemon`)

## Create a new express application

Create a new directory for the project where all the express application code will reside and `cd` into it so that it is now the working directory:

	$ mkdir node-app
	$ cd node-app

Generate an express application with the `express` command, which generates a template for the new application:

	$ express

Applications often have *dependency requirements*. A dependency is additional, 3rd party code which an application uses. Rather than writing new code, a programmer uses code which someone else has already written.

A new express application is dependent upon additional code. Install the code into the application with `npm install`:

	$ npm install

`npm` is the *Node Package Manager* and is responsible for managing dependency requirements with node applications.

## Confirm the application is working
	
A new express application is ready to be run out of the box. The application uses node.js to start a web server on your computer, which you can then access in a web browser.

Start the application:

	$ npm start

View it in a web browser at:

	http://localhost:3000/

Web applications that are runningly *locally*, that is, on your machine, are accessed with a special URL: **http://localhost**.

Additionally, express runs the application on a different *port*, specifically port 3000. The web browser must know to connect to the web server on port 3000, which is why **:3000** appears at the end of the URL.

If we can compare a URL to a telephone number because both identify a single point of contact, then ports are like extensions. Just like extensions allow you to reach more than one person at the same telephone number, ports allow you to reach more than one running application on the same computer.

A node express web application will continue to run until it crashes or is terminated from the command line. Terminate the application by typing Control-C (^C) into the terminal window (hold down the *control* key and press the *C* key.):

	$ ^C

But notice that your app will not auto-reload if you change a file. To get around that, run `nodemon node app.js`. That will autoreload whenever you change a file.

## Create the React Client

Now we're going to go ahead and create the client side version of our application.

In your app's folder, go ahead and run `npx create-react-app client`

Now `cd` into the client directory and run `PORT=3001 yarn start`. We need to change the port for our running app since by default Express runs on port 3000 and we don't want collisions. It will start a web browser with your React app at localhost:3001.

So you'll see a message that says "Note that the development build is not optimized." By running the React app this way, it will auto reload your changes so you never have to worry about needing to restart the app, just like nodemon!

## Commit the application to a git repository

Create an empty git repository for the web application:

	$ git init
	Initialized empty Git repository in /Users/okcoders/Documents/OK-Coders/1-bash-heroku/heroku-test/.git/
	
Add and commit the project's files to the git repository:

	$ git add .
	$ git commit -m "Initial Commit"
	
## Push your app to Github
	
Go onto your Github profile page and create a new public repo. You'll see a few commands that you should run in your repo to add your Github repo as a remote branch. Follow those instructions and you'll upload your code to Github!

## Update your application

Any additional changes you make to the application should be tracked and committed to the git repository. You can then push them to Heroku again. So when you're ready to save and upload your changes, type:
	
	$ git add .
	$ git commit -m "Your new commit message - change this"
	$ git push origin master