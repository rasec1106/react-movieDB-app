import {useState, useEffect} from 'react';

// API
import API from '../API';

// Helpers
import { isPersistedState } from '../helpers';

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
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const fetchMovies = async (page, searchTerm='') => {
        try{
            setError(false);
            setLoading(true);
            const movies = await API.fetchMovies(searchTerm, page);

            setState(prev => ({
                ...movies,      //spread operator for destructuring the object
                results:        // results are overwritten from the spread operator, so this is what actually matters
                    page>1 ? [...prev.results, ...movies.results] : [...movies.results]
            }));

        }catch(error){
            setError(true);
        }

        setLoading(false);
    }

    // Initial fetch and search
    useEffect(()=>{
        if(!searchTerm){
            const sessionState = isPersistedState('homeState');

            if(sessionState){
                setState(sessionState);
                return;
            }
        }
        
        setState(initialState);
        fetchMovies(1, searchTerm);
    },[searchTerm]); // empty array to run once!!!

    //Load more fetch
    useEffect(()=>{
        if(!isLoadingMore) return;
        fetchMovies(state.page+1, searchTerm);
        setIsLoadingMore(false);
    },[isLoadingMore, state, searchTerm]);

    // Write the session storage
    useEffect(()=>{
        if(!searchTerm) sessionStorage.setItem('homeState', JSON.stringify(state));
    },[searchTerm,state]);

    return {state, loading, error, searchTerm, setSearchTerm, setIsLoadingMore};
};