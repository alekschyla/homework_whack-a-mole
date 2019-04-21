import React, {Component} from 'react';
import GameBoard from "./GameBoard";

class Game extends Component {
    state = {
        gameBoard: [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
        ],
        randomMolePlace: null,
        moleTime: 2000,
        gameTime: 120,
    };

    generateRandomMolePlace = () => {
        const rowIndex = Math.floor(Math.random() * 3);
        const fieldIndex = Math.floor(Math.random() * 3);
        const randomMolePlace = this.state.gameBoard[rowIndex][fieldIndex];

        if (randomMolePlace === this.state.randomMolePlace) return this.generateRandomMolePlace();

        this.setState({ randomMolePlace: randomMolePlace })
    };

    render() {
        return (
            <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                margin: '20px',
            }}
            >
                <GameBoard
                    gameBoard={this.state.gameBoard}
                />
            </div>
        );
    }
}

export default Game;