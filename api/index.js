require('dotenv').config();
const express = require('express');
const app = express();
const port = 9001;
const cors = require('cors');
const logger = require('morgan');
const sessions = require('express-session');
const MongoStore = require('connect-mongo');

app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:3000', 'https://yougile.com'],
  }),
);

let mongoUrl;

if (process.env.NODE_ENV === 'development ') {
  mongoUrl =
    'mongodb://adminTiit:' + process.env.MONGO_DEV_PASSWORD + '@127.0.0.1:27017/crm?authSource=crm';
} else {
  mongoUrl =
    'mongodb://adminTiit:' +
    process.env.MONGO_PRODUCTION_PASSWORD +
    '@localhost:27017/crm?authSource=crm';
}

app.use(
  sessions({
    secret: 'nvebiruvwnerfqruec3cetiit',
    store: MongoStore.create({
      mongoUrl: mongoUrl,
      ttl: 60 * 24 * 60 * 60,
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 30,
    },
  }),
);

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const clientsRouter = require('./routes/clients');
const tasksRouter = require('./routes/tasks');
const allRouter = require('./routes/all');
const productsRouter = require('./routes/products');
const directoryRouter = require('./routes/directory');
const applicationsRouter = require('./routes/applications');

app.use(logger('dev'));
app.use(express.json());
app.use('*', allRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/clients', clientsRouter);
app.use('/tasks', tasksRouter);
app.use('/products', productsRouter);
app.use('/directory', directoryRouter);
app.use('/applications', applicationsRouter);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
