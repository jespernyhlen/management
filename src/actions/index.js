import {
    SET_ACTIVITY,
    UPDATE_ACTIVITY,
    ADD_ACTIVITY,
    DELETE_ACTIVITY,
    MOVE_ACTIVITY,
    OPEN_MODAL,
} from './types';

export const openModal = (open, type, columnId, activityId) => async (
    dispatch
) => {
    dispatch({
        type: OPEN_MODAL,
        payload: { open, type, columnId, activityId },
    });
};

export const addActivity = (newActivity, columnId) => async (dispatch) => {
    dispatch({ type: ADD_ACTIVITY, payload: { newActivity, columnId } });
};

export const deleteActivity = (activityId, columnId) => async (dispatch) => {
    dispatch({ type: DELETE_ACTIVITY, payload: { activityId, columnId } });
};

export const moveActivity = (destination, source, draggableId) => async (
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
        payload: { destination, source, draggableId },
    });
};

export const setActivity = (id) => async (dispatch) => {
    dispatch({ type: SET_ACTIVITY, payload: { id } });
};

export const updateActivity = (activity) => async (dispatch) => {
    console.log(activity);
    dispatch({ type: UPDATE_ACTIVITY, payload: { activity } });
};
