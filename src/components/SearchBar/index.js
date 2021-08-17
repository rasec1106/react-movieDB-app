import React, {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';

// Image
import searchIcon from '../../images/search-icon.svg';

// Styles
import {Wrapper, Content} from './SearchBar.styles';

const SearchBar = ({setSearchTerm}) =>{

    const [state, setState] = useState('');
    const initial = useRef(true);

    useEffect(() => {

        /**
         * This snippet is to skip the initial render in the useEffect
         */
        if(initial.current === true){
            initial.current = false;
            return;
        }

        const timer = setTimeout(() => {
            setSearchTerm(state);
        },500);

        return ()=> clearTimeout(timer);
    },[setSearchTerm, state]);

    return (
        <Wrapper>
            <Content>
                <img src={searchIcon} alt='search-icon' />
                <input 
                    type="text" 
                    placeholder='Search Movie'
                    onChange={event=> setState(event.currentTarget.value)} //this will set the state to the current value in the input field
                    value={state}
                />
            </Content>
        </Wrapper>
    )
}

SearchBar.propTypes = {
    setSearchTerm: PropTypes.func,
}

export default SearchBar;