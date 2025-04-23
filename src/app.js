import bodyParser from 'body-parser';
import express from 'express';
import session from 'express-session';
import oauthRoutes from './routes/oauth.routes.js';
import taskRoutes from './routes/task.routes.js';
import morgan from 'morgan';
import logger from './utils/logger.js';
import stream from 'stream';

const app = express();

app.use(bodyParser.json());

app.use(session({
    secret: process.env.SESSION_SECRET || 'dev-secret-ayush', 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
}));

const morganStream = new stream.Writable({
    write: (chunk, encoding, callback) => {
        logger.http(chunk.toString().trim()); // Log HTTP requests at 'http' level
        callback();
    }
});

app.use(morgan('combined', { stream: morganStream }));


app.use('/oauth', oauthRoutes);
app.use('/tasks', taskRoutes);

app.get('/', (req, res) => {
    res.send("Kroolo - Asana Integration Assignment");
})

export {
    app
};