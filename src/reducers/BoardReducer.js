import {
    SET_IS_INITIALIZED,
    SET_IS_SAVED,
    SET_BOARD,
    ADD_ACTIVITY,
    UPDATE_ACTIVITY,
    DELETE_ACTIVITY,
    SET_ACTIVITY,
    MOVE_ACTIVITY,
} from '../actions/types';

const INITIAL_STATE = {
    isInitialized: false,
    isSaved: true,
    activeActivity: {},
    activities: [],
    columns: [],
    columnOrder: [],
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
        case SET_BOARD: {
            // stateCopy = { ...state };
            console.log(action.activities);
            console.log(state.activities);
            // console.log(action.columns);
            // console.log(state.columns);
            // console.log(action.columnOrder);
            // console.log(state.columnOrder);

            return {
                ...state,
                activeActivity: {},
                activities: action.activities,
                columns: action.columns,
                columnOrder: action.columnOrder,
            };
        }
        case SET_ACTIVITY: {
            stateCopy = { ...state };
            let ID = action.id;

            let active = ID
                ? stateCopy.activities.filter((activity) => {
                      return activity.id === ID;
                  })
                : null;

            return {
                ...stateCopy,
                activeActivity: active ? active[0] : {},
            };
        }

        case UPDATE_ACTIVITY: {
            stateCopy = { ...state };
            let ID = action.payload.activity.id;
            let newActivity = action.payload.activity;

            let updatedActivities = stateCopy.activities.map((activity) => {
                if (activity.id === ID) return (activity = newActivity);
                return activity;
            });

            return {
                ...state,
                activities: updatedActivities,
            };
        }
        case ADD_ACTIVITY: {
            stateCopy = { ...state };
            let columnID = action.columnID;
            let activity = action.newActivity;

            let column = stateCopy.columns.filter((column) => {
                return column.id === columnID;
            });
            column = column[0];

            column.activityIDs.push(activity.id);
            stateCopy.activities.push(activity);

            return {
                ...stateCopy,
                activities: stateCopy.activities,
                columns: stateCopy.columns,
            };
        }

        case DELETE_ACTIVITY: {
            stateCopy = { ...state };
            let columnID = action.payload.columnID;
            let activityID = action.payload.activityID;

            // Remove Activity from column
            let column = stateCopy.columns.filter((column) => {
                return column.id === columnID;
            });
            column = column[0];

            let activityIDs = column.activityIDs;
            let activityindex = activityIDs.indexOf(activityID);
            activityIDs.splice(activityindex, 1);

            // Remove Activity from activities
            let activities = stateCopy.activities.filter((activity) => {
                return activity.id !== activityID;
            });

            return {
                ...stateCopy,
                activities: activities,
                columns: stateCopy.columns,
            };
        }

        case MOVE_ACTIVITY: {
            stateCopy = { ...state };

            const { destination, source, draggableID } = action;
            let fromColumn = stateCopy.columns.filter((column) => {
                return column.id === source.droppableId;
            });
            fromColumn = fromColumn[0];

            let toColumn = stateCopy.columns.filter((column) => {
                return column.id === destination.droppableId;
            });
            toColumn = toColumn[0];

            // If item is not dropped in same column as it was originally from
            if (fromColumn !== toColumn) {
                let fromActivityIDs = fromColumn.activityIDs;
                let toActivityIDs = toColumn.activityIDs;

                fromActivityIDs.splice(source.index, 1);

                let newFromColumn = {
                    ...fromColumn,
                    activityIDs: fromActivityIDs,
                };

                toActivityIDs.splice(destination.index, 0, draggableID);

                let newToColumn = {
                    ...toColumn,
                    activityIDs: toActivityIDs,
                };

                let newColumns = stateCopy.columns.map((column) => {
                    if (column.id === newFromColumn.id)
                        return (column = newFromColumn);
                    if (column.id === newToColumn.id)
                        return (column = newToColumn);
                    return column;
                });

                console.log(newColumns);

                return {
                    ...stateCopy,
                    columns: newColumns,
                };
            }
            // If item is dropped in same column as it was originally from
            let fromActivityIDs = fromColumn.activityIDs;

            fromActivityIDs.splice(source.index, 1);
            fromActivityIDs.splice(destination.index, 0, draggableID);

            let newFromColumn = {
                ...fromColumn,
                activityIDs: fromActivityIDs,
            };

            let newColumns = stateCopy.columns.map((column) => {
                if (column.id === newFromColumn.id)
                    return (column = newFromColumn);
                return column;
            });

            return {
                ...stateCopy,
                columns: newColumns,
            };
        }

        default:
            return state;
    }
};

// const INITIAL_STATE = {
//     activeActivity: {},
//     activities: [
//         {
//             id: 'activity-1',
//             title: 'Payment gatway redesign.',
//             content:
//                 'Modernizr feature detection library, complete with a custom build configuration.',
//             date: '2020-04-12',
//             notification: [
//                 {
//                     color: '#da1b1bc7',
//                     content: 'Important',
//                 },
//             ],
//         },
//         {
//             id: 'activity-2',
//             title: 'Portfolio v2.',
//             content:
//                 'Intergration with cloud providers and modernizr feature detection library, complete with a custom build configuration.',
//             date: '2020-08-24',
//             notification: [
//                 {
//                     color: '#83BB41',
//                     content: 'Business',
//                 },
//             ],
//         },
//         {
//             id: 'activity-3',
//             title: 'Change hosting provider.',
//             content:
//                 'Modernizr feature detection library, complete with a custom build configuration.',
//             date: '2020-09-12',
//             notification: [
//                 {
//                     color: '#da1b1bc7',
//                     content: 'Important',
//                 },
//             ],
//         },
//         {
//             id: 'activity-4',
//             title: 'Payment gatway redesign.',
//             content:
//                 'Modernizr feature detection library, complete with a custom build configuration.',
//             date: '2020-09-02',
//             notification: [
//                 {
//                     color: '#da1b1bc7',
//                     content: 'Important',
//                 },
//             ],
//         },
//         {
//             id: 'activity-5',
//             title: 'Portfolio v2.',
//             content:
//                 'Intergration with cloud providers and modernizr feature detection library, complete with a custom build configuration.',
//             date: '2020-10-30',
//             notification: [
//                 {
//                     color: '#83BB41',
//                     content: 'Business',
//                 },
//             ],
//         },
//         {
//             id: 'activity-6',
//             title: 'Change hosting provider.',
//             content:
//                 'Modernizr feature detection library, complete with a custom build configuration.',
//             date: '2020-08-22',
//             notification: [
//                 {
//                     color: '#da1b1bc7',
//                     content: 'Important',
//                 },
//             ],
//         },
//         {
//             id: 'activity-7',
//             title: 'Scoping Session TLF.',
//             content:
//                 'New intergration with cloud providers. Collaborate seamlessly with engineers, product and scrum masters.',
//             date: '2020-07-07',
//             notification: [
//                 {
//                     color: '#1b73dab3',
//                     content: 'Important',
//                 },
//             ],
//         },
//         {
//             id: 'activity-8',
//             title: 'HTML5 Boilerplate.',
//             content:
//                 'Collaborate seamlessly with product, engineers and scrum masters.',
//             date: '2020-08-13',
//             notification: [
//                 {
//                     color: '',
//                     content: '',
//                 },
//             ],
//         },
//         {
//             id: 'activity-9',
//             title: 'New API intergration.',
//             content:
//                 'Intergrate the extension to appear further, build configuration to enhance deployment.',
//             date: '2020-06-04',
//             notification: [
//                 {
//                     color: '#83BB41',
//                     content: 'Company',
//                 },
//             ],
//         },
//         {
//             id: 'activity-10',
//             title: 'Analytics, icons, and more.',
//             content:
//                 'Modernizr feature detection library, complete with a custom build configuration.',
//             date: '2020-04-26',
//             notification: [
//                 {
//                     color: '',
//                     content: '',
//                 },
//             ],
//         },
//     ],
//     columns: [
//         {
//             id: 'column-1',
//             title: 'IDEAS',
//             color: '#635CA2',
//             activityIDs: ['activity-1', 'activity-2', 'activity-3'],
//         },
//         {
//             id: 'column-2',
//             title: 'STARTED',
//             color: '#5493D9',
//             activityIDs: ['activity-4', 'activity-5', 'activity-6'],
//         },
//         {
//             id: 'column-3',
//             title: 'IN PROGRESS',
//             color: '#CF5D73',
//             activityIDs: ['activity-7', 'activity-8'],
//         },
//         {
//             id: 'column-4',
//             title: 'COMPLETED',
//             color: '#93D048',
//             activityIDs: ['activity-9', 'activity-10'],
//         },
//     ],
//     columnOrder: ['column-1', 'column-2', 'column-3', 'column-4'],
// };
