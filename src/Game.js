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
        gameTime: 120000,
        isGameEnd: null,
        currentIntervalId: null,
    };

    startGame = () => {
        this.startInterval();
        this.endGame();
    };

    startInterval = () => {
        const intervalId = setInterval(() => {
                if (this.state.isGameEnd) {
                    clearInterval(intervalId);
                } else {
                    this.generateRandomMolePlace();
                }
            },
            this.state.moleTime
        );

        this.state.currentIntervalId = intervalId;
    };

    endGame = () => {
        setTimeout(() => {
            this.setState({isGameEnd: true});
            this.setState({randomMolePlace: 0});
        }, this.state.gameTime);
    };

    generateRandomMolePlace = () => {
        const rowIndex = Math.floor(Math.random() * 3);
        const fieldIndex = Math.floor(Math.random() * 3);
        const randomMolePlace = this.state.gameBoard[rowIndex][fieldIndex];

        if (randomMolePlace === this.state.randomMolePlace) return this.generateRandomMolePlace();

        this.setState({randomMolePlace: randomMolePlace})
    };

    onMoleClick = (field) => {
        if (field === this.state.randomMolePlace && !this.state.isGameEnd) {
            this.setState({score: this.state.score + 1});
            clearInterval(this.state.currentIntervalId);
            this.startInterval();
        }
        if (!this.state.isGameEnd) {
            this.generateRandomMolePlace();
        }

        this.adjustMoleTime();
    };

    adjustMoleTime = () => {
        if (this.state.score === 10) {
            this.setState({moleTime: 1000})
        }
        if (this.state.score === 30) {
            this.setState({moleTime: 500})
        }
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

