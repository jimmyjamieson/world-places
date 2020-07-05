import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import { deleteCountry } from '../../../utils/api';
import DeleteForever from '@material-ui/icons/DeleteForever';

const useStyles = makeStyles({
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

const CountriesList = ({ list, onDeleteSuccess }) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleDelete = async (id) => {
    try{
      console.log('id', id)
      await deleteCountry(id)
      onDeleteSuccess()
    } catch (e) {

    }
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper>
      <Toolbar variant="regular" className={classes.toolbar}>
        <Typography variant="h6" id="tableTitle" component="div">
          Countries
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
              <TableCell component="th">CONTINENT</TableCell>
              <TableCell component="th" align="right">
                COORDS
              </TableCell>
              <TableCell  align="right">DELETE</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.length > 0 ? (
              list.map(item => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.code}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.nativeName}</TableCell>
                  <TableCell>{item?.continent?.name}</TableCell>
                  <TableCell align="right">{item.coords}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => handleDelete(item.id)}>
                      <DeleteForever />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="7">
                  No data. Make sure to re-import data from the json file
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        rowsPerPageOptions={[10, 25, 100]}
        count={list.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default CountriesList;
