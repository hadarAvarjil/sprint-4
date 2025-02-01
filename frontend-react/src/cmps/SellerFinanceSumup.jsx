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
    CategoryScale,  // Register CategoryScale
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

    // Labels and Data with correct color order
    const data = {
        labels: ['Pending', 'In Progress', 'Completed', 'Delivered', 'Rejected'],
        datasets: [
            {
                label: 'Order Status Summary',
                data: [pendingOrdersNum, inProgressOrdersNum, completedOrdersNum, deliveredOrdersNum, rejectedOrdersNum],
                backgroundColor: [
                    '#F1C40F', // Pending (Yellow)
                    '#3498DB', // In Progress (Blue)
                    '#2ECC71', // Completed (Green)
                    '#9B59B6', // Delivered (Purple)
                    '#E74C3C', // Rejected (Red)
                ],
                borderColor: [
                    '#D4AC0D', // Darker Yellow
                    '#2980B9', // Darker Blue
                    '#27AE60', // Darker Green
                    '#8E44AD', // Darker Purple
                    '#C0392B', // Darker Red
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