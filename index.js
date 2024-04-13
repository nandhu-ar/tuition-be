import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes.js';

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('', routes);
app.listen(8080, () => console.log(`Started listening on Port 8080`));