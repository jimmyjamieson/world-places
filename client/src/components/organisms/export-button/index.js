import React, { Fragment, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import CircularProgress from '@material-ui/core/CircularProgress';
import { exportData } from '../../../utils/api';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

const ImportButton = ({ className }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  function handleExportData() {
    setDialogOpen(true);
    exportData();
    setTimeout(() => {
      setDialogOpen(false)
    }, 60000);
  }

  return (
    <Fragment>
      <Button
        onClick={handleExportData}
        variant="contained"
        color="primary"
        className={className}
        endIcon={<ArrowDownward>Export</ArrowDownward>}
      >
        Export
      </Button>
      <Dialog open={dialogOpen}>
        <DialogTitle>Exporting Data</DialogTitle>
        <DialogContent>
          <DialogContentText>Exporting your data to JSON. Don't forget to commit and do a pull request</DialogContentText>
          <div style={{textAlign: 'center'}}><CircularProgress /></div>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default ImportButton;
