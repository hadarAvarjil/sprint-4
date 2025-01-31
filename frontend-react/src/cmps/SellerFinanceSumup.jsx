import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, RadialLinearScale } from 'chart.js';
import { Doughnut, PolarArea } from 'react-chartjs-2';

ChartJS.register(ArcElement, RadialLinearScale, Tooltip, Legend);

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

    return (
        <section className="my-chart">
            {totalOrders > 0 ? (
                <>
                    <Doughnut data={data} />
                </>
            ) : (
                <p>No orders available</p>
            )}
        </section>
    )
}