import React, { useState } from 'react';
import axios from 'axios';
import { getCookie } from '../../utils/Helpers';
import { connect } from 'react-redux';
import { setIsSaved } from '../../actions';
import { ButtonContainer, Button } from '../../styles/Buttons';
import Notification from '../Notification';

const API_URL =
    process.env.REACT_APP_ENVIRONMENT === 'development'
        ? 'http://localhost:8888/api'
        : process.env.REACT_APP_API;

function SaveButton({ boards, isSaved, setIsSaved }) {
    const [values, setValues] = useState({
        buttonText: 'Save Changes',
    });

    const token = getCookie('token');

    const saveBoard = () => {
        setValues({ ...values, buttonText: 'Save Changes..' });
        let data = {
            boards: boards,
        };
        axios({
            method: 'PUT',
            url: `${API_URL}/board/update`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: data,
        })
            .then((response) => {
                console.log(response);
                setIsSaved(true);
                setValues({ ...values, buttonText: 'Save Changes' });
                Notification('Saved Changes.', 'success');
            })
            .catch((error) => {
                console.log(error.response.data.error);
                Notification(error.response.data.error, 'danger');
            });
    };
    return (
        <ButtonContainer style={{ marginBottom: '0' }}>
            <Button disabled={isSaved} bgColor={'#1abf75'} onClick={saveBoard}>
                {values.buttonText}
            </Button>
        </ButtonContainer>
    );
}

const mapStateToProps = (state) => {
    return {
        boards: state.board.boards,
        isSaved: state.board.isSaved,
    };
};

export default connect(mapStateToProps, { setIsSaved })(SaveButton);
