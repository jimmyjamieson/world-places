import React from 'react';
import Container from '@material-ui/core/Container';
import DynamicTable from '../../components/organisms/dynamic-table';
import { deleteLanguage, getLanguages } from '../../utils/api';
import LanguageForm from '../../components/forms/language-form';

const tableConfig = {
  name: 'Languages',
  altName: 'Language',
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
      key: 'code_iso_3',
      name: 'ISO3 Code',
      value: 'code_iso_3'
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
    }
  ],
};

const LanguagesPage = () => {
  return (
    <Container>
      <DynamicTable
        config={tableConfig}
        formComponent={LanguageForm}
        fetchData={getLanguages}
        deleteData={deleteLanguage}
      />
    </Container>
  );
};

export default LanguagesPage;
