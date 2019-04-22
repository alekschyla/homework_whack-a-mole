import React, {Component} from 'react';
import GameBoard from "./GameBoard";
import ModalWindow from "./ModalWindow";

import Button from '@material-ui/core/Button';

const gameBoardStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '20px',
    textAlign: 'center',
};

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
        modalOpen: false,
    };

    startGame = () => {
        if (this.state.isGameEnd || this.state.isGameEnd === null) {
            this.setState({isGameEnd: false, score: 0});
            this.startInterval();
            this.endGame();
        }
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
            this.setState({modalOpen: true});
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

    handleCloseModal = () => {
        this.setState({modalOpen: false});
    };

    render() {
        return (
            <div
                style={gameBoardStyle}
            >
                <h1>Score: {this.state.score}</h1>

                <ModalWindow
                    modalOpen={this.state.modalOpen}
                    handleCloseModal={this.handleCloseModal}
                    score={this.state.score}
                />

                <GameBoard
                    gameBoard={this.state.gameBoard}
                    randomMolePlace={this.state.randomMolePlace}
                    onMoleClick={this.onMoleClick}
                />

                <Button
                    variant="contained"
                    onClick={this.startGame}
                >
                    {
                        this.state.isGameEnd ?
                            'zagraj jeszcze raz'
                            :
                            'zagraj'
                    }
                </Button>
            </div>
        );
    }
}

export default Game;

