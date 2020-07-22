import React from 'react';
import Container from '@material-ui/core/Container';
import DynamicTable from '../../components/organisms/dynamic-table';
import { deleteRegion, getRegions } from '../../utils/api';
import RegionForm from '../../components/forms/region-form';

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
      key: 'country.name',
      name: 'COUNTRY',
      value: 'country.name',
      link: 'country',
      linkId: 'country.id',
    },
    {
      key: 'cities.length',
      name: 'Cities',
      value: 'cities.length',
      align: 'right',
    },
    {
      key: 'coords',
      name: 'COORDS',
      value: 'coords',
      align: 'right',
    },
  ],
};

const RegionsPage = ({ match, location }) => {
  const { params = {} } = match;
  return (
    <Container>
      <DynamicTable
        id={params?.id}
        location={location}
        config={tableConfig}
        formComponent={RegionForm}
        fetchData={getRegions}
        deleteData={deleteRegion}
      />
    </Container>
  );
};

export default RegionsPage;
