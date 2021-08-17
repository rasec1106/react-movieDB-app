import React from 'react';
import PropTypes from 'prop-types';

// Styles
import {Wrapper, Content} from './Grid.styles'

const Grid = ({header, children}) => (
    <Wrapper>
        <h1>{header}</h1>
        <Content>{children}</Content>
    </Wrapper>
)

Grid.propTypes = {
    header: PropTypes.string,
    // children is a built in prop, so we dont need to verify that
}

export default Grid;