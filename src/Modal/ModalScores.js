import React from 'react';
import Typography from "@material-ui/core/Typography";

const ModalScores = (props) => {

    return (
        <div>
            <Typography
                variant="h6"
                id="modal-title"
                style={{
                    marginTop: '10px',
                    marginBottom: '10px'
                }}
            >
                <strong>Najlepsze wyniki:</strong>
            </Typography>

            <ol>
                {
                    Object.entries(props.scores)
                        .map(
                            ([key, value]) => {
                                return (
                                    <li
                                        style={{
                                            margin: '10px',
                                        }}
                                        key={key}
                                    >
                                        <strong>{value.name}</strong>: {value.score}
                                    </li>
                                )
                            }
                        )
                }
            </ol>
        </div>
    );
};

export default ModalScores;