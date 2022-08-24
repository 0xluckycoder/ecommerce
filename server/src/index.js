const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const middlewares = require('./middlewares');

// const stores = require('./api/store/stores');
// const users = require('./api/user/users');

const authRoutes = require('./v1/api/authRoutes');
const vendorRoutes = require('./v1/api/vendorRoutes');

// testing
const sharp = require('sharp');
const multer = require('multer');

const app = express();

mongoose.connect(`mongodb+srv://lakshan:${process.env.DB_PASS}@cluster0.gsmu4.mongodb.net/?retryWrites=true&w=majority`, {
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
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
}));

app.use(express.json());

app.use(cookieParser());

app.get('/', (req, res) => {
    res.json({
        message: 'api root 🦉',
    });
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/vendor', vendorRoutes);

// upload image with multer, sharpjs, s3

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

// const upload = multer({ dest: 'uploads/' })
var upload = multer({ storage: storage });
app.post('/api/testing/upload', upload.single('logo'), async (req, res, next) => {
    if (!req.file) {
        throw new Error('please upload a file');
        return;
    }
    console.log(req.file);
    res.send(req.file);
});
// app.use('/api/v1/vendor', authorize, vendorRoutes);

// app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

app.listen(5500, () => {
    console.log('Listening at port 5500');
});