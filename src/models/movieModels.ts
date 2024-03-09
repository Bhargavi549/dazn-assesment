import { Knex } from 'knex';
interface KnexConfig extends Knex.Config {
    development: Knex.Config;
}
const config: KnexConfig = require('../knexfile');
const db = require('knex')(config.development);

const movieModel = {
    getAllMovies: async () => {
        try {
            const movies = await db('movies').select('*');
            return movies;
        } catch (error) {
            throw new Error(`Failed to get movies: ${(error as Error).message}`);
        }
    },

    getMovieById: async (id: number) => {
        try {
            const movie = await db('movies').where('id', id).first();
            return movie;
        } catch (error) {
            throw new Error(`Failed to get movie: ${(error as Error).message}`);
        }
    },

    addMovie: async (movieData: { title: string, genre: string, rating: number, streaming_link?: string }) => {
        try {
            const [movieId] = await db('movies').insert(movieData);
            return movieId;
        } catch (error) {
            throw new Error(`Failed to add movie: ${(error as Error).message}`);
        }
    },

    updateMovie: async (id: number, updatedData: { title?: string, genre?: string, rating?: number, streaming_link?: string }) => {
        try {
            await db('movies').where('id', id).update(updatedData);
        } catch (error) {
            throw new Error(`Failed to update movie: ${(error as Error).message}`);
        }
    },

    deleteMovie: async (id: number) => {
        try {
            await db('movies').where('id', id).del();
        } catch (error) {
            throw new Error(`Failed to delete movie: ${(error as Error).message}`);
        }
    },

    searchMovies: async (query: string) => {
        try {
            const movies = await db('movies')
                .where('title', 'like', `%${query}%`)
                .orWhere('genre', 'like', `%${query}%`)
                .select('*');
            return movies;
        } catch (error) {
            throw new Error(`Failed to search movies: ${(error as Error).message}`);
        }
    }
};

export default movieModel;
