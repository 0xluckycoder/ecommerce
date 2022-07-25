const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const middlewares = require('./middlewares');

const stores = require('./api/store/stores');
const users = require('./api/user/users');


const app = express();

mongoose.connect('mongodb+srv://lakshan:secretpas778@cluster0.gsmu4.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error ❌: "));
db.once("open", () => {
    console.log("connected successfully");
});

app.use(morgan('common'));

// config with only allowed origins
app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'api root 🦉',
    });
});

app.use('/api/store', stores);
app.use('/api/user', users);

// app.use(middlewares.notFound);
// app.use(middlewares.errorHandler);

app.listen(5500, () => {
    console.log('Listening at port 5500');
});