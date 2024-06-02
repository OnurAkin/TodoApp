import React, { useState } from 'react';
import { Container, Title, Button, Modal, Group } from '@mantine/core';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

const App: React.FC = () => {
  const [opened, setOpened] = useState(false);

  return (
    <Container size="sm">
      <Title mt="lg">Task Manager</Title>
      {/* Görev ekleme modalı açma butonu */}
      <Group justify='flex-end'>
      <Button variant="filled" color="violet" radius="xl" justify='flex-end' mt="md" onClick={() => setOpened(true)}>
        Add New Task
      </Button>
      </Group>
 
      {/* Görev ekleme modalı */}
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Add New Task"
      >
        <TaskForm closeModal={() => setOpened(false)} />
      </Modal>
      <TaskList />
    </Container>
  );
};

export default App;
