import { useState, useEffect } from 'react';
import API from '../API';

export const useMovieFetch = movieId => {

    const [state, setState] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(()=>{

        const fetchMovie = async ()=>{
            
            try{
                setLoading(true);
                setError(false);

                const movie = await API.fetchMovie(movieId);
                const credits = await API.fetchCredits(movieId);

                // Get directors only
                const directors = credits.crew.filter(
                    member => member.job === 'Director'
                );

                setState({
                    ...movie,
                    actors: credits.cast,
                    directors
                });

                setLoading(false);
            }catch(error){
                setError(true);
            }
        };

        fetchMovie();

    },[movieId]);

    return { state, loading, error };
};

/**
* NOTE: we need to use the fetchMovie inside the useEffect, probably because we have a paramater that is movieId
*/

/**
* Instead if we want to take out the fetchMovie function we need to wrap it around a useCallback function
* import {useCallback} from 'react';

    const fetchMovie = useCallback( async ()=>{
        
        try{
            setLoading(true);
            setError(false);

            const movie = await API.fetchMovie(movieId);
            const credits = await API.fetchCredits(movieId);

            // Get directors only
            const directors = credits.crew.filter(
                member => member.job === 'Director'
            );

            setState({
                ...movie,
                actors: credits.cast,
                directors
            });

            setLoading(false);
        }catch(error){
            setError(true);
        }
    }, [movieId]);

    useEffect(()=>{
        fetchMovie();
    },[movieId,fetchMovie])
*/