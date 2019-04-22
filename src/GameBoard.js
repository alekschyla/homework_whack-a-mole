import React from 'react';

const styleField = {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    border: '1px solid black',
    margin: '5px'
};
const styleMole = {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    border: '1px solid black',
    margin: '5px',
    backgroundColor: 'brown'
};
const styleRow = {
    display: 'flex',
};


const GameBoard = (props) => {
    return (
        <div>
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