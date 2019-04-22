import React from 'react';
import mole from './images/mole.png'
import hole from './images/hole.png'


const styleField = {
    width: '80px',
    height: '90px',
    margin: '5px',
    background: `url(${hole}) no-repeat center`,
    backgroundSize: '100%',
};

const styleMole = {
    width: '80px',
    height: '90px',
    margin: '5px',
    background: `url(${mole}) no-repeat top, url(${hole}) no-repeat center`,
    backgroundSize: '90%',
};
const styleRow = {
    display: 'flex',
};

const styleGameBoard = {
    margin: '20px',

};

const GameBoard = (props) => {
    return (
        <div
        style={styleGameBoard}
        >
            {
                props.gameBoard.map(
                    (row, rowIndex) => (
                        <div
                            style={styleRow}
                            key={rowIndex}
                        >
                            {
                                row.map(
                                    (field, fieldIndex) =>
                                        field === props.randomMolePlace ?
                                            <div
                                                key={rowIndex + ' ' + fieldIndex}
                                                style={styleMole}
                                                onClick={() => props.onMoleClick(field)}
                                            >
                                            </div>
                                            :
                                            <div
                                                key={rowIndex + ' ' + fieldIndex}
                                                style={styleField}
                                            >
                                            </div>
                                )
                            }
                        </div>
                    )
                )
            }
        </div>
    );
};

export default GameBoard;