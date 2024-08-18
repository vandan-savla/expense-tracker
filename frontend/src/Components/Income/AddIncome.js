import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from "../../context/AuthContext"; // Import your AuthContext
import config from '../../assets/config'

function AddIncome() {
    const { token } = useContext(AuthContext); // Access the token from context
    const [formData, setFormData] = useState({
        title: '',
        amount: '',
        date: '',
        category: '',
        description: ''
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${config.BASE_URL}api/v1/add-income`, formData, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setSuccess("Income added successfully!");
            setFormData({
                title: '',
                amount: '',
                date: '',
                category: '',
                description: ''
            });
        } catch (error) {
            setError("Failed to add expense. Please try again.");
        }
    };

    return (
        <div className="container my-2">
            <h2>Add Income</h2>
            <hr />
            {error && <div className="alert alert-danger">{error}
                <button type="button" className="mx-4 btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>}
            {success && <div className="alert alert-success">{success}
                <button type="button" className="mx-4 btn-close" data-bs-dismiss="alert" aria-label="Close"></button>

            </div>}
            <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                    <label for="title" className="col-sm-2 col-form-label">Title</label>
                    <div className="col-sm-10">
                        <input

                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="row mb-3">
                    <label htmlFor="amount" className="col-sm-2 col-form-label">Amount</label>
                    <div className="col-sm-10">

                        <input
                            type="number"
                            id="amount"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="date" className="col-sm-2 col-form-label">Date</label>
                    <div className="col-sm-10">

                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="category" className="col-sm-2 col-form-label">Category</label>
                    <div className="col-sm-10">

                        <input
                            type="text"
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="description" className="col-sm-2 col-form-label">Description</label>
                    <div className="col-sm-10">

                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            cols={23}
                            rows={5}
                        />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Add Income</button>
            </form>
        </div>
    );
}

export default AddIncome;
