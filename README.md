# Express Starter

This starter repo will be used for building applications using React, Material-UI, React-Router, Node, & Express.js.

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