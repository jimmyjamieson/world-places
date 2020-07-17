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
import AddFab from '../../molecules/add-fab';

const DynamicTable = memo(
  ({
    fetchData,
    deleteData,
    createData,
    updateData,
    config,
    formComponent,
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
    const [order, setOrder] = useState(config.order || 'name, ASC');
    const [searchQuery, setSearchQuery] = useState({});
    const [rowsPerPage, setRowsPerPage] = useState(config.rows || 10);
    const [error, setError] = useState(null);
    const [form, setForm] = useState({
      open: false,
      id: null,
    });

    const Form = formComponent;

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
        sort: order,
        s: searchQuery,
        query: {
          alwaysPaginate: true,
        },
        cache: config.cache,
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
    }, [page, searchQuery, order]);

    const handleSortOrder = async data => {
      setOrder(data);
    };

    const handleSearchQuery = async query => {
      setSearchQuery(query);
      setPage(1);
    };

    const handleDelete = async id => {
      try {
        await deleteData(id);
        await getData();
      } catch (e) {}
    };

    const handleUpdate = async input => {
      try {
        await updateData(input);
        handleCloseForm()
        await getData();
      } catch (e) {}
    };

    const handleCreate = async input => {
      try {
        await createData(input);
        handleCloseForm()
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

    const handleOpenForm = id => {
      setForm({ open: true, id });
    };

    const handleCloseForm = () => {
      setForm({ open: false, id: null });
    };

    /**
     * Common variables
     */
    const { data: rows } = data;
    const shouldRenderRows = rows && rows.length > 0;
    const { columns = [], name = '' } = config;
    const tableColumnCount = columns.length + 2;

    return (
      <Paper>
        <AddFab onClick={handleOpenForm} />
        <Form
          {...form}
          name={name}
          handleCreate={handleCreate}
          handleDelete={handleDelete}
          onClose={handleCloseForm}
        />
        <TableToolbar name={name} setSearchQuery={handleSearchQuery} />
        {isLoading && <LinearProgress style={{ width: '100%' }} />}
        <TableContainer>
          <Table>
            <TableHeader
              tableColumnCount={tableColumnCount}
              order={order}
              setOrder={handleSortOrder}
              config={config}
            />
            <TableBody>
              {error && (
                <TableError tableColumnCount={tableColumnCount}>
                  {error}
                </TableError>
              )}
              {shouldRenderRows
                ? rows.map(row => {
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
                : !isLoading &&
                  fetchData && (
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
          rowsPerPageOptions={[8, 15, 25, 100, 500, 1000]}
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
