import express from "express";
import path from "path";
import router from "./router";
import routerAdmin from "./router-admin";
import morgan from "morgan";
import { MORGAN_FORMAT } from "./libs/config";
import session from "express-session"; //
import ConnectMongoDBSession from "connect-mongodb-session";
import { T } from "./libs/types/common";
import cookieParser from "cookie-parser";

const MongoDBStore = ConnectMongoDBSession(session);
const store = new MongoDBStore({
  uri: String(process.env.MONGO_URL),
  collection: "sessions",
});

//------>1-ENTERANCE<---------
const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan(MORGAN_FORMAT));

//------>2-SESSIONS<----------

app.use(
  session({
    secret: String(process.env.SESSION_SECRET),
    cookie: {
      maxAge: 1000 * 3600 * 3,
    },
    store: store,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(function (req, res, next) {
  const sessionInstance: T = req.session;
  res.locals.member = sessionInstance.member;
  next();
});

//------>3-VIEWS<-------------
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//----->4-ROUTERS<------------
app.use("/admin", routerAdmin);
app.use("/", router); // SPA: REACT

export default app;
