import React from 'react';
import { useDispatch } from 'react-redux';
import { addTask, editTask } from '../redux/taskSlice';
import { useForm, zodResolver } from '@mantine/form';
import { TextInput, Textarea, Button, Group } from '@mantine/core';
import { z } from 'zod';

// Görev formu için Zod doğrulama şeması
const taskSchema = z.object({
  title: z.string().min(1, 'Task title is required'),
  description: z.string().optional(),
});

interface TaskFormProps {
  closeModal: () => void;
  task?: { id: number; title: string; description?: string };
}

const TaskForm: React.FC<TaskFormProps> = ({ closeModal, task }) => {
  const dispatch = useDispatch();

  // Form yönetimi ve doğrulama için Mantine useForm hook'u
  const form = useForm({
    initialValues: {
      title: task?.title || '',
      description: task?.description || '',
    },
    validate: zodResolver(taskSchema),
  });

  // Form gönderildiğinde çalışacak fonksiyon
  const handleSubmit = (values: { title: string; description?: string }) => {
    if (task) {
      // Mevcut görevi düzenleme
      dispatch(editTask({ id: task.id, ...values }));
    } else {
      // Yeni görev ekleme
      dispatch(addTask({ id: Date.now(), ...values, completed: false }));
    }
    form.reset(); // Formu temizleme
    closeModal(); // Modalı kapatma
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      {/* Görev başlığı girişi */}
      <TextInput
        label="Task Title"
        placeholder="Task Title"
        {...form.getInputProps('title')}
      />
      {/* Görev açıklaması girişi */}
      <Textarea
        label="Task Description (Optional)"
        placeholder="Task Description"
        mt="md"
        {...form.getInputProps('description')}
      />
      {/* Görev ekleme/düzenleme butonu */}
      <Group justify="right" mt="md">
        <Button type="submit">{task ? 'Edit Task' : 'Add Task'}</Button>
      </Group>
    </form>
  );
};

export default TaskForm;
