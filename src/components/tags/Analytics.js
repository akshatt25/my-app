import React, { useEffect, useState } from 'react';
import './TableStyles.css'; // Ensure this path is correct

const AnalyticsTags = () => {
    const [tagsData, setTagsData] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [sortConfig, setSortConfig] = useState(null);

    useEffect(() => {
        const fetchTags = async () => {
            const response = await fetch(`http://localhost:8080/pwc/trs/analytics?page=${page}&limit=${limit}`);
            const data = await response.json();
            setTagsData(data.data);
            setTotalPages(data.totalPages);
        };
        
        fetchTags();
    }, [page, limit]);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const sortedData = React.useMemo(() => {
        let sortableItems = [...tagsData];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [tagsData, sortConfig]);

    return (
        <div className="table-container">
            <h2>Analytics (Tags)</h2>
            <table className="styled-table">
                <thead>
                    <tr>
                        <th onClick={() => requestSort('VendorName')}>Vendor Name</th>
                        <th onClick={() => requestSort('Review_Priority')}>Review Priority</th>
                        <th onClick={() => requestSort('FirstOrThirdParty')}>Type</th>
                        {/* Removed High Risk Domain column */}
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((tag, index) => (
                        <tr key={index}>
                            <td>{tag.VendorName =="" ? "Unknown" :tag.VendorName}</td>
                            <td>{tag.Review_Priority}</td>
                            <td>{tag.FirstOrThirdParty}</td>
                            {/* Removed High Risk Domain cell */}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
                    Previous
                </button>
                <span>Page {page} of {totalPages}</span>
                <button onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))} disabled={page === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default AnalyticsTags;
