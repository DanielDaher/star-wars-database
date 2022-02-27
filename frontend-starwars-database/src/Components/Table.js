import React, { useContext, useEffect, useRef, useState } from 'react';
import RequisitionContext from '../Context/RequisitionContext';

export default function Table() {
  const { data, filters, filteredExcluded } = useContext(RequisitionContext);
  const [tablePlanets, setTablePlanets] = useState([]);
  const [columnNames, setColumnNames] = useState([]);
  const currentPlanets = useRef();

  useEffect(() => {
    setTablePlanets(data);

    const arrayWithColumnNames = data.map(
      (planet) => Object.entries(planet).filter((keyName) => keyName[0] !== 'residents')
    );

    setColumnNames(arrayWithColumnNames[0]);
    currentPlanets.current = data;
  }, [data, filteredExcluded]);

  useEffect(() => {
    const { filterByName: { name }, filterByNumericValues } = filters;

    if (filterByNumericValues) {
      filterByNumericValues.forEach(({ column, comparison, value }) => {
        switch (comparison) {
          case ('maior que'):
            currentPlanets.current = currentPlanets.current
              .filter((planet) => Number(planet[column]) > Number(value));
            break;
          case ('menor que'):
            currentPlanets.current = currentPlanets.current
              .filter((planet) => Number(planet[column]) < Number(value));
            break;
          case ('igual a'):
            currentPlanets.current = currentPlanets.current
              .filter((planet) => Number(planet[column]) === Number(value));
            break;
          default:
            break;
        }
      });

      setTablePlanets(currentPlanets.current);
    }

    if (name !== '') {
      const filteredPlanets = currentPlanets.current
      .filter((planet) => planet.name.toLowerCase().includes(name.toLowerCase())
      );
      setTablePlanets(filteredPlanets);
    };

    if (name === '') return setTablePlanets(currentPlanets.current);
  }, [filters]);

  return (
    <table>
      <thead>
        <tr>
          {columnNames &&
            columnNames.map((planet, index) => <th key={ index }>{planet[0]}</th>)}
        </tr>
      </thead>
      <tbody>
        {tablePlanets.map(({
          name,
          rotation_period: rotation,
          orbital_period: orbit,
          diameter,
          climate,
          gravity,
          terrain,
          surface_water: surfaceWater,
          population,
          films,
          created,
          edited,
          url,
        }) => (
          <tr key={ name }>
            <td>{ name }</td>
            <td>{ rotation }</td>
            <td>{ orbit }</td>
            <td>{ diameter }</td>
            <td>{ climate }</td>
            <td>{ gravity }</td>
            <td>{ terrain }</td>
            <td>{ surfaceWater }</td>
            <td>{ population }</td>
            <td>{ films }</td>
            <td>{ created }</td>
            <td>{ edited }</td>
            <td>{ url }</td>
          </tr>
        ))}
      </tbody>
    </table>);
}
