import React from 'react';
import Container from '@material-ui/core/Container';
import DynamicTable from '../../components/organisms/dynamic-table';
import { getRegions } from '../../utils/api';

const tableConfig = {
  name: 'Regions',
  rows: 8,
  order: 'name,ASC',
  cache: 1,
  columns: [
    {
      key: 'id',
      value: 'id',
    },
    {
      key: 'code',
      value: 'code',
    },
    {
      key: 'name',
      value: 'name'
    },
    {
      key: 'coords',
      value: 'coords',
      align: 'right',
    },
  ],
};

const RegionsPage = () => {
  return(
    <Container>
      <DynamicTable fetchData={getRegions} config={ tableConfig } />
    </Container>
  )
};

export default RegionsPage;
