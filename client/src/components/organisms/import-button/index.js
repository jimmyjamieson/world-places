import React from 'react';
import Button from '@material-ui/core/Button';
import ArrowDownward from '@material-ui/icons/ArrowDownward';


const ImportButton = ({ className }) => {
  return (
    <Button
      variant="contained"
      color="secondary"
      className={className}
      endIcon={<ArrowDownward>Import</ArrowDownward>}
    >
      Import
    </Button>
  );
};

export default ImportButton;
