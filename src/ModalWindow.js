import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
    },
});

class ModalWindow extends React.Component {


    render() {
        const {classes} = this.props;

        return (
            <div>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.props.modalOpen}
                    onClose={this.props.handleCloseModal}
                >
                    <div style={getModalStyle()} className={classes.paper}>
                        <Typography variant="h6" id="modal-title">
                            <strong>Twój wynik to:</strong>
                        </Typography>
                        <Typography variant="subtitle1" id="simple-modal-description">
                            {this.props.score}
                        </Typography>

                        <TextField
                            label="Imię"
                            value={this.props.gamerName}
                            onChange={event => this.props.onChangeName(event.target.value)}
                            margin="normal"
                        />
                        <div>
                            <Button
                                variant="contained"
                                onClick={this.props.saveScore}
                            >
                                Zapisz wynik
                            </Button>
                        </div>
                        <SimpleModalWrapped/>
                    </div>
                </Modal>
            </div>
        );
    }
}

const SimpleModalWrapped = withStyles(styles)(ModalWindow);

export default SimpleModalWrapped;