import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const DocumentsSummaryChart = () => {
    // Dữ liệu này sẽ được lấy từ Redux store
    const data = [
        { name: 'Approved', value: 32 },
        { name: 'Rejected', value: 15 },
        { name: 'Pending', value: 12 },
    ];
    const COLORS = ['#4CAF50', '#F44336', '#FFC107']; // Xanh, Đỏ, Vàng

    return (
        <div>
            <h3 className="font-bold text-lg mb-4">Documents Summary</h3>
            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default DocumentsSummaryChart;