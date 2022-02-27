import React, { useContext, useEffect, useRef, useState } from 'react';
import RequisitionContext from '../Context/RequisitionContext';

export default function Table() {
  const { data, filters } = useContext(RequisitionContext);
  const [tablePlanets, setTablePlanets] = useState([]);
  const [columnNames, setColumnNames] = useState([]);
  const allPlanets = useRef();

  useEffect(() => {
    setTablePlanets(data);

    const arrayWithColumnNames = data.map(
      (planet) => Object.entries(planet).filter((keyName) => keyName[0] !== 'residents')
    );

    setColumnNames(arrayWithColumnNames[0]);
    allPlanets.current = data;
  }, [data]);

  useEffect(() => {
    const { filterByName: { name } } = filters;

    if (name !== '') {
      const filteredPlanets = allPlanets.current
      .filter((planet) => planet.name.includes(name.toLowerCase())
      );
      setTablePlanets(filteredPlanets);
    };

    if (name === '') return setTablePlanets(allPlanets.current);
  }, [filters]);

  return (
    <table>
      <thead>
        <tr>
          {tablePlanets.length > 0 &&
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
