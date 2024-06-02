import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/taskSlice';
import { z } from 'zod';

// Görev formu için Zod şeması
const taskSchema = z.object({
  title: z.string().min(1, 'Task title is required'),
  description: z.string().optional(),
});

const TaskForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<{ title?: string }>({});
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Form verilerini doğrulama
    const result = taskSchema.safeParse({ title, description });

    if (!result.success) {
      // Hata mesajlarını ayıklama
      const formErrors = result.error.format();
      setErrors({
        title: formErrors.title?._errors[0],
      });
      return;
    }

    // Yeni görev oluşturma ve Redux store'a ekleme
    dispatch(addTask({ id: Date.now(), title, description, completed: false }));

    // Formu temizleme
    setTitle('');
    setDescription('');
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Görev başlığı girişi */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task Title"
        required
      />
      {errors.title && <span style={{ color: 'red' }}>{errors.title}</span>}
      {/* Görev açıklaması girişi */}
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task Description (Optional)"
      />
      {/* Görev ekleme butonu */}
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
