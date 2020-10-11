import { SET_USERS } from '../actions/types';

const INITIAL_STATE = {
    users: {},
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_USERS: {
            return {
                users: action.users,
            };
        }

        default:
            return state;
    }
};
