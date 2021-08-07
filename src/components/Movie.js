import React from 'react';
import { useParams } from 'react-router-dom';

// Config
import { IMAGE_BASE_URL, POSTER_SIZE } from '../config';

// Components
import BreadCrumb from './BreadCrumb';
import MovieInfo from './MovieInfo';
import Grid from './Grid';
import Spinner from './Spinner';

// Hook
import { useMovieFetch } from '../hooks/useMovieFetch';

// Image
import NotFound from './NotFound';

const Movie = () => {

    const {movieId} = useParams();
    const {state: movie, loading, error } = useMovieFetch(movieId);

    console.log(movie);
    if(loading) return <Spinner/>;
    if(error) return <div>Something went wrong...</div>;

    return (
        <>
            <BreadCrumb movieTitle = {movie.original_title}/>
            <MovieInfo movie = {movie} />
        </>
    );
};

export default Movie;