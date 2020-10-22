import { combineReducers } from 'redux';
import BoardReducer from './BoardReducer';
import ModalReducer from './ModalReducer';
import ResizeReducer from './ResizeReducer';
import UsersReducer from './UsersReducer';
import TeamsReducer from './TeamsReducer';

export default combineReducers({
    board: BoardReducer,
    modal: ModalReducer,
    resize: ResizeReducer,
    users: UsersReducer,
    teams: TeamsReducer,
});
