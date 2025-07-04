import React from 'react';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';

const DownloadButton = ({ data, disabled }) => {
  const handleDownload = () => {
    if (!data || data.length === 0) return;

    const csv = Papa.unparse(data); // Convert array of objects to CSV
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'workout_routines.csv');
  };

  return (
    <button 
      onClick={handleDownload} 
      disabled={disabled || !data || data.length === 0}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
    >
      📁 Download Plan as CSV
    </button>
  );
};

export default DownloadButton;
