import bodyParser from 'body-parser';
import express from 'express';

import oauthRoutes from './routes/oauth.routes.js';
import taskRoutes from './routes/task.routes.js';

const app = express();
app.use(bodyParser.json());

app.use('/oauth', oauthRoutes);
app.use('/tasks', taskRoutes);

app.get('/', (req, res) => {
    res.send("Kroolo - Asana Integration Assignment");
})

export {
    app
};