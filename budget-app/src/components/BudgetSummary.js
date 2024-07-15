import React from 'react';

const BudgetSummary = ({ budget }) => {
    return (
        <div>
            <h2>Budget Summary</h2>
            {Object.entries(budget).map(([category, amount]) => (
                <div key={category}>
                    <h3>{category}: ${amount.toFixed(2)}</h3>
                </div>
            ))}
        </div>
    );
};

export default BudgetSummary;
