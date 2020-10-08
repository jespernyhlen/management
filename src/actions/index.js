import {
    SET_IS_INITIALIZED,
    SET_IS_SAVED,
    ADD_BOARD,
    SET_BOARD,
    SET_BOARDS,
    SET_BOARDINDEX,
    UPDATE_BOARD,
    DELETE_BOARD,
    ADD_COLUMN,
    UPDATE_COLUMN,
    DELETE_COLUMN,
    SET_COLUMN,
    SET_ACTIVITY,
    UPDATE_ACTIVITY,
    ADD_ACTIVITY,
    DELETE_ACTIVITY,
    MOVE_ACTIVITY,
    OPEN_MODAL,
} from './types';

export const openModal = (open, info) => async (dispatch) => {
    dispatch({
        type: OPEN_MODAL,
        open,
        info,
    });
};

export const setIsInitialized = (isInitialized) => async (dispatch) => {
    dispatch({
        type: SET_IS_INITIALIZED,
        isInitialized,
    });
};

export const setIsSaved = (isSaved) => async (dispatch) => {
    dispatch({
        type: SET_IS_SAVED,
        isSaved,
    });
};

export const addBoard = (board) => async (dispatch) => {
    dispatch({
        type: ADD_BOARD,
        board,
    });
};

export const updateBoard = (board) => async (dispatch) => {
    dispatch({
        type: UPDATE_BOARD,
        board,
    });
};

export const setBoard = (activities, columns, columnOrder) => async (
    dispatch
) => {
    dispatch({
        type: SET_BOARD,
        activities,
        columns,
        columnOrder,
    });
};

export const deleteBoard = (boardID) => async (dispatch) => {
    dispatch({
        type: DELETE_BOARD,
        boardID,
    });
};

export const setBoards = (boards) => async (dispatch) => {
    dispatch({
        type: SET_BOARDS,
        boards,
    });
};

export const setBoardIndex = (index) => async (dispatch) => {
    dispatch({
        type: SET_BOARDINDEX,
        index,
    });
};

export const addColumn = (column) => async (dispatch) => {
    dispatch({
        type: ADD_COLUMN,
        column,
    });
};

export const updateColumn = (column) => async (dispatch) => {
    dispatch({
        type: UPDATE_COLUMN,
        column,
    });
};

export const deleteColumn = (columnID) => async (dispatch) => {
    console.log('sdaadsas');
    dispatch({ type: DELETE_COLUMN, columnID });
};

export const setColumn = (columnID) => async (dispatch) => {
    console.log(columnID);

    dispatch({ type: SET_COLUMN, columnID });
};

export const addActivity = (newActivity, columnID) => async (dispatch) => {
    dispatch({ type: ADD_ACTIVITY, newActivity, columnID });
};

export const updateActivity = (activity) => async (dispatch) => {
    dispatch({ type: UPDATE_ACTIVITY, activity });
};

export const deleteActivity = (activityID, columnID) => async (dispatch) => {
    dispatch({ type: DELETE_ACTIVITY, activityID, columnID });
};

export const moveActivity = (destination, source, draggableID) => async (
    dispatch
) => {
    // If item has not been moved
    if (!destination) return;

    let isSameColumn = source.droppableId === destination.droppableId;
    let isSameIndex = source.index === destination.index;

    // If item moved to same location
    if (isSameColumn && isSameIndex) return;

    dispatch({
        type: MOVE_ACTIVITY,
        destination,
        source,
        draggableID,
    });
};

export const setActivity = (activityID) => async (dispatch) => {
    dispatch({ type: SET_ACTIVITY, activityID });
};
