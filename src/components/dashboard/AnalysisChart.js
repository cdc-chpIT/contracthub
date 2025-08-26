import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const AnalysisChart = React.memo(() => {
    const data = [
        { name: 'Kinh doanh', count: 35 },
        { name: 'Kỹ thuật', count: 45 },
        { name: 'Dự án', count: 28 },
        { name: 'Kế toán', count: 22 },
        { name: 'Nhân sự', count: 15 },
    ];
    const COLORS = ['#3B82F6', '#10B981', '#F97316', '#8D99AE', '#6366F1'];

    return (
        <div className="bg-white p-6 rounded-lg shadow h-full">
             <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg text-gray-800">Phân Tích</h3>
                <select className="text-xs border border-gray-200 rounded p-1">
                    <option>Tài liệu theo phòng ban</option>
                    <option>Giá trị hợp đồng</option>
                </select>
            </div>
             <div style={{ width: '100%', height: 250 }}>
                <ResponsiveContainer>
                    {/* Thêm isAnimationActive={false} để tắt hiệu ứng của biểu đồ */}
                    <BarChart data={data} margin={{ top: 5, right: 20, left: -15, bottom: 5 }} isAnimationActive={false}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                        <YAxis tick={{ fontSize: 11 }} />
                        <Tooltip cursor={{fill: 'rgba(243, 244, 246, 0.5)'}}/>
                        <Bar dataKey="count" barSize={30}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
});

export default AnalysisChart;