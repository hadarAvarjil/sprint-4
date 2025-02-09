import React, { useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import {
    PieChart,
    Pie,
    Sector,
    ResponsiveContainer,
    Tooltip as RechartsTooltip,
} from 'recharts';
import { utilService } from "../services/util.service.js";

// Register the required Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export function SellerFinanceSumup({ loggedInUser, orders = [] }) {
    const [activeIndex, setActiveIndex] = useState(0);

    const totalOrders = orders.length;
    const pendingOrdersNum = orders.filter(order => order.orderState === 'Pending').length;
    const inProgressOrdersNum = orders.filter(order => order.orderState === 'In Progress').length;
    const completedOrdersNum = orders.filter(order => order.orderState === 'Completed').length;
    const deliveredOrdersNum = orders.filter(order => order.orderState === 'Delivered').length;
    const rejectedOrdersNum = orders.filter(order => order.orderState === 'Rejected').length;

    const pieData = [
        { name: 'Pending', value: pendingOrdersNum, fill: '#1dbf73' },
        { name: 'In Progress', value: inProgressOrdersNum, fill: '#1dbf73' },
        { name: 'Completed', value: completedOrdersNum, fill: '#1dbf73' },
        { name: 'Delivered', value: deliveredOrdersNum, fill: '#1dbf73' },
        { name: 'Rejected', value: rejectedOrdersNum, fill: '#1dbf73' },
    ];

    const currentMonth = new Date().getMonth();
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const monthlyEarnings = labels.map((_, index) => {
        if (index === currentMonth) {
            return orders.filter(order => order.orderState === 'Delivered')
                .reduce((sum, order) => sum + order.price, 0);
        } else if (index < currentMonth) {
            return 5000
        } else {
            return 0;
        }
    });

    const earningsData = {
        labels,
        datasets: [
            {
                label: 'Monthly Earnings',
                data: monthlyEarnings,
                borderColor: '#1dbf73',
                backgroundColor: 'rgba(29, 191, 115, 0.5)',
                fill: true,
            },
        ],
    };

    const renderActiveShape = (props) => {
        const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, value, percent } = props;
        const RADIAN = Math.PI / 180;
        const sin = Math.sin(-RADIAN * midAngle);
        const cos = Math.cos(-RADIAN * midAngle);
        const sx = cx + (outerRadius + 10) * cos;
        const sy = cy + (outerRadius + 10) * sin;
        const mx = cx + (outerRadius + 30) * cos;
        const my = cy + (outerRadius + 30) * sin;
        const ex = mx + (cos >= 0 ? 1 : -1) * 22;
        const ey = my;
        const textAnchor = cos >= 0 ? 'start' : 'end';

        return (
            <g>
                <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
                    {payload.name}
                </text>
                <Sector
                    cx={cx}
                    cy={cy}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fill={fill}
                />
                <Sector
                    cx={cx}
                    cy={cy}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    innerRadius={outerRadius + 6}
                    outerRadius={outerRadius + 10}
                    fill={fill}
                />
                <text x={ex} y={ey} textAnchor={textAnchor} fill="#333">{`Count: ${value}`}</text>
                <text x={ex} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                    {`${(percent * 100).toFixed(2)}%`}
                </text>
            </g>
        );
    };

    return (
        <section>
            <div style={{ width: '100%'}}>

                {/* Pie Chart Container */}
                <div className="my-chart">
                    <h5 className='orders-information'>Order Status Distribution</h5>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                activeIndex={activeIndex}
                                activeShape={renderActiveShape}
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                dataKey="value"
                                onMouseEnter={(_, index) => setActiveIndex(index)}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Line Chart Container */}
                <div className="my-chart">
                    <h5 className='orders-information'>Monthly Earnings</h5>
                    <Line
                        data={earningsData}
                        options={{
                            responsive: true,
                            scales: {
                                x: {
                                    grid: { display: false }, // Removes vertical grid lines
                                    title: { display: true, text: 'Month' },
                                    ticks: { display: true }, // Keeps x-axis ticks visible
                                    border: { display: false }, // Removes the x-axis line
                                },
                                y: {
                                    grid: { display: false }, // Removes horizontal grid lines
                                    beginAtZero: true,
                                    title: { display: true, text: 'Earnings' },
                                    ticks: { display: true }, // Keeps y-axis ticks visible
                                    border: { display: false }, // Removes the y-axis line
                                },
                            },
                            plugins: {
                                legend: { display: true, position: 'top' },
                            },
                        }}
                    />
                </div>

            </div>
        </section>
    );
}