import React, { useContext, useEffect, useState } from 'react'
import { Chart } from 'react-google-charts';
import axios from 'axios';
import { AuthContext } from "../../context/AuthContext";
import config from '../../assets/config'

function ExpenseChart() {
    const { token, loading } = useContext(AuthContext)


    const [categoryData, setCategoryData] = useState(null);
    const [timeData, setTimeData] = useState(0);

console.log(`${config.BASE_URL}`)


    // console.log("chart " + token)
    useEffect(() => {

        const fetchExpenses = async () => {
            try {
                // console.log("chart " + loading)
                const response = await axios.get(`${config.BASE_URL}api/v1/get-expenses`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
               

                const rawData = response.data;
                
                const categoryMap = new Map();


                rawData.forEach(expense => {
                    if (categoryMap.has(expense.category)) {
                        categoryMap.set(expense.category, categoryMap.get(expense.category) + expense.amount);
                    } else {
                        categoryMap.set(expense.category, expense.amount);
                    }
                });

                const categoryChartData = [['Category', 'Amount']];
                categoryMap.forEach((amount, category) => {
                    categoryChartData.push([category, amount]);
                });
                setCategoryData(categoryChartData);

                const timeMap = new Map();

                const timeChartData = [['Time', 'Amount']];
                rawData.forEach(expense => {
                    const date = new Date(expense.date);
                    const formattedDate = date.toLocaleDateString('en-GB', {
                        year: 'numeric',
                        month: 'short',
                    });

                    if (timeMap.has(formattedDate)) {
                        timeMap.set(formattedDate, timeMap.get(formattedDate) + expense.amount);
                    } else {
                        timeMap.set(formattedDate, expense.amount);
                    }
                    // timeChartData.push([formattedDate, expense.amount]);
                });
                timeMap.forEach((amount, date) => {
                    timeChartData.push([date, amount]);
                });
                setTimeData(timeChartData);


                console.log(rawData);
            } catch (error) {

                console.log(error);
            }
        };
        // console.log("chart " + expenses)

        fetchExpenses();
    }, [token])



    if (loading) {
        return <h2>Loading...</h2>;
    }

    return (
        <div className="container">

            <div className="row mx-3 my-3">

                <div className="row">
                    <div className='col-md-6'>

                        <Chart
                            chartType="PieChart"
                            loader={<div>Loading Chart...</div>}
                            data={categoryData}
                            options={{
                                title: 'Expenses by Category',
                                is3D: true,
                            }}
                        />
                    </div>
                    <div className='col-md-6'>


                        <Chart
                            chartType="ColumnChart"
                            loader={<div>Loading Chart...</div>}
                            data={timeData}
                            options={{
                                title: 'Expenses by Time',
                                vAxis: {

                                    title: 'Amount',
                                },
                                hAxis: {
                                    title: 'Time',
                                },
                                is3D: true,
                            }}
                        />
                    </div>

                </div>



            </div>

        </div>
    )
}

export default ExpenseChart