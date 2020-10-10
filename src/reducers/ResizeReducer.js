import { SET_WIDTH } from '../actions/types';

const INITIAL_STATE = {
    width: 0,
    device: '',
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_WIDTH: {
            let device = 'desktop';

            if (action.width <= 600) {
                device = 'mobile';
            } else if (action.width <= 768) {
                device = 'tabletSmall';
            } else if (action.width <= 900) {
                device = 'tablet';
            } else if (action.width <= 1024) {
                device = 'laptopSmall';
            } else if (action.width <= 1260) {
                device = 'laptop';
            }

            return {
                width: action.width,
                device: device,
            };
        }

        default:
            return state;
    }
};
