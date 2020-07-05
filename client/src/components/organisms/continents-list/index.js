import React, { useState } from 'react';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';

const ContinentsList = ({ list }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  return (
    <Paper>
      <Toolbar>
        <Typography variant="h6" id="tableTitle" component="div">
          Continents
        </Typography>
        <TextField label="Search" />
      </Toolbar>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell component="th">ID</TableCell>
              <TableCell component="th">CODE</TableCell>
              <TableCell component="th">NAME</TableCell>
              <TableCell component="th">NATIVE</TableCell>
              <TableCell component="th" align="right">
                COORDS
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.length > 0
              ? list.map(item => (
                  <TableRow>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.code}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.nativeName}</TableCell>
                    <TableCell align="right">{item.coords}</TableCell>
                  </TableRow>
                ))
              : 'no data'}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        count={list.length}
        rowsPerPage={rowsPerPage}
        page={page}
      />
    </Paper>
  );
};

export default ContinentsList;
