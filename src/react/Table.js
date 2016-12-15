import React, { PropTypes } from 'react';
import Elm from 'react-elm-components';
import { Main } from '../elm/Main.elm';


const Table = () => (
    <div>
        <Elm src={Main} />
    </div>
);

function test() {
    console.log('test');
}

export default Table