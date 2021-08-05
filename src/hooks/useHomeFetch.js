import {useState, useEffect, useRef} from 'react';
// API
import API from '../API';

const initialState = {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0
}

export const useHomeFetch = () =>{
    // States
    const [state, setState] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const fetchMovies = async (page, searchTerm='') => {
        try{
            setError(false);
            setLoading(true);
            const movies = await API.fetchMovies(searchTerm, page);
            console.log(movies);

            setState(prev => ({
                ...movies,      //spread operator for destructuring the object
                results:        // results are overwritten from the spread operator, so this is what actually matters
                    page>1 ? [...prev.results, ...movies.results] : [...movies.results]
            }));

        }catch(error){
            setError(true);
        }
    }

    useEffect(()=>{
        fetchMovies(1);
    },[]); // empty array to run once!!!
    useEffect(()=>{
        fetchMovies(2);
    },[]); // empty array to run once!!!

    return {state, loading, error};
};