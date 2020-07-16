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
      type: 'string',
      value: 'id',
    },
    {
      key: 'code',
      type: 'string',
      value: 'code',
    },
    {
      key: 'name',
      type: 'string',
      value: 'nativeName',
    },
    {
      key: 'cities',
      type: 'array',
      value: 'cities.length',
    },
    {
      key: 'coords',
      type: 'number',
      value: 'coords',
      align: 'right',
    },
  ],
};

const RegionsPage = () => {
  return <DynamicTable fetchData={getRegions} config={ tableConfig } />;
};

export default RegionsPage;
