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
  <div>
    {filterByNumericValues.map(({ column, comparison, value }, index) => (
      <div key={index} style={{ display: 'flex' }}>
        <h3>{column} {comparison} {value} </h3>
        <button onClick={() => removeFilter(column, index)}>
            X
        </button>
      </div>
    ))}
  </div>
  );
}
