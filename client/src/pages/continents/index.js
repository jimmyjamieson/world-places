import React, { Fragment, useEffect, useState } from 'react';
import ContinentsList from '../../components/organisms/continents-list';
import ContinentsForm from '../../components/organisms/continents-form';
import { getContinents } from '../../utils/api';

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
