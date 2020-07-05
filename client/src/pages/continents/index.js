import React, { useEffect, useState } from 'react';
import ContinentsList from '../../components/organisms/continents-list';
import ContinentsForm from '../../components/organisms/continents-form';
import { getContinents } from '../../utils/api';
import Container from '@material-ui/core/Container';
import AddFab from '../../components/molecules/add-fab';

const ContinentsPage = () => {
  const [continents, setContinents] = useState([]);
  const [open, setOpen] = useState(false);

  const updateContinents = () => {
    getContinents().then(res => setContinents(res.data));
  };

  useEffect(() => {
    updateContinents();
  }, []);

  return (
    <Container>
      <ContinentsForm
        open={open}
        close={ () => setOpen(false)}
        onSuccess={() => updateContinents()}
      />
      <ContinentsList list={continents} onDeleteSuccess={() => updateContinents()} />
      <AddFab onClick={() => setOpen(!open)} />
    </Container>
  );
};

export default ContinentsPage;
