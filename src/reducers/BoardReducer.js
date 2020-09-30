import {
    ADD_ACTIVITY,
    UPDATE_ACTIVITY,
    DELETE_ACTIVITY,
    MOVE_ACTIVITY,
    SET_ACTIVITY,
} from '../actions/types';

const INITIAL_STATE = {
    activeActivity: {},
    activities: {
        'activity-1': {
            id: 'activity-1',
            title: 'Payment gatway redesign.',
            content:
                'Modernizr feature detection library, complete with a custom build configuration.',
            date: '2020-04-12',
            notification: {
                color: '#da1b1bc7',
                content: 'Important',
            },
        },
        'activity-2': {
            id: 'activity-2',
            title: 'Portfolio v2.',
            content:
                'Intergration with cloud providers and modernizr feature detection library, complete with a custom build configuration.',
            date: '2020-08-24',
            notification: {
                color: '#83BB41',
                content: 'Business',
            },
        },
        'activity-3': {
            id: 'activity-3',
            title: 'Change hosting provider.',
            content:
                'Modernizr feature detection library, complete with a custom build configuration.',
            date: '2020-09-12',
            notification: {
                color: '#da1b1bc7',
                content: 'Important',
            },
        },
        'activity-4': {
            id: 'activity-4',
            title: 'Payment gatway redesign.',
            content:
                'Modernizr feature detection library, complete with a custom build configuration.',
            date: '2020-09-02',
            notification: {
                color: '#da1b1bc7',
                content: 'Important',
            },
        },
        'activity-5': {
            id: 'activity-5',
            title: 'Portfolio v2.',
            content:
                'Intergration with cloud providers and modernizr feature detection library, complete with a custom build configuration.',
            date: '2020-10-30',
            notification: {
                color: '#83BB41',
                content: 'Business',
            },
        },
        'activity-6': {
            id: 'activity-6',
            title: 'Change hosting provider.',
            content:
                'Modernizr feature detection library, complete with a custom build configuration.',
            date: '2020-08-22',
            notification: {
                color: '#da1b1bc7',
                content: 'Important',
            },
        },
        'activity-7': {
            id: 'activity-7',
            title: 'Scoping Session TLF.',
            content:
                'New intergration with cloud providers. Collaborate seamlessly with engineers, product and scrum masters.',
            date: '2020-07-07',
            notification: {
                color: '#1b73dab3',
                content: 'Important',
            },
        },
        'activity-8': {
            id: 'activity-8',
            title: 'HTML5 Boilerplate.',
            content:
                'Collaborate seamlessly with product, engineers and scrum masters.',
            date: '2020-08-13',
            notification: {
                color: '',
                content: '',
            },
        },
        'activity-9': {
            id: 'activity-9',
            title: 'New API intergration.',
            content:
                'Intergrate the extension to appear further, build configuration to enhance deployment.',
            date: '2020-06-04',
            notification: {
                color: '#83BB41',
                content: 'Company',
            },
        },
        'activity-10': {
            id: 'activity-10',
            title: 'Analytics, icons, and more.',
            content:
                'Modernizr feature detection library, complete with a custom build configuration.',
            date: '2020-04-26',
            notification: {
                color: '',
                content: '',
            },
        },
    },
    columns: {
        'column-1': {
            id: 'column-1',
            title: 'IDEAS',
            color: '#635CA2',
            activityIds: ['activity-1', 'activity-2', 'activity-3'],
        },
        'column-2': {
            id: 'column-2',
            title: 'STARTED',
            color: '#5493D9',
            activityIds: ['activity-4', 'activity-5', 'activity-6'],
        },
        'column-3': {
            id: 'column-3',
            title: 'IN PROGRESS',
            color: '#CF5D73',
            activityIds: ['activity-7', 'activity-8'],
        },
        'column-4': {
            id: 'column-4',
            title: 'COMPLETED',
            color: '#93D048',
            activityIds: ['activity-9', 'activity-10'],
        },
    },
    columnOrder: ['column-1', 'column-2', 'column-3', 'column-4'],
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_ACTIVITY:
            if (action.payload.id) {
                return {
                    ...state,
                    activeActivity: state.activities[action.payload.id],
                };
            }
            return {
                ...state,
                activeActivity: {},
            };

        case UPDATE_ACTIVITY:
            console.log(action.payload.activity.id);
            console.log(action.payload.activity);

            return {
                ...state,
                activities: {
                    ...state.activities,
                    [action.payload.activity.id]: action.payload.activity,
                },
            };
        case ADD_ACTIVITY:
            let newActivity = action.payload.newActivity;

            let firstColumn = state.columns[action.payload.columnId];
            let acitivityIds = Array.from(firstColumn.activityIds);

            acitivityIds.push(newActivity.id);

            let updatedFirstColumn = {
                ...firstColumn,
                activityIds: acitivityIds,
            };

            return {
                ...state,
                activities: {
                    ...state.activities,
                    [newActivity.id]: newActivity,
                },
                columns: {
                    ...state.columns,
                    [updatedFirstColumn.id]: updatedFirstColumn,
                },
            };

        case DELETE_ACTIVITY:
            let columnId = action.payload.columnId;
            let activityId = action.payload.activityId;

            // Remove Activity from column
            let column = { ...state.columns[columnId] };
            let activityIds = column.activityIds;
            let activityindex = activityIds.indexOf(activityId);
            activityIds.splice(activityindex, 1);

            let updatedColumn = {
                ...column,
                activityIds: activityIds,
            };

            let columns = {
                ...state.columns,
                [updatedColumn.id]: updatedColumn,
            };

            // Remove Activity from activities
            let activities = { ...state.activities };
            delete activities[activityId];

            return {
                ...state,
                activities: activities,
                columns: columns,
            };

        case MOVE_ACTIVITY:
            const { destination, source, draggableId } = action.payload;
            let updatedState = {};

            let fromColumn = state.columns[source.droppableId];
            let toColumn = state.columns[destination.droppableId];

            // If item is not dropped in same column as it was originally from
            if (fromColumn !== toColumn) {
                let fromActivityIds = Array.from(fromColumn.activityIds);
                let toActivityIds = Array.from(toColumn.activityIds);

                fromActivityIds.splice(source.index, 1);

                let newFromColumn = {
                    ...fromColumn,
                    activityIds: fromActivityIds,
                };

                toActivityIds.splice(destination.index, 0, draggableId);

                let newToColumn = {
                    ...toColumn,
                    activityIds: toActivityIds,
                };

                let newValues = {
                    ...state.columns,
                    [newToColumn.id]: newToColumn,
                    [newFromColumn.id]: newFromColumn,
                };

                updatedState = {
                    ...state,
                    columns: newValues,
                };
            } else {
                // If item is dropped in same column as it was originally from
                let fromActivityIds = Array.from(fromColumn.activityIds);

                fromActivityIds.splice(source.index, 1);
                fromActivityIds.splice(destination.index, 0, draggableId);

                let newFromColumn = {
                    ...fromColumn,
                    activityIds: fromActivityIds,
                };

                let newValues = {
                    ...state.columns,
                    [newFromColumn.id]: newFromColumn,
                };

                updatedState = {
                    ...state,
                    columns: newValues,
                };
            }
            return updatedState;

        default:
            return state;
    }
};
