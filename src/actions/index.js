import {
    SET_IS_INITIALIZED,
    SET_IS_SAVED,
    SET_BOARD,
    SET_ACTIVITY,
    UPDATE_ACTIVITY,
    ADD_ACTIVITY,
    DELETE_ACTIVITY,
    MOVE_ACTIVITY,
    OPEN_MODAL,
} from './types';

export const openModal = (open, type, columnID, activityID) => async (
    dispatch
) => {
    dispatch({
        type: OPEN_MODAL,
        payload: { open, type, columnID, activityID },
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

export const addActivity = (newActivity, columnID) => async (dispatch) => {
    dispatch({ type: ADD_ACTIVITY, newActivity, columnID });
};

export const deleteActivity = (activityID, columnID) => async (dispatch) => {
    dispatch({ type: DELETE_ACTIVITY, payload: { activityID, columnID } });
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

export const setActivity = (id) => async (dispatch) => {
    dispatch({ type: SET_ACTIVITY, id });
};

export const updateActivity = (activity) => async (dispatch) => {
    dispatch({ type: UPDATE_ACTIVITY, payload: { activity } });
};
