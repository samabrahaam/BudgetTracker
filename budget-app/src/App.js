import './App.css';

import React from 'react';
import CategoryInput from './components/CategoryInput';
import BudgetSummary from './components/BudgetSummary';

function App() {
  return (
    <div className="App">
        <h1>Budgeting Application</h1>
        <CategoryInput />
        <BudgetSummary />
    </div>
);
}

export default App;
