## Welcome to the Bluedot Full Stack Challenge!

In this challenge, you are to take the code in this repository, and update it with all of the code necessary to show a working to-do list which persists between refreshes using a MongoDB database.

## Database
You are provided with a MongoDB instance which your project is already configured to connect to. This database has just one collection, `todo`, which has documents that look like:
```javascript
    {
         _id: "abcd",
         description: "I must be done!",
         completed: false
    }
```
This database should store all todo-related data.

## Usage
Node version: `14.17.3` (any Node 14.xx should be fine)

To start the React side, use:
```shell
npm install
npm start
```

To start the Express side, use:
```shell
npm install
node src/server.js
```

To access the UI, go to: http://localhost:3000

To access the API, go to: http://localhost:8088/api/items. You can see the routing for the API in /src/routes/api.js

Note that the React dev server has been proxied to use the Express server, so if you make a local request in the React code to `GET /api/items`, it will hit the Express server (to avoid CORS issues). Check the `proxy` directive in `package.json`.

## Requirements
The user should be able to:
* Create new todo items.
* Mark todo items as complete.
* See the list of completed and non-completed todo items.

Basic marking:
* Completeness (Does it work?)
* Code style (Is it readable?)
* Architecture and software engineering (Was best practice followed? Design and planning outputs are well regarded)

Bonus marks:
Bonus marks are added for additional functionality - the more interesting the better.
Examples are:
* Add the ability to delete todos.
* Add high quality styling.
* Add the ability to assign a todo to a person (i.e. add a name to a todo).