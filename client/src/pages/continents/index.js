import React, { useEffect, useState } from 'react';
import ContinentsList from '../../components/organisms/continents-list';
import ContinentsForm from '../../components/organisms/continents-form';
import { getContinents } from '../../utils/api';
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import AddFab from '../../components/molecules/add-fab';

const ContinentsPage = () => {
  const [continents, setContinents] = useState([]);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');

  const updateContinents = () => {
    getContinents().then(res => setContinents(res.data));
  };

  useEffect(() => {
    updateContinents();
  }, []);

  return (
    <Container>
      {error && error}
      <ContinentsForm
        open={open}
        onSuccess={() => updateContinents()}
        onError={() => setError('Failed to submit')}
      />
      <ContinentsList list={continents} />
      <AddFab onClick={() => setOpen(!open)} />
    </Container>
  );
};

export default ContinentsPage;
