import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

/* COMPONENTS */
import StandardForm from './StandardForm';
import ActivityView from './ActivityView';
import ModalContainer from './ModalContainer';

import {
    addActivity,
    updateActivity,
    addColumn,
    updateColumn,
    addBoard,
    updateBoard,
} from '../../actions';

// Templates for (Boards, Columns, Activities) and information associated with them.
const boardTemplate = {
    _id: '',
    title: '',
};

const columnTemplate = {
    _id: '',
    title: '',
    color: '#3e60ad',
};

const activityTemplate = {
    _id: '',
    title: '',
    content: '',
    date: '',
    noteColor: '',
    noteContent: '',
    members: [],
};

// Component to render forms.
// Based on provided scope and action, returns a "popup modal" with a form.
const FormsModal = ({
    modal,
    addActivity,
    updateActivity,
    addColumn,
    updateColumn,
    addBoard,
    updateBoard,
    saveBoard,
}) => {
    const getForm = () => {
        const scope = modal.scope;
        const action = modal.action;

        if (action == 'view') {
            return <ActivityView template={activityTemplate} />;
        }

        if (scope === 'activity') {
            return (
                <StandardForm
                    template={activityTemplate}
                    add={addActivity}
                    update={updateActivity}
                    saveBoard={saveBoard}
                />
            );
        }

        if (scope === 'column')
            return (
                <StandardForm
                    template={columnTemplate}
                    add={addColumn}
                    update={updateColumn}
                    saveBoard={saveBoard}
                />
            );

        if (scope === 'board')
            return (
                <StandardForm
                    template={boardTemplate}
                    add={addBoard}
                    update={updateBoard}
                    saveBoard={saveBoard}
                />
            );
    };

    return <ModalContainer>{getForm()}</ModalContainer>;
};

const mapStateToProps = (state) => {
    return {
        modal: state.modal,
    };
};

export default withRouter(
    connect(mapStateToProps, {
        addActivity,
        updateActivity,
        addColumn,
        updateColumn,
        addBoard,
        updateBoard,
    })(FormsModal)
);
