# express-login
An express skeleton project with basic login/logout page and capabilities.

After whipping this up for a project at work I figured it could serve as a template for later projects.

Libraries used:

* bcrypt
* bluebird
* body-parser
* ejs
* express
* express-session
* mongoose
* passport
* passport-local
* Foundation

Install with npm:

```
npm install
```

Define db in ```config.js```
```js
module.exports = {
  dbname: 'test'
};
```

The project expects a **users** collection, but this can be modified in the user model if needed.

At the moment there is no registration functionality but I plan to add that in the future.