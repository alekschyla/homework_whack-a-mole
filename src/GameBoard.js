import React from 'react';
import mole from './images/mole.png'


const styleField = {
    width: '80px',
    height: '80px',
    border: '1px solid black',
    margin: '5px',
    background: 'brown'
};
const styleMole = {
    width: '80px',
    height: '80px',
    border: '1px solid black',
    margin: '5px',
    background: `brown url(${mole}) no-repeat center`,
    backgroundSize: '100%',
};
const styleRow = {
    display: 'flex',
};

const styleGameBoard = {
    margin: '20px',
    background: 'green'
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