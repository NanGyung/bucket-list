import React from 'react';
import PropTypes from 'prop-types';
import DeleteButton from './DeleteButton';

const DeleteTask = ({item, deleteTask}) => {
    console.log(item,deleteTask);
    <DeleteButton
        id = {item.id}
        onPressOut = {deleteTask}
        completed={item.completed}
    />
};

DeleteTask.propTypes = {
    item: PropTypes.object.isRequired,
    deleteTask: PropTypes.func.isRequired
};

export default DeleteTask;