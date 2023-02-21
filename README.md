## Job Application Full Stack Challenge
 
For this job application challenge the goal was to produce a full stack to-do list.

I was provided a database and backend code with a simple instance and had to meet the requirements listed below.

I was provided with a MongoDB instance. The database had just one collection, `todo`, which had documents that look like:
```javascript
    {
         _id: "abcd",
         description: "I must be done!",
         completed: false
    }
```
The database needed to store all to-do related data.

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

## Usage
Node version: `14.17.3` (any Node 14.xx should be fine)

Create a .env file at the root of the project and add your own MongoDB URI to a variable named DB_URI (in this test I was originally given a URI to use)

To run client and server concurrently, use:
```shell
npm install
npm run dev
```

To start the React side, use:
```shell
npm install
npm start
```

To start the Express side, use:
```shell
npm install
npm run server
```

To access the UI, go to: http://localhost:3000

To access the API, go to: http://localhost:8088/api/items. You can see the routing for the API in /src/routes/api.js

Note that the React dev server has been proxied to use the Express server, so if you make a local request in the React code to `GET /api/items`, it will hit the Express server (to avoid CORS issues). Check the `proxy` directive in `package.json`.
