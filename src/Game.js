import React, {Component} from 'react';
import GameBoard from "./GameBoard";

class Game extends Component {
    state = {
        gameBoard: [
            [1, 2, 3, 4],
            [5, 6, 7, 8],
            [9, 10, 11, 12]
        ],
        randomMolePlace: null,
        score: 0,
        moleTime: 2000,
        gameTime: 120,
    };

    startGame = () => {
        this.generateRandomMolePlace();
    };

    startInterval = () => {
        setInterval(() => {
                this.generateRandomMolePlace();
            },
            this.state.moleTime
        )
    };

    generateRandomMolePlace = () => {
        const rowIndex = Math.floor(Math.random() * 3);
        const fieldIndex = Math.floor(Math.random() * 3);
        const randomMolePlace = this.state.gameBoard[rowIndex][fieldIndex];

        if (randomMolePlace === this.state.randomMolePlace) return this.generateRandomMolePlace();

        this.setState({randomMolePlace: randomMolePlace})
    };

    onMoleClick = (field) => {
        if (field === this.state.randomMolePlace) {
            this.setState({score: this.state.score + 1})
        }
        this.generateRandomMolePlace();
    };

    render() {
        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: '20px',
                    textAlign: 'center',
                }}
            >
                <h1>Score: {this.state.score}</h1>
                <GameBoard
                    gameBoard={this.state.gameBoard}
                    randomMolePlace={this.state.randomMolePlace}
                    onMoleClick={this.onMoleClick}
                />
                <button
                    onClick={this.startGame}
                >
                    zagraj
                </button>
            </div>
        );
    }
}

export default Game;

