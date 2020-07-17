import React, { memo, useState, useEffect } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import TableToolbar from './table-toolbar';
import TableHeader from './table-header';
import TableItemRow from './table-item-row';
import TableError from './table-error';

const DynamicTable = memo(
  ({
    deleteItem,
    updateItem,
    addItem,
    config,
    fetchData,
    formComponent,
    cache = 0,
  }) => {
    if (!config) {
      return (
        <TableContainer>
          <Table>
            <TableError>No table config provided</TableError>
          </Table>
        </TableContainer>
      );
    }

    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(config.rows || 10);
    const [error, setError] = useState(null);

    const getData = () => {
      if (!fetchData) {
        setError(
          'No fetch data function exists, please add a fetchData function',
        );
        return null;
      }

      const params = {
        limit: rowsPerPage,
        page,
        sort: 'name,ASC',
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
        setTimeout(() => setIsLoading(false), 1000)
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

    const { data: rows } = data;
    const shouldRenderRows = rows && rows.length > 0;
    const { columns = [], name = '' } = config;
    const tableColumnCount = columns.length + 2;

    return (
      <Paper>
        <TableToolbar name={name} setSearchQuery={setSearchQuery} />
        {isLoading && <LinearProgress style={{ width: '100%' }} />}
        <TableContainer>
          <Table>
            <TableHeader tableColumnCount={tableColumnCount} config={config} />
            <TableBody>
              {error && (
                <TableError tableColumnCount={tableColumnCount}>
                  {error}
                </TableError>
              )}
              {shouldRenderRows ? (
                rows.map(row => {
                  return (
                    <TableItemRow
                      key={row.id}
                      row={row}
                      columns={columns}
                      tableColumnCount={tableColumnCount}
                      handleDelete={handleDelete}
                      handleUpdate={handleUpdate}
                      openForm={() => {}}
                    />
                  );
                })
              ) : !isLoading && fetchData && (
                <TableError
                  tableColumnCount={tableColumnCount}
                  severity="warning"
                >
                  Nothing found yet in {name}
                </TableError>
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
