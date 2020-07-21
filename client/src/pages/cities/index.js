import React from 'react';
import Container from '@material-ui/core/Container';
import DynamicTable from '../../components/organisms/dynamic-table';
import { deleteCity, getCities } from '../../utils/api';
import CityForm from '../../components/forms/city-form';

const tableConfig = {
  name: 'Cities',
  altName: 'City',
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
      key: 'region.name',
      name: 'Region',
      value: 'region.name',
      link: 'region',
      linkId: 'region.id',
    },
    {
      key: 'region.country.name',
      name: 'Country',
      value: 'region.country.name',
      link: 'country',
      linkId: 'region.countryId',
    },
    {
      key: 'coords',
      name: 'COORDS',
      value: 'coords',
      align: 'right',
    },
  ],
};

const CitiesPage = ({ match, location }) => {
  const { params = {} } = match;
  return (
    <Container>
      <DynamicTable
        id={params?.id}
        location={location}
        config={tableConfig}
        formComponent={CityForm}
        fetchData={getCities}
        deleteData={deleteCity}
      />
    </Container>
  );
};

export default CitiesPage;
