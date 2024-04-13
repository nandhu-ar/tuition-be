import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes.js';
import cors from 'cors';
import dotenv from 'dotenv';

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
dotenv.config();
app.use('', routes);
app.listen(8080, () => console.log(`Started listening on Port 8080`));