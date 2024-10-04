import React, { useEffect, useState } from 'react';
import './TableStyles.css'; 

const CookiesTargeting = () => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const limit = 10; 
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/pwc/crs/targeting?page=${page}&limit=${limit}`);
                const result = await response.json();
                setData(result.data);
                setTotalPages(result.totalPages);
            } catch (error) {
                console.error('Error fetching targeting data:', error);
            }
        };

        fetchData();
    }, [page, limit]);

    return (
        <div className="table-container">
            <h2>Targeting (Cookies)</h2>
            <table className="styled-table">
                <thead>
                    <tr>
                        <th>Vendor Name</th>
                        <th>Priority Review</th>
                        <th>Third Party / First Party</th>
                        <th>High Risk Domain</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item => (
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

export default CookiesTargeting;
