import { OPEN_MODAL } from '../actions/types';

const INITIAL_STATE = {
    modalOpen: false,
    info: {
        scope: '',
        action: '',
        boardID: '',
        columnID: '',
        activityID: '',
        color: '',
    },
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case OPEN_MODAL: {
            return {
                ...state,
                modalOpen: action.open,
                info: {
                    scope: action.info ? action.info.scope : '',
                    action: action.info ? action.info.action : '',
                    boardID: action.info ? action.info.boardID : null,
                    columnID: action.info ? action.info.columnID : '',
                    activityID: action.info ? action.info.activityID : '',
                    color: action.info ? action.info.color : '',
                },
            };
        }

        default:
            return state;
    }
};
