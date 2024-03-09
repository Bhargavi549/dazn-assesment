import { Request, Response } from 'express';
import movieModel from '../models/movieModels';

export const getAllMovies = async (req: Request, res: Response): Promise<void> => {
    try {
        const movies = await movieModel.getAllMovies();
        res.json(movies);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const getMovieById = async (req: Request, res: Response): Promise<void> => {
    const movieId = parseInt(req.params.id);
    try {
        const movie = await movieModel.getMovieById(movieId);
        if (!movie) {
            res.status(404).json({ message: 'Movie not found' });
            return;
        }
        res.json(movie);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const addMovie = async (req: Request, res: Response): Promise<void> => {
    const movieData = req.body;
    try {
        const movieId = await movieModel.addMovie(movieData);
        res.status(201).json({ message: 'Movie added successfully' });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const updateMovie = async (req: Request, res: Response): Promise<void> => {
    const movieId = parseInt(req.params.id);
    const updatedData = req.body;
    try {
        await movieModel.updateMovie(movieId, updatedData);
        res.json({ message: 'Movie updated successfully' });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const deleteMovie = async (req: Request, res: Response): Promise<void> => {
    try {
        const movieId = parseInt(req.params.id);
        const movie = await movieModel.getMovieById(movieId);
        if (!movie) {
            res.status(404).json({ message: 'Movie not found' });
            return;
        }
        await movieModel.deleteMovie(movieId);
        res.json({ message: 'Movie deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const searchMovies = async (req: Request, res: Response): Promise<void> => {
    const query = req.query.q as string;
    if (!query) {
        res.status(400).json({ message: 'Search query parameter "q" is required' });
        return;
    }
    try {
        const movies = await movieModel.searchMovies(query);
        res.json(movies);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};
