import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask, toggleTask } from '../redux/taskSlice';

interface TaskItemProps {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
}

const TaskItem: React.FC<TaskItemProps> = ({ id, title, description, completed }) => {
  const dispatch = useDispatch();

  return (
    <div>
      {/* Görev başlığı ve durumu */}
      <h3 style={{ textDecoration: completed ? 'line-through' : 'none' }}>{title}</h3>
      {/* Görev açıklaması */}
      {description && <p>{description}</p>}
      {/* Görev tamamlama/iptal etme butonu */}
      <button onClick={() => dispatch(toggleTask(id))}>
        {completed ? 'Unmark' : 'Mark as Completed'}
      </button>
      {/* Görev silme butonu */}
      <button onClick={() => dispatch(deleteTask(id))}>Delete</button>
    </div>
  );
};

export default TaskItem;