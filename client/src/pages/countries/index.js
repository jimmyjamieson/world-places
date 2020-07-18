import React from 'react';
import Container from '@material-ui/core/Container';
import DynamicTable from '../../components/organisms/dynamic-table';
import { deleteCountry, getCountries } from '../../utils/api';
import CountryForm from '../../components/forms/country-form';

const tableConfig = {
  name: 'Countries',
  altName: 'Country',
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
      key: 'nativeName',
      name: 'Native',
      value: 'nativeName',
    },
    {
      key: 'coords',
      name: 'COORDS',
      value: 'coords',
      align: 'right',
    },
  ],
};

const CountriesPage = () => {
  return (
    <Container>
      <DynamicTable
        config={tableConfig}
        formComponent={CountryForm}
        fetchData={getCountries}
        deleteData={deleteCountry}
      />
    </Container>
  );
};

export default CountriesPage;
