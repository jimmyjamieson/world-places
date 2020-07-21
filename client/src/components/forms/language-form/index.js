import React, { memo } from 'react';
import { createLanguage, getLanuage, updateLanguage } from '../../../utils/api';
import DyanmicForm from '../../organisms/dynamic-form';

const config = {
  name: 'Language',
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      helperText: 'The plain text name of the language',
      validation: null,
    },
    {
      name: 'nativeName',
      label: 'Native name',
      type: 'text',
      helperText: 'The native name including special characters',
      validation: null,
    },
    {
      name: 'code',
      label: 'Code',
      type: 'text',
      helperText: 'ISO 639-1 code',
      validation: null,
    },
    {
      name: 'code_iso_3',
      label: 'ISO3 Code',
      type: 'text',
      helperText: 'ISO 639-2 code',
      validation: null,
    },
  ],
};

const LanguageForm = memo(({ open, close, id, onSuccess }) => {
  return (
    <DyanmicForm
      id={id}
      fetchDataItem={getLanuage}
      createDataItem={createLanguage}
      updateDataItem={updateLanguage}
      onSuccess={onSuccess}
      open={open}
      close={close}
      config={config}
    />
  );
});

export default LanguageForm;
