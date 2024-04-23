import React, { useState } from 'react';
import OverviewTab from './OverviewTab';
import OtherTab from './OtherTab';

const App = () => {
  const [activeTab, setActiveTab] = useState('Overview');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div>
        <button onClick={() => handleTabChange('Overview')}>Overview</button>
        <button onClick={() => handleTabChange('Other')}>Other</button>
      </div>
      {activeTab === 'Overview' && <OverviewTab />}
      {activeTab === 'Other' && <OtherTab />}
    </div>
  );
};

export default App;
