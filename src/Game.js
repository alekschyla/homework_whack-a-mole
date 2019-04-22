import React, {Component} from 'react';
import GameBoard from "./GameBoard";
import Modal from "./Modal";
import {database} from './firebaseConfig'

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
        moleTime: 1500,
        gameTime: 120000,
        isGameEnd: null,
        currentIntervalId: null,
        modalOpen: false,
        gamerName: '',
        scores: [],
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
            this.takeScores();
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
            this.setState({moleTime: 800})
        }
        if (this.state.score === 50) {
            this.setState({moleTime: 500})
        }
    };

    handleCloseModal = () => {
        this.setState({modalOpen: false});
    };

    onChangeName = (name) => {
        this.setState({gamerName: name})
    };

    saveScore = () => {
        if (this.state.gamerName !== '') {
            database.ref(`/scores`).push({name: this.state.gamerName, score: this.state.score});
            this.setState({gamerName: ''})
        }
    };

    takeScores() {
        database.ref(`/scores`).on(
            'value',
            snapshot => this.setState({scores: snapshot.val()})
        )
    }

    render() {
        return (
            <div
                style={gameBoardStyle}
            >
                <h1>Score: {this.state.score}</h1>

                <Modal
                    modalOpen={this.state.modalOpen}
                    handleCloseModal={this.handleCloseModal}
                    score={this.state.score}
                    onChangeName={this.onChangeName}
                    gamerName={this.state.gamerName}
                    saveScore={this.saveScore}
                    scores={this.state.scores}
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

