import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import All from './components/All';
import Cookies from './components/Cookies'; // Main Cookies component
import Tags from './components/Tags'; // Main Tags component

// Cookies Subcomponents
import Analytics from './components/cookies/Analytics';
import Targeting from './components/cookies/Targeting';
import NoPreferences from './components/cookies/NoPreferences';
import ThirdParty from './components/cookies/ThirdParty';

// Tags Subcomponents
import TagAnalytics from './components/tags/Analytics';
import TagTargeting from './components/tags/Targeting';
import TagNoPreferences from './components/tags/NoPreferences';
import TagThirdParty from './components/tags/ThirdParty';

const App = () => {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li><Link to="/">All</Link></li>
                        <li><Link to="/cookies">Cookies</Link></li>
                        <li><Link to="/tags">Tags</Link></li>
                    </ul>
                </nav>

                <Routes>
                    <Route path="/" element={<All />} />
                    <Route path="/cookies" element={<Cookies />} />
                    <Route path="/cookies/analytics" element={<Analytics />} />
                    <Route path="/cookies/targeting" element={<Targeting />} />
                    <Route path="/cookies/no_prefs" element={<NoPreferences />} />
                    <Route path="/cookies/third_party" element={<ThirdParty />} />
                    
                    <Route path="/tags" element={<Tags />} />
                    <Route path="/tags/analytics" element={<TagAnalytics />} />
                    <Route path="/tags/targeting" element={<TagTargeting />} />
                    <Route path="/tags/no_prefs" element={<TagNoPreferences />} />
                    <Route path="/tags/third_party" element={<TagThirdParty />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
