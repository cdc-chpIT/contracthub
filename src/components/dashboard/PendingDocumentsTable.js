import React from 'react';

const PendingDocumentsTable = () => {
    const documents = [
        { name: 'Application for leave', class: 'Proposal', dueDate: '12-Jan-2018', owner: 'Olumide Mich...' },
        { name: 'Application for leave', class: 'Proposal', dueDate: '12-Jan-2018', owner: 'Olumide Mich...' },
        { name: 'Application for leave', class: 'Proposal', dueDate: '12-Jan-2018', owner: 'Olumide Mich...' },
        { name: 'Application for leave', class: 'Proposal', dueDate: '12-Jan-2018', owner: 'Olumide Mich...' },
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">Pending Documents</h3>
                <a href="#" className="text-blue-600 text-sm">View All</a>
            </div>
            <table className="w-full text-left">
                <thead>
                    <tr className="text-gray-500 text-sm">
                        <th className="py-2">File name</th>
                        <th className="py-2">Class</th>
                        <th className="py-2">Due Date</th>
                        <th className="py-2">Owner</th>
                        <th className="py-2"></th>
                    </tr>
                </thead>
                <tbody>
                    {documents.map((doc, index) => (
                        <tr key={index} className="border-b">
                            <td className="py-3">{doc.name}</td>
                            <td className="py-3">{doc.class}</td>
                            <td className="py-3">{doc.dueDate}</td>
                            <td className="py-3 flex items-center">
                                <span className="ml-2">{doc.owner}</span>
                            </td>
                            <td className="py-3">
                                <a href="#" className="text-blue-600 font-semibold">Review</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PendingDocumentsTable;