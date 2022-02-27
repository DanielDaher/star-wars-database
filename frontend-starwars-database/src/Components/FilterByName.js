import React, { useContext } from 'react';
import RequisitionContext from '../Context/RequisitionContext';

export default function FilterByName() {
  const { filters: { filterByName: { setPlanetName } } } = useContext(RequisitionContext);

  return (
    <input
      placeholder="pesquise por nome"
      data-testid="name-filter"
      type="text"
      onChange={ (e) => setPlanetName(e.target.value) }
    />
  );
}
