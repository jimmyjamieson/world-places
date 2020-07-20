import React from 'react';
import Button from '@material-ui/core/Button';
import ArrowUpward from '@material-ui/icons/ArrowUpward';

const ExportButton = ({ className }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      className={className}
      endIcon={<ArrowUpward>Export</ArrowUpward>}
    >
      Export
    </Button>
  );
};

export default ExportButton;
