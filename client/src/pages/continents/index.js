import React, { Fragment, useEffect, useState } from 'react';
import ContinentsList from '../../components/organisms/continents-list';
import ContinentsForm from '../../components/organisms/continents-form';
import { getContinents } from '../../utils/api';
import Toolbar from '@material-ui/core/Toolbar';

const ContinentsPage = () => {

  const [ continents, setContinents ] = useState([])
  const [ error, setError ] = useState('')

  const updateContinents = () => {
    getContinents().then(res => setContinents(res.data))
  }

  useEffect(() => {
    updateContinents()
  }, [])

  return (
    <Fragment>
      <Toolbar color="primary" variant="dense">
        blah
      </Toolbar>
      { error && error }
      <ContinentsForm
        onSuccess={ () => updateContinents() }
        onError={ () => setError('Failed to submit') }
      />
      <ContinentsList list={ continents } />
    </Fragment>
  );
};

export default ContinentsPage;
