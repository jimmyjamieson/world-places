import React from 'react';
import Container from '@material-ui/core/Container';
import DynamicTable from '../../components/organisms/dynamic-table';
import { deleteCurrency, deleteLanguage, getCurrencies, getLanguages } from '../../utils/api';
import LanguageForm from '../../components/forms/language-form';
import CurrencyForm from '../../components/forms/currency-form';

const tableConfig = {
  name: 'Languages',
  altName: 'Language',
  rows: 8,
  order: 'name,ASC',
  cache: 1,
  columns: [
    {
      key: 'symbol',
      name: 'SYMBOL',
      value: 'symbol',
    },
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
      name: 'NATIVE',
      value: 'nativeName',
    },
    {
      key: 'number',
      name: 'Number',
      value: 'number',
    },
    {
      key: 'decimals',
      name: 'Decimals',
      value: 'decimals',
    }
  ],
};

const CurrenciesPage = () => {
  return (
    <Container>
      <DynamicTable
        config={tableConfig}
        formComponent={CurrencyForm}
        fetchData={getCurrencies}
        deleteData={deleteCurrency}
      />
    </Container>
  );
};

export default CurrenciesPage;
