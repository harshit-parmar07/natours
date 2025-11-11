/* eslint-disable no-unused-vars */
const path = require('path');
const express = require('express');
const { dirname } = require('path');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const reviewRouter = require('./routes/reviewRoutes');
const bookingRouter = require('./routes/bookingRoutes');
const viewRouter = require('./routes/viewRoutes');

// Start Express app
const app = express();

app.set('trust proxy', 1);

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// 1)GLOBAL MIDDLEWARES
// app.use(cors());

app.use(
  cors({
    origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
    credentials: true
  })
);

app.options('*', cors());

// // app.js
// app.use(
//   cors({
//     origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
//     credentials: true
//   })
// );
// app.options('*', cors());

// serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Set Security HTTP Header
app.use(
  helmet({
    contentSecurityPolicy: false
  })
);

// app.use((req, res, next) => {
//   // In development, consider Report-Only to audit first:
//   // res.setHeader('Content-Security-Policy-Report-Only', VALUE);

//   const csp = [
//     "default-src 'self'",
//     "script-src 'self' https://api.mapbox.com https://js.stripe.com https://m.stripe.network blob:",
//     "style-src 'self' https://fonts.googleapis.com https://api.mapbox.com 'unsafe-inline'",
//     "img-src 'self' data: blob: https://m.stripe.network https://api.mapbox.com",
//     "font-src 'self' https://fonts.gstatic.com data:",
//     "connect-src 'self' https://api.mapbox.com https://events.mapbox.com https://api.stripe.com https://m.stripe.network ws://127.0.0.1:*",
//     'frame-src https://js.stripe.com',
//     "worker-src 'self' blob:",
//     "object-src 'none'",
//     "base-uri 'self'",
//     "frame-ancestors 'none'"
//   ].join('; ');

//   res.setHeader('Content-Security-Policy', csp);
//   next();

//   // const csp = [
//   //   "default-src 'self'",
//   //   "script-src 'self' https://api.mapbox.com https://js.stripe.com https://m.stripe.network blob:",
//   //   "style-src 'self' https://fonts.googleapis.com https://api.mapbox.com 'unsafe-inline'",
//   //   "img-src 'self' data: blob: https://m.stripe.network https://api.mapbox.com",
//   //   "font-src 'self' https://fonts.gstatic.com data:",
//   //   "connect-src 'self' http://127.0.0.1:3000 http://localhost:3000 https://api.mapbox.com https://events.mapbox.com https://api.stripe.com https://m.stripe.network ws://127.0.0.1:* ws://localhost:*",
//   //   'frame-src https://js.stripe.com',
//   //   "worker-src 'self' blob:",
//   //   "object-src 'none'",
//   //   "base-uri 'self'",
//   //   "frame-ancestors 'none'"
//   // ].join('; ');
//   // res.setHeader('Content-Security-Policy', csp);
//   // next();
// });

// DEVELOPMENT LOGGING
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// LIMIT REQUESTS FOR SAME API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too mamy request from this IP, try again in an hour'
});
app.use('/api', limiter);

// BODY PARSER, READING DATA FROM BODY TO REQ.BODY
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.use(cookieParser());

// DATA SANITIZATION against noSQL query injections
app.use(mongoSanitize());

// DATA SANITIZATION against XSS
app.use(xss());

// PREVENT PARAMETER POLLUTION
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingAverage',
      'ratingQuantity',
      'maxGroupSize',
      'difficulty',
      'price'
    ]
  })
);

app.use(compression());

// test middleware
// app.use((req, res, next) => {
//   req.requestTime = new Date().toISOString();
//   // console.log(req.cookies);
//   next();
// });

// 3) ROUTES

app.use((req, res, next) => {
  if (req.method === 'HEAD') {
    return res.status(200).end();
  }
  next();
});

app.get('/.well-known/appspecific/com.chrome.devtools.json', (req, res) => {
  // Either no content:
  // return res.status(204).end();

  // Or minimal JSON:
  res.type('application/json').send('{}');
});

app.use('/', viewRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/bookings', bookingRouter);

app.all('*', (req, res, next) => {
  // const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  // err.status = 'fail';
  // err.statusCode = 404;

  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
