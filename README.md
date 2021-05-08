# Web-Messenger

A real-time messaging platform created using the MERN stack and socket.io

## The Login/Signup Page

![Signup page](https://i.ibb.co/BfY8LV8/Web-messenger-preview.jpg)

## Sending Messages

Users can send messages in real time.
This demonstration uses two instances of the app side by side.
![Message Demonstration](https://i.ibb.co/bz368yk/web-messenger-gif.gif)

## Getting started

The project is broken down into a client and server folder.

Download and install mongodb

### Default db (Windows)
Create the following folder: C:\data\db

Cd to MongoDB directory

C:\Program Files\MongoDB\Server\{version_number}\bin>

Run mongodb.exe

### Custom db path
Cd to MongoDB directory

Setup custom database path with command: mongod --dbpath /path/to/my/customdb

### MongoDB connection path
Create a .env file in the server folder

Define DB_LOCAL_PATH="mongodb://YourPath"

Example: DB_LOCAL_PATH="mongodb://127.0.0.1/test_database"

Local host is 127.0.0.1

### Authentication
The variable 'SECRET_TOKEN' in server/.env is the buffer for the authentication token.

Edit as needed.
