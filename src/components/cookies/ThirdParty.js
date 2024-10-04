import React, { useEffect, useState } from 'react';
import './TableStyles.css';

const CookiesAnalytics = () => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const limit = 10; 
    const [totalPages, setTotalPages] = useState(0);
    const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/pwc/crs/third_party?page=${page}&limit=${limit}`);
                const result = await response.json();
                setData(result.data);
                setTotalPages(result.totalPages);
            } catch (error) {
                console.error('Error fetching analytics data:', error);
            }
        };

        fetchData();
    }, [page, limit]);

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const sortedData = React.useMemo(() => {
        if (sortConfig.key) {
            return [...data].sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return data;
    }, [data, sortConfig]);

    return (
        <div className="table-container">
            <h2>Analytics (Cookies)</h2>
            <table className="styled-table">
                <thead>
                    <tr>
                        <th onClick={() => handleSort('VendorName')}>Vendor Name</th>
                        <th onClick={() => handleSort('Review_Priority')}>Priority Review</th>
                        <th onClick={() => handleSort('first_vs_third_party')}>Third Party / First Party</th>
                        <th onClick={() => handleSort('high_risk_domain')}>High Risk Domain</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map(item => (
                        <tr key={item._id}>
                            <td>{item.VendorName}</td>
                            <td>{item.Review_Priority}</td>
                            <td>{item.first_vs_third_party}</td>
                            <td>{item.high_risk_domain === 'YES' ? 'YES' : 'NO'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                <button disabled={page <= 1} onClick={() => setPage(page - 1)}>Previous</button>
                <span>Page {page} of {totalPages}</span>
                <button disabled={page >= totalPages} onClick={() => setPage(page + 1)}>Next</button>
            </div>
        </div>
    );
};

export default CookiesAnalytics;
