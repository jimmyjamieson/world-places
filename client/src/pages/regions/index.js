import React from 'react';
import DynamicTable from '../../components/organisms/dynamic-table';
import { getRegions } from '../../utils/api';

const config = {
  rows: 10,
  order: 'name asc',
  columns: [
    {
      column: 'id',
      type: 'string',
      value: 'id',
    },
    {
      column: 'code',
      type: 'string',
      value: 'code',
    },
    {
      column: 'name',
      type: 'string',
      value: 'nativeName',
    },
    {
      column: 'cities',
      type: 'array',
      value: 'cities?.length',
    },
    {
      column: 'coords',
      type: 'number',
      value: 'coords',
      align: 'right',
    },
  ],
};

const RegionsPage = () => {
  return <DynamicTable name="Regions" fetchData={getRegions} config={ config } />;
};

export default RegionsPage;
