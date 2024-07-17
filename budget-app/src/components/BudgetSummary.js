import React from 'react';
//import './BudgetSummary.css'; // Import your CSS file

const BudgetSummary = ({ budget }) => {
    return (
        <div className="budget-summary">
            <h2>Budget Summary</h2>
            <ul className="categories-list">
                {Object.entries(budget).map(([category, amount]) => (
                    <li key={category} className="category-item">
                        <h3>{category}: ${amount.toFixed(2)}</h3>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BudgetSummary;
