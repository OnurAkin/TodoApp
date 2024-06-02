import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import TaskItem from './TaskItem';
import { Container, Button, Group, Paper, Title } from '@mantine/core';

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
    <Container>
      {/* Filtreleme butonları */}
      <Group justify="center" mb="md">
        <Button onClick={() => setFilter('all')}>All</Button>
        <Button onClick={() => setFilter('completed')}>Completed</Button>
        <Button onClick={() => setFilter('incomplete')}>Incomplete</Button>
      </Group>
      {/* Filtrelenmiş görevlerin listelenmesi */}
      {filteredTasks.length > 0 ? (
        filteredTasks.map(task => (
          <Paper shadow="xs" p="md" mb="md" key={task.id}>
            <TaskItem
              id={task.id}
              title={task.title}
              description={task.description}
              completed={task.completed}
            />
          </Paper>
        ))
      ) : (
        <Title order={3} >No tasks found</Title>
      )}
    </Container>
  );
};

export default TaskList;
