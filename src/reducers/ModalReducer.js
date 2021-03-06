import { OPEN_MODAL } from '../actions/types';

const INITIAL_STATE = {
    isOpen: false,
    scope: '',
    action: '',
    boardID: '',
    columnID: '',
    activityID: '',
    color: '',
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case OPEN_MODAL: {
            return {
                ...state,
                isOpen: action.open,
                scope: action.info ? action.info.scope : '',
                action: action.info ? action.info.action : '',
                boardID: action.info ? action.info.boardID : null,
                columnID: action.info ? action.info.columnID : '',
                activityID: action.info ? action.info.activityID : '',
                teamID: action.info ? action.info.teamID : '',
                color: action.info ? action.info.color : '',
                content: action.info ? action.info.content : {},
            };
        }

        default:
            return state;
    }
};
