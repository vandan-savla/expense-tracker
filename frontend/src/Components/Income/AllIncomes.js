import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from "../../context/AuthContext";
import DataTable from 'react-data-table-component';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from '../../assets/config'

const IncomesPage = () => {
  const { token,loading } = useContext(AuthContext);
  const [Incomes, setIncomes] = useState([]);
  const [error, setError] = useState(null);
  const [selectedIncome, setSelectedIncome] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    date: '',
    category: '',
    description: ''
  });

  useEffect(() => {
    const fetchIncomes = async () => {
      try {
        const response = await axios.get(`${config.BASE_URL}api/v1/get-Incomes`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setIncomes(response.data);
      } catch (error) {
        setError("Failed to fetch Incomes.");
      }
    };

    fetchIncomes();
  }, [token]);

  const handleUpdateClick = (Income) => {
    setFormData(Income);
    setSelectedIncome(Income._id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this Income?")) {
      try {
        await axios.delete(`${config.BASE_URL}api/v1/delete-income/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setIncomes(Incomes.filter(Income => Income._id !== id));
        toast.success("Income deleted successfully!");
      } catch (error) {
        toast.error("Failed to delete Income.");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${config.BASE_URL}api/v1/update-income/${selectedIncome}`, formData, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setIncomes(Incomes.map(Income => Income._id === selectedIncome ? { ...Income, ...formData } : Income));
      toast.success("Income updated successfully!");
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Failed to update Income.");
    }
  };

  const columns = [
    { name: 'Title', selector: row => row.title, sortable: true },
    { name: 'Amount', selector: row => row.amount, sortable: true },
    { name: 'Date', selector: row => new Intl.DateTimeFormat('en-GB').format(new Date(row.date)), sortable: true },
    { name: 'Category', selector: row => row.category },
    { name: 'Description', selector: row => row.description },
    {
      name: 'Actions',
      cell: row => (
        <div className="flex space-x-2">
          <button onClick={() => handleUpdateClick(row)} className="btn-sm btn-primary mx-2 ">Update</button>
          <button onClick={() => handleDelete(row._id)} className="btn-sm btn-danger  ">Delete</button>
        </div>
      ),
    }
  ];

  if(loading){
    return (<> Loading...</>)
  }
  // return ({loading} && <> Loading...</>)
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">All Incomes</h2>
      {error && <div className="bg-danger text-white p-2 mb-4">{error}</div>}
      <DataTable
        columns={columns}
        data={Incomes}
        pagination
        highlightOnHover
        subHeader
        subHeaderComponent={<input type="text" placeholder="Search..." className="p-2 border border-gray rounded" />}
      />

      
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center ">
          <div className="p-6 rounded w-full max-w-lg position-relative">
            {/* <div> */}

            <button
              onClick={() => setIsModalOpen(false)}
              className="btn-close position-absolute end-50 top-0 "
            >
            </button>

            {/* </div> */}

            <h3 className="text-lg font-semibold mb-4">Update Income</h3>
            <form onSubmit={handleSubmit}>
              <div className="row mb-3">
                <label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
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
              <div className="row mb-4">
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
              <div className="row mb-4">
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
              <div className="row mb-4">
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
              <div className="row mb-4">
                <label htmlFor="description" className="col-sm-2 col-form-label">Description</label>
                <div className="col-sm-10">
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                   
                  />
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-primary"
              >
                Update Income
              </button>
            </form>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default IncomesPage;
