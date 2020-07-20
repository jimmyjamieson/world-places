import React, { Fragment, useState, useEffect } from 'react';
import { checkDataExists } from '../../../utils/api';
import ImportButton from '../import-button';
import ExportButton from '../export-button';

const ImportExportButtons = ({ className }) => {
  const [dataExists, setDataExists] = useState(false);
  useEffect(() => {
    checkDataExists().then(res => setDataExists(res));
  }, []);

  return (
    <Fragment>
      <ImportButton className={className} dataExists={dataExists} />
      <ExportButton className={className} dataExists={dataExists} />
    </Fragment>
  );
};

export default ImportExportButtons;
