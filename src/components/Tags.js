import React from 'react';
import { Link } from 'react-router-dom';

const Tags = () => {
    return (
        <div>
            <h1>Tags Section</h1>
            <nav>
                <ul>
                    <li><Link to="/tags/analytics">Analytics</Link></li>
                    <li><Link to="/tags/targeting">Targeting</Link></li>
                    <li><Link to="/tags/no_prefs">No Preferences</Link></li>
                    <li><Link to="/tags/third_party">Third Party</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default Tags;
