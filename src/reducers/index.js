import { combineReducers } from 'redux';
import BoardReducer from './BoardReducer';
import ModalReducer from './ModalReducer';

export default combineReducers({
    board: BoardReducer,
    modal: ModalReducer,
});
