
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from "../../context/AuthContext";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import "../Auth/auth-style.css"
function ProfileForm() {

    const { token, loading, user } = useContext(AuthContext);

    const [userData, setUserData] = useState(user)
    const [isEditing, setisEditing] = useState(false);
    const [saveBtnActive, setsaveBtnActive] = useState(false);

    const handleChange = (e) => {

        const { name, value } = e.target;
        setUserData(prevData => {
            const updatedData = { ...prevData, [name]: value };
            setsaveBtnActive(JSON.stringify(updatedData) !== JSON.stringify(userData));
            return updatedData;
        });

    }

    const handleEdit = (e) => {
        e.preventDefault();
        setisEditing(true);
    }

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put("http://localhost:5000/api/v1/update-user-details", userData, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response) {
                setisEditing(false);
                setsaveBtnActive(false);
                toast.success("Profile updated successfully! ");
            }
        } catch (error) {
            toast.error("Failed to Update Details!!!");
        }
    }






    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div className="container">

            <div className="main-div row align-items-center">

                {/* <div> */}

                <form className="form justify-content-center d-flex flex-column flex-wrap p-4 border-1" onSubmit={handleSave} >
                    <h2 >Your Profile</h2>
                    <hr />
                    <span className='text-bg-danger'>
                        {/* {error && <p>{error}</p>} */}
                        <ToastContainer />
                    </span>
                    <div className="mb-3">
                        <label for="email" className="form-label">Email address</label>
                        <input
                            type="email"
                            className="form-control" id="email" placeholder="name@example.com"
                            value={userData.username}
                            disabled="true"
                            onChange={handleChange}
                            name='username'
                        />
                        <span className="mx-2 px-2 text-danger text-sm"> You cant change username!!! </span>
                    </div>
                    <div className="mb-3">
                        <label for="email" className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control" id="name" placeholder="Your Name"
                            value={userData.name}
                            disabled={!isEditing}
                            onChange={handleChange}
                            name='name'
                        />
                    </div>

                    <div>


                    </div>


                    <div >
                        {!isEditing ? (
                            <button

                                onClick={handleEdit}
                                className="btn btn-primary py-2 "
                            >
                                Edit
                            </button>
                        ) : (
                            <>
                                <button

                                    onClick={handleSave}
                                    disabled={!saveBtnActive}
                                    className={`btn btn-success mr-2 py-2 rounded ${saveBtnActive ? 'bg-success ' : 'bg-muted'}`}
                                >
                                    Save
                                </button>
                                <button

                                    onClick={() => setisEditing(false)}
                                    className='btn btn-danger mx-2 py-2'
                                >
                                    Cancel
                                </button>
                            </>
                        )}
                    </div>

                </form>





            </div>

        </div>
    );
}

export default ProfileForm