import React from 'react';
import { Link } from 'react-router-dom';

const Cookies = () => {
    return (
        <div>
            <h1>Cookies Section</h1>
            <nav>
                <ul>
                    <li><Link to="/cookies/analytics">Analytics</Link></li>
                    <li><Link to="/cookies/targeting">Targeting</Link></li>
                    <li><Link to="/cookies/no_prefs">No Preferences</Link></li>
                    <li><Link to="/cookies/third_party">Third Party</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default Cookies;
