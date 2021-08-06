import React from 'react';

// Configuration
import {POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL} from '../config';

// Components
import HeroImage from './HeroImage';
import Grid from './Grid';
import Thumb from './Thumb';
import Spinner from './Spinner';
import SearchBar from './SearchBar';
import Button from './Button';

// Hooks
import {useHomeFetch} from '../hooks/useHomeFetch';

// Images
import NoImage from '../images/no_image.jpg';
 
// commit test
const Home = () =>{
    
    const {state, loading, error, searchTerm, setSearchTerm, setIsLoadingMore} = useHomeFetch();
    console.log(state, loading, error);
    return (
        // (<> </>) => fragment to encapsulate all that we are returning 
        <> 
        { !searchTerm && state.results[0] ? (
                <HeroImage 
                image = {`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.results[0].backdrop_path}`}
                title = {state.results[0].original_title}
                text = {state.results[0].overview}/>
        ) : null}

        <SearchBar setSearchTerm={setSearchTerm}/>
        <Grid header = {searchTerm?'Search Results' : 'Popular Movies'} >
            {state.results.map(movie => (
                <Thumb
                    key = {movie.id}
                    clickable
                    image = {
                        movie.poster_path
                            ? IMAGE_BASE_URL+POSTER_SIZE+movie.poster_path
                            : NoImage
                    }
                    movieId = {movie.id}
                />                
            ))}
        </Grid>
        {/* Only shows the spinner when loading */}
        {loading && <Spinner/>} 
        
        {/* If we have more pages and it finished loading, the button will show  */}
        {state.page < state.total_pages && !loading && (
            <Button text = 'Load More' callback = {()=>setIsLoadingMore(true)}/>
        )}
        </>
    );
}

export default Home;