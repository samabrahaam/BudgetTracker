import React, { useState } from 'react';
import axios from 'axios';

const CategoryInput = () => {
    const [name, setName] = useState('');
    const [type, setType] = useState('percentage');
    const [value, setValue] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newCategory = { name, allocation_type: type, value: parseFloat(value) };
        try {
            const response = await axios.post('http://localhost:8000/api/categories/', newCategory);
            alert('Category added successfully');
            console.log(response.data);
        } catch (error) {
            console.error('Error adding category', error.response);
            alert(`Error adding category: ${error.response?.data?.detail || error.message}`);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Category Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
                <label>Type:</label>
                <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="percentage">Percentage</option>
                    <option value="fixed">Fixed</option>
                </select>
            </div>
            <div>
                <label>Value:</label>
                <input type="number" value={value} onChange={(e) => setValue(e.target.value)} />
            </div>
            <button type="submit">Add Category</button>
        </form>
    );
};

export default CategoryInput;
