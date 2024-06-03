import React, { useState } from 'react';
import { Container, Title, Button, Modal, Group } from '@mantine/core';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { IconPlus } from '@tabler/icons-react';

const App: React.FC = () => {
  const icon = <IconPlus size={14} />;
  // Modalın açık/kapalı durumu için useState hook'u
  const [opened, setOpened] = useState(false);
  // Düzenlenen görev bilgisi için useState hook'u
  const [editingTask, setEditingTask] = useState<{ id: number; title: string; description?: string } | undefined>(undefined);

  // Görevi düzenlemek için kullanılan fonksiyon
  const handleEdit = (task: { id: number; title: string; description?: string }) => {
    setEditingTask(task);
    setOpened(true);
  };

  // Modalı kapatma fonksiyonu
  const handleClose = () => {
    setOpened(false);
    setEditingTask(undefined);
  };

  return (
    <Container size="sm">
      <Title mt="lg">Task Manager</Title>
      {/* Yeni görev ekleme modalını açan buton */}
      <Group justify="flex-end" mb="xs">
      <Button
        rightSection={icon}
          variant="filled"
          color="violet"
          radius="xl"
          justify="flex-end"
          mt="md"
          onClick={() => setOpened(true)}
        >
          Add New Task
        </Button>
        </Group>

      {/* Görev ekleme/düzenleme modalı */}
      <Modal opened={opened} onClose={handleClose} title={editingTask ? "Edit Task" : "Add New Task"}>
        <TaskForm closeModal={handleClose} task={editingTask} />
      </Modal>
      {/* Görev listesini görüntüleme */}
      <TaskList onEdit={handleEdit} />
    </Container>
  );
};

export default App;
