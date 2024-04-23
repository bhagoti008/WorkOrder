// components/OverviewTab.js
import React, { useState } from 'react';

const OverviewTab = ({ handleItemSelection }) => {
  const [expanded, setExpanded] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showOverlay, setShowOverlay] = useState(false);
  const [client, setClient] = useState('');
  const [commencementDate, setCommencementDate] = useState('');
  const [completionDate, setCompletionDate] = useState('');
  const [rfqCode, setRfqCode] = useState('');
  const [dateError, setDateError] = useState(false);

  const toggleExpand = (packageIndex) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [packageIndex]: !prevExpanded[packageIndex],
    }));
  };

  const toggleItemSelection = (item) => {
    const selectedIndex = selectedItems.indexOf(item);
    let newSelected = [...selectedItems];

    if (selectedIndex === -1) {
      newSelected.push(item);
    } else {
      newSelected.splice(selectedIndex, 1);
    }

    setSelectedItems(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      const allItems = [];
      for (let i = 1; i <= 5; i++) {
        for (let j = 1; j <= 4; j++) {
          for (let k = 1; k <= 3; k++) {
            allItems.push(`Civil${i}-Activity${j}-WorkItem${k}`);
          }
        }
      }
      setSelectedItems(allItems);
    }
    setSelectAll(!selectAll);
  };

  const handleSave = () => {
    setShowOverlay(true);
  };

  const handleOverlayClose = () => {
    setShowOverlay(false);
    // Reset overlay input fields
    setClient('');
    setCommencementDate('');
    setCompletionDate('');
    setRfqCode('');
    setDateError(false);
  };

  const handleDone = () => {
    if (!commencementDate || !completionDate || !rfqCode) {
      setDateError(true);
      return;
    }

    console.log('Selected Items:', selectedItems);
    console.log('Client:', client);
    console.log('Commencement Date:', commencementDate);
    console.log('Completion Date:', completionDate);
    console.log('RFQ Code:', rfqCode);
    handleOverlayClose();
  };

  const validateDate = (date) => {
    return /\d{4}-\d{2}-\d{2}/.test(date);
  };

  return (
    <div>
      <h2>Overview</h2>
      <div>
        <button onClick={toggleSelectAll}>
          {selectAll ? 'Deselect All' : 'Select All'}
        </button>
        <button onClick={handleSave}>Save Selection</button>
        <table>
          <thead>
            <tr>
              <th>Packages</th>
              <th>Rate (in sqrt)</th>
              <th>Total</th>
              <th>Select</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, i) => (
              <React.Fragment key={i}>
                <tr>
                  <td>Civil {i + 1}</td>
                  <td>567.80</td>
                  <td>2986792</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(`Civil${i + 1}`)}
                      onChange={() => toggleItemSelection(`Civil${i + 1}`)}
                    />
                  </td>
                  <td>
                    <button onClick={() => toggleExpand(i)}>
                      {expanded[i] ? '-' : '+'}
                    </button>
                  </td>
                </tr>
                {expanded[i] && (
                  <tr>
                    <td colSpan="4">
                      <table>
                        <tbody>
                          {[...Array(4)].map((_, j) => (
                            <React.Fragment key={j}>
                              <tr>
                                <td>Activity {j + 1}</td>
                                <td colSpan="3">
                                  <input
                                    type="checkbox"
                                    checked={selectedItems.includes(`Civil${i + 1}-Activity${j + 1}`)}
                                    onChange={() =>
                                      toggleItemSelection(`Civil${i + 1}-Activity${j + 1}`)
                                    }
                                  />
                                  <button onClick={() => toggleExpand(`${i}-${j}`)}>
                                    {expanded[`${i}-${j}`] ? '-' : '+'}
                                  </button>
                                </td>
                              </tr>
                              {expanded[`${i}-${j}`] && (
                                [...Array(3)].map((_, k) => (
                                  <tr key={k}>
                                    <td>Work Item {k + 1}</td>
                                    <td colSpan="3">
                                      <input
                                        type="checkbox"
                                        checked={selectedItems.includes(
                                          `Civil${i + 1}-Activity${j + 1}-WorkItem${k + 1}`
                                        )}
                                        onChange={() =>
                                          toggleItemSelection(
                                            `Civil${i + 1}-Activity${j + 1}-WorkItem${k + 1}`
                                          )
                                        }
                                      />
                                    </td>
                                  </tr>
                                ))
                              )}
                            </React.Fragment>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      {showOverlay && (
        <div className="overlay">
          <div className="overlay-content">
            <h2>Work Order Details</h2>
            <label>
              Client:
              <select value={client} onChange={(e) => setClient(e.target.value)}>
                <option value="">Select Client</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>
            </label>
            <label>
              Date of Commencement:
              <input
                type="text"
                value={commencementDate}
                onChange={(e) => setCommencementDate(e.target.value)}
                className={dateError && !validateDate(commencementDate) ? 'error' : ''}
              />
              {dateError && !validateDate(commencementDate) && (
                <span className="error-message">Invalid date format (YYYY-MM-DD)</span>
              )}
            </label>
            <label>
              Date of Completion:
              <input
                type="text"
                value={completionDate}
                onChange={(e) => setCompletionDate(e.target.value)}
                className={dateError && !validateDate(completionDate) ? 'error' : ''}
              />
              {dateError && !validateDate(completionDate) && (
                <span className="error-message">Invalid date format (YYYY-MM-DD)</span>
              )}
            </label>
            <label>
              RFQ Code:
              <input
                type="text"
                value={rfqCode}
                onChange={(e) => setRfqCode(e.target.value)}
              />
            </label>
            <button onClick={handleDone}>Done</button>
            <button onClick={handleOverlayClose}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OverviewTab;
