import React from 'react';

const style = {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    border: '1px solid black',
    margin: '5px'
};

const GameBoard = (props) => {
    return (
        <div
        style={{
            display: 'flex',
            width: '400px',
            height: '400px',
            justifyContent: 'center',

        }}
        >
            {
                props.gameBoard.map(
                    (row, rowIndex) => (
                        <div
                        key={rowIndex}
                        >
                            {
                                row.map(
                                    (field, fieldIndex) =>
                                        <div
                                            key={rowIndex + ' ' + fieldIndex}
                                            style={style}
                                            onClick={() => console.log(field)}
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