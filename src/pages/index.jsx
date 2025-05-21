import Layout from "./Layout.jsx";

import Dashboard from "./Dashboard";

import Editor from "./Editor";

import Templates from "./Templates";

import Analytics from "./Analytics";

import Settings from "./Settings";

import Preview from "./Preview";

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

const PAGES = {
    
    Dashboard: Dashboard,
    
    Editor: Editor,
    
    Templates: Templates,
    
    Analytics: Analytics,
    
    Settings: Settings,
    
    Preview: Preview,
    
}

function _getCurrentPage(url) {
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    let urlLastPart = url.split('/').pop();
    if (urlLastPart.includes('?')) {
        urlLastPart = urlLastPart.split('?')[0];
    }

    const pageName = Object.keys(PAGES).find(page => page.toLowerCase() === urlLastPart.toLowerCase());
    return pageName || Object.keys(PAGES)[0];
}

// Create a wrapper component that uses useLocation inside the Router context
function PagesContent() {
    const location = useLocation();
    const currentPage = _getCurrentPage(location.pathname);
    
    return (
        <Layout currentPageName={currentPage}>
            <Routes>            
                
                    <Route path="/" element={<Dashboard />} />
                
                
                <Route path="/Dashboard" element={<Dashboard />} />
                
                <Route path="/Editor" element={<Editor />} />
                
                <Route path="/Templates" element={<Templates />} />
                
                <Route path="/Analytics" element={<Analytics />} />
                
                <Route path="/Settings" element={<Settings />} />
                
                <Route path="/Preview" element={<Preview />} />
                
            </Routes>
        </Layout>
    );
}

export default function Pages() {
    return (
        <Router>
            <PagesContent />
        </Router>
    );
}