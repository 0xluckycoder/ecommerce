const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

const middlewares = require('./middlewares');

const app = express();

mongoose.connect('mongodb+srv://lakshan:secretpas778@cluster0.gsmu4.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(morgan('common'));

app.use(cors({
    origin: 3000
}));

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'Hello World',
    });
});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

app.listen(5500, () => {
    console.log('Listening at port 5500');
});