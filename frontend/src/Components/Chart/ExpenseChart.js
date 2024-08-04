import React, { useContext, useEffect, useState } from 'react'
import { Chart } from 'react-google-charts';
import axios from 'axios';
import { AuthContext } from "../../context/AuthContext";

function ExpenseChart() {
    const { token, loading } = useContext(AuthContext)


    const [expenses, setExpenses] = useState("");
   
    


    // console.log("chart " + token)
    useEffect(() => {

        const fetchExpenses = async () => {
            try {
                // console.log("chart " + loading)
                const response = await axios.get("http://localhost:5000/api/v1/get-expenses", {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                const data = [['category', 'amount','date'], ...response.data.map(expense => [expense.category, expense.amount,expense.date])]
                // const data = response.data; 
                // setExpenses(['category', 'amount'],[data.category,data.amount]);
                setExpenses(data);
                
                console.log(data);
            } catch (error) {

                console.log(error);
            }
        };
        // console.log("chart " + expenses)

        fetchExpenses();
    }, [])



    if (loading) {
        return <h2>Loading...</h2>;
    }

    return (
        <div className="container">
            
                <div className="row mx-3 my-3">

                    <div className="col-md-4">
                        <Chart
                            // width={'600px'}
                            // height={'400px'}
                            chartType="PieChart"
                            loader={<div>Loading Chart...</div>}
                            data={expenses}
                            options={{
                                title: 'Expenses by Category',
                                is3D: true,
                            }}


                        />
                    </div>
                   


                </div>

            </div>
            )
}

            export default ExpenseChart