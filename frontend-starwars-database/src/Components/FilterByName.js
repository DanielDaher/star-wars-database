import React, { useContext } from 'react';
import RequisitionContext from '../Context/RequisitionContext';

export default function FilterByName() {
  const { filters: { filterByName: { setPlanetName } } } = useContext(RequisitionContext);

  return (
    <div className='name-filter'>
      <input
        placeholder="pesquise por nome"
        data-testid="name-filter"
        type="text"
        onChange={ (e) => setPlanetName(e.target.value) }
      />
    </div>
  );
}
