import React from 'react';

const PublishedPlan = ({ plan }) => {
  if (!plan || plan.length === 0) {
    return <p className="text-gray-500">No published workout plan available.</p>;
  }

  return (
    <div className="table-wrapper">
      <h2 className="routine-heading">📣 Final Published Workout Plan</h2>
      <table className="routine-table">
        <thead>
          <tr>
            <th>Exercise</th>
            <th>Set/Reps</th>
          </tr>
        </thead>
        <tbody>
          {plan.map((entry, index) => (
            <tr key={index}>
              <td>{entry.exercise}</td>
              <td>{entry.setsReps}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PublishedPlan;
