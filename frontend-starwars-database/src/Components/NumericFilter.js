import React, { useContext, useState } from 'react';
import RequisitionContext from '../Context/RequisitionContext';
import ActiveFilters from './ActiveFilters';

export default function NumericFilter() {
  const {
    filters:
    { filterByNumericValues,
      setFilterByNumericValues }
  } = useContext(RequisitionContext);
  
  const [columnOptions, setColumnOptions] = useState([
    'diameter', 'orbital_period', 'population', 'rotation_period', 'surface_water',
  ]);

  const [currentColumnValue, setCurrentColumnValue] = useState('diameter');

  const [formState, setFormState] = useState({
    column: columnOptions[0],
    comparison: 'maior que',
    value: '',
  });

  const repopulateColumnOptions = (columnName) => {
    const orderedColumns = [...columnOptions, columnName].sort()
    setColumnOptions(orderedColumns);
    console.log(orderedColumns)
    setFormState({
      ...formState,
      column: orderedColumns[0],
    });
    setCurrentColumnValue(orderedColumns[0])
  };

  const makeOptions = () => columnOptions
      .map((opt, index) => <option value={ opt } key={ index }>{opt}</option>);

  const formHandleChange = (event) => {
    const { target: { id, value: selectValue } } = event;
    setFormState({
      ...formState,
      [id]: selectValue,
    });
    setCurrentColumnValue(selectValue);
  };

  const dispatchFilter = (event) => {
    event.preventDefault();
    setFilterByNumericValues([...filterByNumericValues, formState]);
    const newColumnsSorted = columnOptions.filter((opt) => opt !== formState.column).sort();
    setColumnOptions(newColumnsSorted);
    setFormState({
      ...formState,
      column: newColumnsSorted[0],
    });
    setCurrentColumnValue(newColumnsSorted[0]);
  };

  return (
    <div>
      <ActiveFilters repopulateColumnOptions={repopulateColumnOptions} />
      <form onSubmit={ (e) => dispatchFilter(e) }>
        <select
          data-testid="column-filter"
          id="column"
          value={currentColumnValue}
          onChange={ (e) => formHandleChange(e) }
        >
        {makeOptions()}
        </select>
        <select
          data-testid="comparison-filter"
          id="comparison"
          onChange={ (e) => formHandleChange(e) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          type="number"
          placeholder="insira o valor"
          data-testid="value-filter"
          id="value"
          onChange={ (e) => formHandleChange(e) }
        />
        <button type="submit" data-testid="button-filter">Filtrar</button>
      </form>
    </div>
  );
}
