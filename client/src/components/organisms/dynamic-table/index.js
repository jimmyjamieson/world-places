import React, { memo, useState, useEffect } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import TableToolbar from './table-toolbar';
import TableHeader from './table-header';
import TableRow from './table-row';
import TableError from './table-error';

const DynamicTable = memo(({
  name,
  deleteItem,
  updateItem,
  addItem,
  onAddSuccess,
  onDeleteSuccess,
  onUpdateSuccess,
  config,
  fetchData,
  formComponent,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [error, setError] = useState(null);

  const getData = () => {
    if (!fetchData) {
      setError(
        'No fetch data function exists, please add a fetch data function',
      );
      return null;
    }

    const params = {
      limit: rowsPerPage,
      page,
      query: searchQuery,
    };

    setIsLoading(true);
    fetchData(params).then(res => {
      // console.log('res', res.data);
      setData(res.data);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getData();
  }, []);

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
    getData()
  };
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    getData()
  };

  return (
    <Paper>
      <TableToolbar name={name} setSearchQuery={setSearchQuery} />
      <TableContainer>
        <Table>
          <TableHeader config={config} />
          <TableBody>
            {isLoading && <LinearProgress />}
            {error && <TableError>{error}</TableError>}
            {!isLoading && data && data.length > 0 ? (
              data.forEach(item => {
                if (!item) return null;
                return (
                  <TableRow
                    key={item.id}
                    config={config}
                    item={item}
                    handleDelete={handleDelete}
                    handleUpdate={handleUpdate}
                    openForm={() => {}}
                  />
                );
              })
            ) : (
              <div>No data. Make sure to re-import data from the json file</div>
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
});

export default DynamicTable;
