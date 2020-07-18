import React from 'react';
import Container from '@material-ui/core/Container';
import DynamicTable from '../../components/organisms/dynamic-table';
import { createRegion, deleteRegion, getRegion, getRegions, updateRegion } from '../../utils/api';
import RegionForm from '../../components/organisms/region-form';

const tableConfig = {
  name: 'Regions',
  altName: 'Region',
  rows: 8,
  order: 'name,ASC',
  cache: 1,
  columns: [
    {
      key: 'code',
      name: 'CODE',
      value: 'code',
    },
    {
      key: 'name',
      name: 'NAME',
      value: 'name',
    },
    {
      key: 'countryCode',
      name: 'COUNTRY CODE',
      value: 'countryCode',
    },
    {
      key: 'coords',
      name: 'COORDS',
      value: 'coords',
      align: 'right',
    },
  ],
};

const RegionsPage = () => {
  return (
    <Container>
      <DynamicTable
        config={tableConfig}
        formComponent={RegionForm}
        fetchData={getRegions}
        fetchDataItem={getRegion}
        createData={createRegion}
        updateData={updateRegion}
        deleteData={deleteRegion}
      />
    </Container>
  );
};

export default RegionsPage;
