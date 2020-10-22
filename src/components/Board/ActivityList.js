import React from 'react';
import Activity from './Activity';

// To optimize, and prevent multiple React renders, React.memo() is used.
// Similar to usage of shouldComponentUpdate()
const ActivityList = React.memo((props) => {
    const { columnID, color } = props;

    return props.activities.map((activity, index) => (
        <Activity
            key={activity._id}
            activity={activity}
            index={index}
            columnID={columnID}
            color={color}
        />
    ));
});

export default ActivityList;
