import React, { Fragment, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import CircularProgress from '@material-ui/core/CircularProgress';
import { importData } from '../../../utils/api';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

const ImportButton = ({ className }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  function handleImportData() {
    setDialogOpen(true);
    importData();
    setTimeout(() => {
      setDialogOpen(false)
    }, 180000);
  }

  return (
    <Fragment>
      <Button
        onClick={handleImportData}
        variant="contained"
        color="secondary"
        className={className}
        endIcon={<ArrowDownward>Import</ArrowDownward>}
      >
        Import
      </Button>
      <Dialog open={dialogOpen}>
        <DialogTitle>Importing Data</DialogTitle>
        <DialogContent>
        <DialogContentText>Deleting your local database, and re-importing the JSON. This will take a few mins</DialogContentText>
          <div style={{textAlign: 'center'}}><CircularProgress /></div>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default ImportButton;
