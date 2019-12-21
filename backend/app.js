const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/notetaking', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.set('debug', true);

const app = express();
app.use(cors());
app.use(bodyParser.json());

require('./models/');

app.use(require('./routers'));

app.use((res, req, next)=>{
    const error = new Error("Not custom found");
    error.status = 400;
    next(error);
});

app.use((err, req, res, next)=>{
    const status = err.status || 500;
    res.status(status).send({
        error: {
            message: err.message,
            err: err
        }
    });
});

const server = app.listen(8000, ()=>{
    console.log("server backend run on http://localhost:8000");
});