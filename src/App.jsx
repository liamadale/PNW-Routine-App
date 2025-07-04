import React, { useState } from 'react';
import RoutineTable from './components/RoutineTable';
import PublishedPlan from './components/PublishedPlan';
import DownloadButton from './components/DownloadButton';
import { exerciseDict } from './data/exerciseDict';
import { v4 as uuidv4 } from 'uuid';

const App = () => {
  const [stagedPlan, setStagedPlan] = useState([]);
  const [fullPlan, setFullPlan] = useState([]);

  const handleAdd = (entry) => {
    const newEntry = { ...entry, id: uuidv4() };
    setStagedPlan([...stagedPlan, newEntry]);
  };

  const handleDelete = (id) => {
    console.log("App received delete for ID:", id);
    const newPlan = stagedPlan.filter(entry => entry.id !== id);
    setStagedPlan(newPlan);
  };

  const handleClear = () => {
    setStagedPlan([]);
  };

  const handlePublish = () => {
    setFullPlan([...stagedPlan]);
    setStagedPlan([]);
  };

  return (
    <div className="container">
      <h1 className="heading-xl">⌛ Workout Routine Builder</h1>

      <RoutineTable
        plan={stagedPlan}
        onReorder={setStagedPlan}
        onDelete={handleDelete}
        onClear={handleClear}
        onPublish={handlePublish}
        onAdd={handleAdd}
        exerciseDict={exerciseDict}
      />

      <div className="section">
        <PublishedPlan plan={fullPlan} />
        <div className="section">
          <DownloadButton data={fullPlan} />
        </div>
      </div>
    </div>
  );
};

export default App;
