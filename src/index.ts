import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as helmet from "helmet";
import * as cors from "cors";
import routes from "./routes";

require('dotenv').config({path: "../.env"});

// connects to the Database -> then starts the express
createConnection()
    .then(async connection => {
        // create a new express application instance
        const app = express();

        // middlewares
        app.use(cors());
        app.use(helmet());
        app.use(bodyParser.json());

        // set all routes from routes folder
        app.use('/', routes);

        app.listen(process.env.PORT, () => {
            console.log(process.env.APP_ENV + " server started on http://localhost:" + process.env.PORT + "/ !");
        });
    })
    .catch(error => console.log(error));
