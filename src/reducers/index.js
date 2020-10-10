import { combineReducers } from 'redux';
import BoardReducer from './BoardReducer';
import ModalReducer from './ModalReducer';
import ResizeReducer from './ResizeReducer';

export default combineReducers({
    board: BoardReducer,
    modal: ModalReducer,
    resize: ResizeReducer,
});
