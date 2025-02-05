import React from 'react';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    RadialLinearScale,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Filler,
  } from 'chart.js';
import { Doughnut, PolarArea, Line } from 'react-chartjs-2';
import { utilService } from "../services/util.service.js"

ChartJS.register( ArcElement,
    RadialLinearScale,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Filler);
 
export function SellerFinanceSumup({ loggedInUser, orders = [] }) {
    let totalOrders = orders.length;
    let pendingOrdersNum = orders.filter(order => order.orderState === 'Pending').length;
    let inProgressOrdersNum = orders.filter(order => order.orderState === 'In Progress').length;
    let completedOrdersNum = orders.filter(order => order.orderState === 'Completed').length;
    let deliveredOrdersNum = orders.filter(order => order.orderState === 'Delivered').length;
    let rejectedOrdersNum = orders.filter(order => order.orderState === 'Rejected').length;

    const data = {
        labels: ['Pending', 'In Progress', 'Completed', 'Delivered', 'Rejected'],
        datasets: [
            {
                label: 'Order Status Summary',
                data: [pendingOrdersNum, inProgressOrdersNum, completedOrdersNum, deliveredOrdersNum, rejectedOrdersNum],
                backgroundColor: [
                    '#F1C40F', 
                    '#3498DB', 
                    '#2ECC71', 
                    '#9B59B6', 
                    '#E74C3C', 
                ],
                borderColor: [
                    '#D4AC0D', 
                    '#2980B9', 
                    '#27AE60', 
                    '#8E44AD', 
                    '#C0392B', 
                ],
                borderWidth: 1,
            },
        ],
    };

    const currentMonth = new Date().getMonth();
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
  
    const monthlyEarnings = labels.map((_, index) => {
        if (index === currentMonth) {
            return orders.filter(order => order.orderState === 'Delivered')
                .reduce((sum, order) => sum + order.price, 0);
        } else if (index < currentMonth) {
            return utilService.getRandomIntInclusive(500, 5000);
        } else {
            return 0
        }
    })

    const earningsData = {
        labels,
        datasets: [
            {
                label: 'Monthly Earnings',
                data: monthlyEarnings,
                borderColor: 'rgb(144, 51, 215)',
                backgroundColor: 'rgba(148, 22, 221, 0.5)',
                fill: true,
            },
        ],
    };


    return (
        <section className="my-chart">
            <h4>Orders Information</h4>
            {totalOrders > 0 ? (
                <>
                    <Doughnut data={data} />
                    <Line data={earningsData} options={{ scales: { x: { type: 'category' }, y: { beginAtZero: true } } }} />
                </>
            ) : (
                <p>No orders available</p>
            )}
        </section>
    )
}