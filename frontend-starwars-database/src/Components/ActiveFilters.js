import { useContext } from "react";
import RequisitionContext from '../Context/RequisitionContext';

export default function ActiveFilters({ repopulateColumnOptions }) {
  const { filteredExcluded,
    setFilteredExcluded, 
    filters: { filterByNumericValues, setFilterByNumericValues }
  } = useContext(RequisitionContext);

  const removeFilter = (column, index) => {
    repopulateColumnOptions(column);
    setFilterByNumericValues(filterByNumericValues
      .filter((_each, eachIndex) => eachIndex !== index)
    );
    setFilteredExcluded(!filteredExcluded);
  };

  return (
  <div className="active-filters-div">
    {filterByNumericValues.map(({ column, comparison, value }, index) => (
      <div key={index} className="filters"/* style={{ display: 'flex' }} */>
        <h3>{column} {comparison} {value} </h3>
        <button onClick={() => removeFilter(column, index)}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
            X
        </button>
      </div>
    ))}
  </div>
  );
}
