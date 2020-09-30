import { OPEN_MODAL } from '../actions/types';

const INITIAL_STATE = {
    modalOpen: false,
    modalType: '',
    modalIdColumn: '',
    modalIdActivity: '',
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case OPEN_MODAL:
            return {
                ...state,
                modalOpen: action.payload.open,
                modalType: action.payload.type,
                modalIdColumn: action.payload.columnId,
                modalIdActivity: action.payload.activityId,
            };

        default:
            return state;
    }
};
