import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import './IncomeInput.css'; // Import your CSS file

const IncomeInput = ({ onBudgetCalculated }) => {
    const [biweeklyIncome, setBiweeklyIncome] = useState('');
    const [period, setPeriod] = useState('monthly');

    useEffect(() => {
        const clearCategoriesOnMount = async () => {
            try {
                await axios.delete('http://localhost:8000/api/clear-categories/');
            } catch (error) {
                console.error('Error clearing categories on mount', error.response);
            }
        };

        clearCategoriesOnMount();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/calculate-budget/', {
                biweekly_income: parseFloat(biweeklyIncome),
                period: period,
            });
            onBudgetCalculated(response.data);
        } catch (error) {
            console.error('Error calculating budget', error);
        }
    };

    return (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Biweekly Income:</label>
                    <input type="number" value={biweeklyIncome} onChange={(e) => setBiweeklyIncome(e.target.value)} />
                </div>
                <div>
                    <label>Period:</label>
                    <select value={period} onChange={(e) => setPeriod(e.target.value)}>
                        <option value="monthly">Monthly</option>
                        <option value="annual">Annual</option>
                    </select>
                </div>
                <button type="submit">Calculate Budget</button>
            </form>
        </div>
    );
};

export default IncomeInput;
