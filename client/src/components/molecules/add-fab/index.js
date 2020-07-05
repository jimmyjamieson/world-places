import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const AddFab = ({ onClick }) => {
  return (
    <Fab color="secondary" aria-label="add" onClick={onClick}>
      <AddIcon />
    </Fab>
  )
}

export default AddFab