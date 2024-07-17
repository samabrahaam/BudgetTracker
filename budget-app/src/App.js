import './App.css';

import React, { useState } from 'react';
import CategoryInput from './components/CategoryInput';
import BudgetSummary from './components/BudgetSummary';
import IncomeInput from './components/IncomeInput';
import ClearCategories from './components/ClearCategories';

function App() {
  const [categoriesCleared, setCategoriesCleared] = useState(false);
  const [budget, setBudget] = useState(null);

  const handleCategoriesCleared = () => {
      setCategoriesCleared(true);
      setBudget(null); // Reset budget when categories are cleared
      setTimeout(() => setCategoriesCleared(false), 1000); // reset after a short delay
  };

  const handleBudgetCalculation = (calculatedBudget) => {
      setBudget(calculatedBudget);
  };

  return (
      <div className="App">
          <div className="container">
              <h1 className="header">Budgeting Application</h1>
              <IncomeInput onBudgetCalculated={handleBudgetCalculation} />
              <CategoryInput />
              <ClearCategories onClear={handleCategoriesCleared} />
              {!categoriesCleared && budget && (
                  <div className="categories">
                      <BudgetSummary budget={budget} />
                  </div>
              )}
          </div>
      </div>
  );
}

export default App;
