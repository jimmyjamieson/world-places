import React, { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableToolbar from './table-toolbar';
import TableHeader from './table-header';

const defaultConfig = {
  rows: 10,
  order: 'name asc',
  columns: [
    {
      column: 'id',
      name: 'ID',
      type: 'string',
      value: 'id',
    },
    {
      column: 'code',
      name: 'CODE',
      type: 'string',
      value: 'code',
    },
    {
      column: 'name',
      name: 'NAME',
      type: 'string',
      value: 'nativeName',
    },
    {
      column: 'regions',
      name: 'REGIONS',
      type: 'array',
      value: 'regions?.length',
    },
    {
      column: 'coords',
      name: 'COORDS',
      type: 'number',
      value: 'coords',
    },
  ],
};

const DynamicTable = ({
  deleteItem,
  updateItem,
  addItem,
  onAddSuccess,
  onDeleteSuccess,
  onUpdateSuccess,
  config = defaultConfig,
  fetchData,
  formComponent,
}) => {
  const [ isLoading, setIsLoading ] = useState(false)
  const [ data, setData ] = useState([])
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const getData = () => {
    setIsLoading(true)
    fetchData().then(res => {
      setData(res.data)
      setIsLoading(false)
    });
  }

  useEffect(() => {
    getData()
  }, [])

  const handleDelete = async id => {
    try {
      await deleteItem(id);
      onDeleteSuccess();
    } catch (e) {}
  };

  const handleUpdate = async input => {
    try {
      await updateItem(input);
      onUpdateSuccess();
    } catch (e) {}
  };

  const handleAdd = async input => {
    try {
      await addItem(input);
      onAddSuccess();
    } catch (e) {}
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper>
      <TableToolbar />
      <TableContainer>
        <Table>
          <TableHeader config={config} />
          <TableBody>
            { isLoading && '...Loading'}
            {data && data.length > 0 ? (
              data.map(item => (
                <TableRow
                  config={config}
                  item={item}
                  handleDelete={handleDelete}
                  handleUpdate={handleUpdate}
                  openForm={() => {}}
                />
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
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default DynamicTable;
