import React from 'react';
import DashboardSidebar from '../pages/DashboardSidebar/DashboardSidebar';
import Navbar from '../pages/shared/Navbar/Navbar';

const DashboardLayouts = () => {
    return (
        <div>
            <Navbar />
            <DashboardSidebar />
        </div>
    );
};

export default DashboardLayouts;