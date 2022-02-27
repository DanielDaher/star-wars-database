import React from 'react';
import './App.css';
import Table from './Components/Table';
import RequisitionProvider from './Context/RequisitionProvider';

function App() {
  return (
    <RequisitionProvider>
      <div>
        <Table />
      </div>
    </RequisitionProvider>
  );
}

export default App;
