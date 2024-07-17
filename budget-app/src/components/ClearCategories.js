import React from 'react';
import axios from 'axios';

const ClearCategories = ({ onClear }) => {
    const handleClear = async () => {
        try {
            await axios.delete('http://localhost:8000/api/clear-categories/');
            alert('All categories cleared');
            if (onClear) onClear();
        } catch (error) {
            console.error('Error clearing categories', error.response);
            alert(`Error clearing categories: ${error.response?.data?.detail || error.message}`);
        }
    };

    return (
        <button onClick={handleClear}>Clear All Categories</button>
    );
};

export default ClearCategories;
