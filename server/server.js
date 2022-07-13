const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './config.env') });

const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const multer = require('multer');
const storage = multer.diskStorage({
	destination: './uploads/',
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});
const upload = multer({ storage: storage });

const verifyToken = require('./middleware/authJwt');
const TokenLogin = require('./auth/user');

const uploadRouter = require('./routes/uploadRoute');
const routeRouter = require('./routes/getRoute');
const activitiesRouter = require('./routes/activitiesRoute');
const registerRouter = require('./routes/registerRoute');
const loginRoutes = require('./routes/loginRoute');
const statsRoutes = require('./routes/statsRoute');
const chartsRouter = require('./routes/chartsRoute');
const userRoutes = require('./routes/userRoute');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/auth', verifyToken, TokenLogin);
app.use('/register', registerRouter);
app.use('/login', loginRoutes);
app.use('/route', routeRouter);
app.use('/user', userRoutes);
app.use('/activities', activitiesRouter);
app.use('/stats', statsRoutes);
app.use('/charts', chartsRouter);
app.use('/upload', upload.array('file', 10), uploadRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
	// render the error page
	res.status(err.status || 500);
	//res.render('error');
});

app.listen(5000, () => {
	console.log('Listening');
});
module.exports = app;
