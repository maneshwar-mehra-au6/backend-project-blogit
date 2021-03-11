import "babel-polyfill";
import connect from "./model/connect";
import route from "./controller/mergeroute";
const bodyPraser = require("body-parser");
const path = require("path");
connect.connect();
const session = require("express-session");
const cookieparser = require("cookie-parser");
const server = require("express");
const app = server();
// session
app.use(cookieparser());
app.use(
  session({
    secret: "abc",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 3600000 },
  })
);

//
// use of body praser
app.use(bodyPraser.json());
app.use(bodyPraser.urlencoded({ extended: true }));

// setup viwe engine hbs
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "view"));
app.use(server.static(path.join(__dirname, "view/upload")));
app.use(server.static(path.join(__dirname, "view/css")));

// route comming
app.use(route.route);



// page not Found
app.use((req, res, next) => {
  const error = new Error("Page Not found");
  error.status = 404;
  next(error);
});

// throw any error in data base
app.use((err, req, resp, next) => {
  if (err)
    return resp.json({
      msg: err.message,
    });
  next();
});
// health check
app.listen(process.env.PORT || 2000, () => {
  console.log("listing at port ", process.env.PORT || 2000);
});
