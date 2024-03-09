import express from 'express';
import {
    getAllMovies,
    getMovieById,
    addMovie,
    updateMovie,
    deleteMovie,
    searchMovies
} from '../controllers/movieController';

const router = express.Router();

router.get('/movies', getAllMovies);
router.get('/movies/:id', getMovieById);
router.post('/movies', addMovie);
router.put('/movies/:id', updateMovie);
router.delete('/movies/:id', deleteMovie);
router.get('/search', searchMovies);

export default router;
