import React from 'react';
import './styles/App.css';
import FilterByName from './Components/FilterByName';
import NumericFilter from './Components/NumericFilter';
import Table from './Components/Table';
import RequisitionProvider from './Context/RequisitionProvider';
import LoadingOrErrorAPI from './Components/LoadingOrErrorAPI';

function App() {
  return (
    <RequisitionProvider>
      <div className='App'>
        <FilterByName />
        <NumericFilter />
        <LoadingOrErrorAPI />
        <div className='tableDiv'>
          <Table />
        </div>
      </div>
    </RequisitionProvider>
  );
}

export default App;
