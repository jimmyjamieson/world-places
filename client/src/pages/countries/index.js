import React, { useEffect, useState } from 'react';
import { getCountries } from '../../utils/api';
import Container from '@material-ui/core/Container';
import AddFab from '../../components/molecules/add-fab';
import CountriesForm from '../../components/organisms/countries-form';
import CountriesList from '../../components/organisms/countries-list';

const CountriesPage = () => {
  const [continents, setContinents] = useState([]);
  const [open, setOpen] = useState(false);

  const updateCountries = () => {
    getCountries().then(res => setContinents(res.data));
  };

  useEffect(() => {
    updateCountries();
  }, []);

  return (
    <Container>
      <CountriesForm
        open={open}
        close={ () => setOpen(false)}
        onSuccess={() => updateCountries()}
      />
      <CountriesList list={continents} onDeleteSuccess={() => updateCountries()} />
      <AddFab onClick={() => setOpen(!open)} />
    </Container>
  );
};

export default CountriesPage;
