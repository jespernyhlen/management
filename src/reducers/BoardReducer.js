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
    ADD_ACTIVITY,
    UPDATE_ACTIVITY,
    DELETE_ACTIVITY,
    SET_ACTIVITY,
    MOVE_ACTIVITY,
} from '../actions/types';

const INITIAL_STATE = {
    isInitialized: false,
    isSaved: true,
    boardIndex: 0,
    activeActivity: {},
    activeColumn: {},
    boards: [],
};

export default (state = INITIAL_STATE, action) => {
    let stateCopy;

    switch (action.type) {
        case SET_IS_INITIALIZED: {
            return {
                ...state,
                isInitialized: action.isInitialized,
            };
        }
        case SET_IS_SAVED: {
            return {
                ...state,
                isSaved: action.isSaved,
            };
        }
        case ADD_BOARD: {
            stateCopy = { ...state };
            console.log(state.boards[0]);

            if (!action.board.title) return { ...state };

            stateCopy.boards.push({
                title: action.board.title,
                activities: [],
                columns: [
                    {
                        id: 'column-1',
                        title: 'Example',
                        color: '#635CA2',
                        activityIDs: [],
                    },
                ],
                columnOrder: ['column-1'],
            });
            return {
                ...stateCopy,
                boards: stateCopy.boards,
                isSaved: false,
            };
        }

        case SET_BOARD: {
            return {
                ...state,
                activeActivity: {},
                activities: action.activities,
                columns: action.columns,
                columnOrder: [...action.columnOrder],
            };
        }

        case SET_BOARDS: {
            return {
                ...state,
                boards: action.boards,
            };
        }

        case UPDATE_BOARD: {
            stateCopy = { ...state };

            let ID = action.board.id;
            let newTitle = action.board.title;

            stateCopy.boards.map((board) => {
                if (board._id === ID) board.title = newTitle;
                return board;
            });

            return {
                ...stateCopy,
                boards: stateCopy.boards,
                isSaved: false,
            };
        }

        case DELETE_BOARD: {
            stateCopy = { ...state };

            stateCopy.boards.splice(action.boardID, 1);

            return {
                ...stateCopy,
                boardIndex: 0,
                isSaved: false,
            };
        }
        case SET_BOARDINDEX: {
            console.log(action.index);
            return {
                ...state,
                boardIndex: action.index,
            };
        }

        case ADD_COLUMN: {
            stateCopy = { ...state };
            let currentBoard = stateCopy.boards[state.boardIndex];

            if (!action.column.title) return { ...state };

            currentBoard.columns.push({
                id: action.column.id,
                title: action.column.title,
                color: action.column.color,
                activityIDs: [],
            });

            currentBoard.columnOrder.push(action.column.id);
            return {
                ...stateCopy,
                isSaved: false,
            };
        }

        case UPDATE_COLUMN: {
            stateCopy = { ...state };
            let currentBoard = stateCopy.boards[state.boardIndex];
            let ID = action.column.id;
            let newColumn = action.column;

            currentBoard.columns = currentBoard.columns.map((column) => {
                if (column.id === ID) {
                    return (column = newColumn);
                }
                return column;
            });

            return {
                ...stateCopy,
                isSaved: false,
            };
        }

        case DELETE_COLUMN: {
            stateCopy = { ...state };
            let currentBoard = stateCopy.boards[state.boardIndex];
            let columnID = action.columnID;

            // Remove Activity from column
            let column = currentBoard.columns.filter((column) => {
                return column.id === columnID;
            });
            column = column[0];

            let activityIDs = column.activityIDs;

            activityIDs.forEach((activity) => {
                let activityindex = activityIDs.indexOf(activity);
                activityIDs.splice(activityindex, 1);
            });

            currentBoard.columnOrder = currentBoard.columnOrder.filter(
                (column) => {
                    return column !== columnID;
                }
            );

            // Remove Activity from activities
            currentBoard.columns = currentBoard.columns.filter((column) => {
                return column.id !== columnID;
            });
            console.log(currentBoard);

            return {
                ...stateCopy,
                isSaved: false,
            };
        }

        case SET_COLUMN: {
            stateCopy = { ...state };
            console.log(stateCopy);

            let ID = action.columnID;
            let currentBoard = stateCopy.boards[state.boardIndex];
            let column = {};

            if (ID) {
                let active = currentBoard.columns.filter((column) => {
                    return column.id === ID;
                });
                column = active[0];
            }

            return {
                ...stateCopy,
                activeColumn: column,
            };
        }
        case SET_ACTIVITY: {
            stateCopy = { ...state };

            let ID = action.activityID;
            let currentBoard = stateCopy.boards[state.boardIndex];
            let activity = {};

            if (ID) {
                let active = currentBoard.activities.filter((activity) => {
                    return activity.id === ID;
                });
                activity = active[0];
            }

            return {
                ...stateCopy,
                activeActivity: activity,
            };
        }

        case UPDATE_ACTIVITY: {
            stateCopy = { ...state };
            let currentBoard = stateCopy.boards[state.boardIndex];
            let ID = action.activity.id;
            let newActivity = action.activity;

            currentBoard.activities = currentBoard.activities.map(
                (activity) => {
                    if (activity.id === ID) {
                        return (activity = newActivity);
                    }
                    return activity;
                }
            );

            return {
                ...stateCopy,
                isSaved: false,
            };
        }
        case ADD_ACTIVITY: {
            stateCopy = { ...state };
            let currentBoard = stateCopy.boards[state.boardIndex];
            let columnID = action.columnID;
            let activity = action.newActivity;

            let column = currentBoard.columns.filter((column) => {
                return column.id === columnID;
            });
            column = column[0];

            column.activityIDs.push(activity.id);
            currentBoard.activities.push(activity);

            return {
                ...stateCopy,
                isSaved: false,
            };
        }

        case DELETE_ACTIVITY: {
            stateCopy = { ...state };
            let currentBoard = stateCopy.boards[state.boardIndex];
            let columnID = action.columnID;
            let activityID = action.activityID;

            // Remove Activity from column
            let column = currentBoard.columns.filter((column) => {
                return column.id === columnID;
            });
            column = column[0];

            let activityIDs = column.activityIDs;
            let activityindex = activityIDs.indexOf(activityID);
            activityIDs.splice(activityindex, 1);

            // Remove Activity from activities
            currentBoard.activities = currentBoard.activities.filter(
                (activity) => {
                    return activity.id !== activityID;
                }
            );

            return {
                ...stateCopy,
                isSaved: false,
            };
        }

        case MOVE_ACTIVITY: {
            stateCopy = { ...state };
            let currentBoard = stateCopy.boards[state.boardIndex];

            const { destination, source, draggableID } = action;
            let fromColumn = currentBoard.columns.filter((column) => {
                return column.id === source.droppableId;
            });
            fromColumn = fromColumn[0];

            let toColumn = currentBoard.columns.filter((column) => {
                return column.id === destination.droppableId;
            });
            toColumn = toColumn[0];

            // If item is not dropped in same column as it was originally from
            if (fromColumn !== toColumn) {
                let fromActivityIDs = fromColumn.activityIDs;
                let toActivityIDs = toColumn.activityIDs;

                fromActivityIDs.splice(source.index, 1);
                toActivityIDs.splice(destination.index, 0, draggableID);
                return {
                    ...stateCopy,
                    isSaved: false,
                };
            }
            // If item is dropped in same column as it was originally from
            let fromActivityIDs = fromColumn.activityIDs;

            fromActivityIDs.splice(source.index, 1);
            fromActivityIDs.splice(destination.index, 0, draggableID);

            return {
                ...stateCopy,
                isSaved: false,

                // columns: newColumns,
            };
        }

        default:
            return state;
    }
};
