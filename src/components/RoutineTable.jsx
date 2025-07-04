import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TrashIcon, PlusIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline';
import Fuse from 'fuse.js';
import { exerciseDict } from '../data/exerciseDict';

const allExercises = Object.values(exerciseDict).flat();
const fuse = new Fuse(allExercises, { includeScore: true, threshold: 0.3 });

const RoutineTable = ({ plan, onReorder, onDelete, onClear, onPublish, onAdd }) => {
  const sensors = useSensors(useSensor(PointerSensor));

  const [exercise, setExercise] = useState('');
  const [setsReps, setSetsReps] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = plan.findIndex((item) => item.id === active.id);
    const newIndex = plan.findIndex((item) => item.id === over.id);
    const newOrder = arrayMove(plan, oldIndex, newIndex);
    onReorder(newOrder);
  };

  const handleExerciseChange = (e) => {
    const value = e.target.value;
    setExercise(value);
    if (value.length > 1) {
      const results = fuse.search(value).slice(0, 5).map((r) => r.item);
      setSuggestions(results);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setExercise(suggestion);
    setSuggestions([]);
  };

  return (
    <div className="routine-container">
      <h2 className="routine-heading">📝 Staged Workout Plan</h2>

      <div className="table-wrapper">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={plan.map((entry) => entry.id.toString())}
            strategy={verticalListSortingStrategy}
          >
            <table className="routine-table">
              <thead className="table-head">
                <tr>
                  <th>
                    <ChevronUpDownIcon class="icon" />
                  </th>
                  <th>Exercise</th>
                  <th>Set/Reps</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {plan.map((entry, index) => (
                  <DraggableRow
                    key={entry.id}
                    id={entry.id.toString()}
                    entry={entry}
                    index={index}
                    onDelete={onDelete}
                  />
                ))}

                <tr className="add-row">
                  <td>+</td>
                  <td className="relative">
                    <input
                      type="text"
                      value={exercise}
                      onChange={handleExerciseChange}
                      placeholder="e.g. Goblet Squat"
                    />
                    {suggestions.length > 0 && (
                      <ul className="suggestions-list">
                        {suggestions.map((s, idx) => (
                          <li
                            key={idx}
                            onClick={() => handleSuggestionClick(s)}
                            className="suggestion-item"
                          >
                            {s}
                          </li>
                        ))}
                      </ul>
                    )}
                  </td>
                  <td>
                    <input
                      type="text"
                      value={setsReps}
                      onChange={(e) => setSetsReps(e.target.value)}
                      placeholder="e.g. 3x8"
                    />
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        onAdd({ exercise, setsReps });
                        setExercise('');
                        setSetsReps('');
                        setSuggestions([]);
                      }}
                      className="add-btn"
                    >
                      <PlusIcon className="icon" /> Add
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </SortableContext>
        </DndContext>
      </div>

      <div className="btn-row">
        <button
          onClick={onClear}
          disabled={plan.length === 0}
          className="clear-btn"
        >
          🗑️ Clear Staged Plan
        </button>
        <button
          onClick={onPublish}
          disabled={plan.length === 0}
          className="publish-btn"
        >
          📣 Publish Plan
        </button>
      </div>
    </div>
  );
};

export default RoutineTable;

function DraggableRow({ id, entry, index, onDelete }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: id.toString() });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleStyle = {
    cursor: isDragging ? 'grabbing' : 'grab',
  };

  return (
    <tr ref={setNodeRef} style={style} className="draggable-row">
      <td         {...listeners}
        {...attributes}
        title="Drag to reorder"
        className="drag-handle"
        style={handleStyle}
      >⠿</td>
      <td data-label="Exercise">{entry.exercise}</td>
      <td data-label="SetsReps">{entry.setsReps}</td>
      <td>
        <button
          onClick={() => onDelete(id)}
          className="delete-btn"
        >
          <TrashIcon class="icon" />
        </button>
      </td>
    </tr>
  );
}
