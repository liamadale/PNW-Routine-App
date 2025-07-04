import React from 'react';

const PublishedPlan = ({ plan }) => {
  if (!plan || plan.length === 0) {
    return <p className="text-gray-500">No published workout plan available.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <h2 className="text-lg font-bold mb-2">📣 Final Published Workout Plan</h2>
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-2 py-1">Exercise</th>
            <th className="border border-gray-300 px-2 py-1">Set/Reps</th>
          </tr>
        </thead>
        <tbody>
          {plan.map((entry, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-2 py-1">{entry.exercise}</td>
              <td className="border border-gray-300 px-2 py-1">{entry.setsReps}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PublishedPlan;
