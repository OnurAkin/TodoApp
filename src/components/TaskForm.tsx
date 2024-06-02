import React from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/taskSlice';
import { useForm, zodResolver } from '@mantine/form';
import { TextInput, Textarea, Button, Group } from '@mantine/core';
import { z } from 'zod';

// Görev formu için Zod şeması
const taskSchema = z.object({
  title: z.string().min(1, 'Task title is required'),
  description: z.string().optional(),
});

interface TaskFormProps {
  closeModal: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ closeModal }) => {
  const dispatch = useDispatch();

  // Mantine formunu oluşturma
  const form = useForm({
    initialValues: {
      title: '',
      description: '',
    },
    validate: zodResolver(taskSchema),
  });

  const handleSubmit = (values: { title: string; description?: string }) => {
    // Yeni görev oluşturma ve Redux store'a ekleme
    dispatch(addTask({ id: Date.now(), ...values, completed: false }));
    // Formu temizleme
    form.reset();
    // Modalı kapatma
    closeModal();
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
      {/* Görev ekleme butonu */}
      <Group justify="flex-end" mt="md">
        <Button type="submit">Add Task</Button>
      </Group>
    </form>
  );
};

export default TaskForm;
