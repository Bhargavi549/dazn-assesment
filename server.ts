import express from 'express';
import movieRouter from './src/routes/movieRoutes';
import dotenv from 'dotenv'

const app = express();
dotenv.config()

app.use(express.json());
app.use('/', movieRouter);

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

