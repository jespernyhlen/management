import { SET_USER, SET_USERS } from '../actions/types';

const INITIAL_STATE = {
    users: {},
    user: {},
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_USER: {
            return {
                user: action.user,
            };
        }
        case SET_USERS: {
            return {
                users: action.users,
            };
        }

        default:
            return state;
    }
};
