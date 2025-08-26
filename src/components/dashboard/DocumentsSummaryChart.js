import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

// Bọc component trong React.memo để tối ưu
const DocumentsSummaryChart = React.memo(() => {
    const data = [
        { name: 'Soạn thảo', value: 8 },
        { name: 'Chờ phê duyệt', value: 5 },
        { name: 'Chờ ký', value: 3 },
        { name: 'Đang triển khai', value: 15 },
        { name: 'Nghiệm thu', value: 7 },
        { name: 'Thanh toán', value: 4 },
        { name: 'Hoàn thành', value: 20 },
        { name: 'Đã thanh lý', value: 50 },
        { name: 'Tạm dừng', value: 2 },
        { name: 'Hủy', value: 1 },
    ];

    const COLORS = [
        '#A855F7', '#F97316', '#F59E0B', '#10B981', '#3B82F6',
        '#14B8A6', '#6366F1', '#84CC16', '#8D99AE', '#EF4444',
    ];

    const renderLegend = (props) => {
        const { payload } = props;
        return (
            <ul className="grid grid-cols-2 gap-x-4 mt-4 text-xs text-gray-600">
                {payload.map((entry, index) => (
                    <li key={`item-${index}`} className="flex items-center mb-1 truncate">
                        <span className="w-3 h-3 mr-2" style={{ backgroundColor: entry.color }} />
                        <span>{entry.value} ({entry.payload.value})</span>
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div>
            <h3 className="font-bold text-lg mb-2">Documents Summary</h3>
            <div style={{ width: '100%', height: 250 }}>
                <ResponsiveContainer>
                    {/* Thêm isAnimationActive={false} để tắt hiệu ứng của biểu đồ */}
                    <PieChart isAnimationActive={false}>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={85}
                            fill="#8884d8"
                            paddingAngle={2}
                            dataKey="value"
                            stroke="none"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="text-2xl font-bold">
                            {data.reduce((total, item) => total + item.value, 0)}
                        </text>
                         <text x="50%" y="50%" dy={20} textAnchor="middle" className="text-sm text-gray-500">
                            Total
                        </text>
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <Legend content={renderLegend} />
        </div>
    );
});

export default DocumentsSummaryChart;