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

const DynamicTable = memo(
  ({
    name,
    deleteItem,
    updateItem,
    addItem,
    config,
    fetchData,
    formComponent,
    cache = 0,
  }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [error, setError] = useState(null);

    const getData = () => {
      if (!fetchData) {
        setError(
          'No fetch data function exists, please add a fetchData function',
        );
        return null;
      }

      console.log('getDataPage', page);

      const params = {
        limit: rowsPerPage,
        page,
        query: {
          alwaysPaginate: true,
          ...searchQuery,
        },
        cache,
      };

      setIsLoading(true);
      fetchData(params).then(res => {
        setCount(res.data.total);
        setData(res.data);
        setIsLoading(false);
      });
    };

    useEffect(() => {
      getData();
    }, [page]);

    const handleDelete = async id => {
      try {
        await deleteItem(id);
        await getData();
      } catch (e) {}
    };

    const handleUpdate = async input => {
      try {
        await updateItem(input);
        await getData();
      } catch (e) {}
    };

    const handleAdd = async input => {
      try {
        await addItem(input);
        await getData();
      } catch (e) {}
    };

    const handleChangePage = async (event, newPage) => {
      await setPage(newPage);
    };
    const handleChangeRowsPerPage = async event => {
      await setRowsPerPage(+event.target.value);
      await setPage(0);
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
                <div>
                  No data. Make sure to re-import data from the json file
                </div>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          rowsPerPageOptions={[10, 25, 100]}
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    );
  },
);

export default DynamicTable;
