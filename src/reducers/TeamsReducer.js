import {
    SET_TEAMS,
    ADD_TEAM,
    UPDATE_TEAM,
    DELETE_TEAM,
} from '../actions/types';

const INITIAL_STATE = {
    data: [],
};

export default (state = INITIAL_STATE, action) => {
    let stateCopy;

    switch (action.type) {
        case SET_TEAMS: {
            return {
                data: action.teams,
            };
        }

        case UPDATE_TEAM: {
            stateCopy = { ...state };
            let newTeam = action.team;

            stateCopy.data = stateCopy.data.map((team) => {
                if (team._id === newTeam._id) return (team = newTeam);
                return team;
            });

            return {
                ...stateCopy,
            };
        }

        case DELETE_TEAM: {
            stateCopy = { ...state };
            let ID = action.id;
            stateCopy.data = stateCopy.data.filter((team) => team._id !== ID);

            return {
                ...stateCopy,
            };
        }

        case ADD_TEAM: {
            stateCopy = { ...state };
            let newTeam = action.team;

            stateCopy.data.push(newTeam);
            return {
                ...stateCopy,
            };
        }

        default:
            return state;
    }
};
