import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BudgetSummary = () => {
    const [allocations, setAllocations] = useState([]);

    useEffect(() => {
        const fetchAllocations = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/allocations/');
                setAllocations(response.data);
            } catch (error) {
                console.error('Error fetching allocations', error);
            }
        };

        fetchAllocations();
    }, []);

    return (
        <div>
            <h2>Budget Summary</h2>
            {allocations.map((allocation) => (
                <div key={allocation.id}>
                    <h3>Income: ${allocation.biweekly_income}</h3>
                    <p>Period: {allocation.period}</p>
                    <p>Remaining Balance: ${allocation.remaining_balance}</p>
                    <h4>Categories:</h4>
                    <ul>
                        {allocation.categories.map((category) => (
                            <li key={category.id}>
                                {category.name}: ${category.allocation_type === 'percentage' ? `${category.value}%` : `${category.value}`}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default BudgetSummary;
