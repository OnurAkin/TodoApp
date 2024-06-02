import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask, toggleTask } from '../redux/taskSlice';
import { Card, Text, Button, Group, Badge, Box } from '@mantine/core';

interface TaskItemProps {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
}

const TaskItem: React.FC<TaskItemProps> = ({ id, title, description, completed }) => {
  const dispatch = useDispatch();

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Box>
        <Group justify="center" mb="xs">
          <Text fw={500} style={{ textDecoration: completed ? 'line-through' : 'none' }}>
            {title}
          </Text>
          <Badge color={completed ? 'green' : 'red'} variant="light">
            {completed ? 'Completed' : 'Incomplete'}
          </Badge>
        </Group>
        {description && <Text size="sm" color="dimmed">{description}</Text>}
      </Box>
      <Group mt="md" justify="flex-end">
        <Button variant="outline" color={completed ? 'green' : 'blue'} onClick={() => dispatch(toggleTask(id))}>
          {completed ? 'Unmark' : 'Mark as Completed'}
        </Button>
        <Button variant="outline" color="red" onClick={() => dispatch(deleteTask(id))}>Delete</Button>
      </Group>
    </Card>
  );
};

export default TaskItem;
