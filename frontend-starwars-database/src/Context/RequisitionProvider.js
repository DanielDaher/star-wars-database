import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import RequisitionContext from './RequisitionContext';

export default function RequisitionProvider({ children }) {
  const [data, setData] = useState([]);
  const [planetName, setPlanetName] = useState('');
  const [filterOn, setFilterOn] = useState(false);
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);

  useEffect(() => {
    const planets = async () => {
      const getSWInfo = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const { results } = await getSWInfo.json();
      setData(results);
      console.log(results);
      /* setTableData(results); */
    };
    planets();
  }, []);

  const contextValue = {
    data,
    filters: {
      filterByNumericValues,
      setFilterByNumericValues,
      filterOn,
      setFilterOn,
      filterByName: {
        name: planetName,
        setPlanetName,
      },
    },
  };

  return (
    <RequisitionContext.Provider value={ contextValue }>
      {children}
    </RequisitionContext.Provider>
  );
}

RequisitionProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
