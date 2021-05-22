import { createRequire } from 'module';
const require = createRequire(import.meta.url);

import express, { json } from 'express';
import mongoose from 'mongoose';
import { MONGO_PASS, MONGO_USER, MONGO_PORT, MONGO_IP, REDIS_URL, REDIS_PORT, SESSION_SECRET } from './config/config.js';
import postRouter from "./routes/postRoutes.js";
import authRouter from "./routes/authRoutes.js";
import { createClient } from 'redis';
import session from "express-session";
import cors from "cors";

const RedisStore = require('connect-redis')(session);

const app = express();
const port = process.env.PORT || 3000;


let redisClient = createClient({
    host: REDIS_URL,
    port: REDIS_PORT
});

const retryDBCon = () => {
    // options passed into the connect method of mongoose is to get rid of the warnings thrown
    mongoose
        .connect(`mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_IP}:${MONGO_PORT}/?authoSource=admin`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        .then(() => console.log("Connected to DB"))
        .catch((e) => {
            console.log(e);
            // this part is just to make sure if conncetion to DB fails, we retry after 5 seconds
            // this might not be the best way to handle this
            setTimeout(() => {
                console.log("Trying to conncet to the database again....");
                retryDBCon();
            }, 5000);
        }); 
};

retryDBCon();

app.get("/api/v1", (req, res) => {
    res.send("<h2>Hello World!</h2>");
});

// enable this to trust the headers set by NGINX
app.enable("trust proxy");

app.use(cors());
app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      secret: SESSION_SECRET,
      cookie: {
          secure: false,
          resave: false,
          saveUninitialized: false,
          httpOnly: true,
          maxAge: 30000
      }
    })
  )
app.use(json());
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", authRouter);

app.listen(port, () => console.log(`Listening on port ${port}`));