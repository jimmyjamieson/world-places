import React from 'react';
import DynamicTable from '../../components/organisms/dynamic-table';
import { getRegions } from '../../utils/api';

const tableConfig = {
  name: 'Regions',
  rows: 8,
  order: 'name asc',
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
      value: 'nativeName',
    },
    {
      key: 'country',
      value: 'country.name',
    },
    {
      key: 'cities',
      value: 'cities.length',
    },
    {
      key: 'coords',
      value: 'coords',
      align: 'right',
    },
  ],
};

const RegionsPage = () => {
  return <DynamicTable fetchData={getRegions} config={ tableConfig } />;
};

export default RegionsPage;
