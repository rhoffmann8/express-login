# express-login
An express skeleton project with basic login/logout/register page and capabilities.

After whipping this up for a project at work I figured it could serve as a template for later projects.

Libraries used:

* [bcrypt](https://github.com/ncb000gt/node.bcrypt.js/)
* [bluebird](https://github.com/petkaantonov/bluebird)
* [body-parser](https://github.com/expressjs/body-parser)
* [connect-flash](https://github.com/jaredhanson/connect-flash)
* [ejs](https://github.com/mde/ejs)
* [express](http://expressjs.com/)
* [express-session](https://github.com/expressjs/session)
* [mongoose](https://github.com/Automattic/mongoose)
* [passport](http://passportjs.org/)
* [passport-local](https://github.com/jaredhanson/passport-local)
* [passport-local-mongoose](https://github.com/saintedlama/passport-local-mongoose)
* [Foundation](http://foundation.zurb.com/)

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
