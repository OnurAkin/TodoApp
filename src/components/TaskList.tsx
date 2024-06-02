import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import TaskItem from './TaskItem';

const TaskList: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const [filter, setFilter] = useState<'all' | 'completed' | 'incomplete'>('all');

  // Görevleri filtreleme işlemi
  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true;
  });

  return (
    <div>
      {/* Filtreleme butonları */}
      <div>
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
        <button onClick={() => setFilter('incomplete')}>Incomplete</button>
      </div>
      {/* Filtrelenmiş görevlerin listelenmesi */}
      {filteredTasks.map(task => (
        <TaskItem
          key={task.id}
          id={task.id}
          title={task.title}
          description={task.description}
          completed={task.completed}
        />
      ))}
    </div>
  );
};

export default TaskList;