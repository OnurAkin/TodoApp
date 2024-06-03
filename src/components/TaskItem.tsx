import React from "react";
import { useDispatch } from "react-redux";
import { deleteTask, toggleTask } from "../redux/taskSlice";
import { Card, Text, Button, Group, Badge, Box } from "@mantine/core";

import { IconTrash } from "@tabler/icons-react";
import { IconCheck } from "@tabler/icons-react";
import { IconMinus } from "@tabler/icons-react";
interface TaskItemProps {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  onEdit: (task: { id: number; title: string; description?: string }) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  id,
  title,
  description,
  completed,
  onEdit,
}) => {
  const dispatch = useDispatch();
  const icon = <IconTrash size={16} />;
  const check = <IconCheck size={16} />;
  const minus = <IconMinus size={16} />;
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Box>
        {/* Görev başlığı ve tamamlanma durumu */}
        <Group justify="apart" mb="xs">
          <Text
            fw={500}
            style={{ textDecoration: completed ? "line-through" : "none" }}
          >
            {title}
          </Text>
          <Badge color={completed ? "green" : "red"} variant="light">
            {completed ? "Completed" : "Incomplete"}
          </Badge>
        </Group>
        {/* Görev açıklaması */}
        {description && (
          <Text size="sm" color="dimmed">
            {description}
          </Text>
        )}
      </Box>
      {/* Görev işlemleri butonları */}
      <Group mt="md" justify="flex-end">
        <Button
          variant="outline"
          rightSection={completed ? minus : check}
          color={completed ? "green" : "blue"}
          onClick={() => dispatch(toggleTask(id))}
        >
          {completed ? "Unmark" : "Mark as Completed"}
        </Button>
        <Button
          variant="outline"
          color="blue"
          onClick={() => onEdit({ id, title, description })}
        >
          Edit
        </Button>
        <Button
          variant="outline"
          rightSection={icon}
          color="red"
          onClick={() => dispatch(deleteTask(id))}
        >
          Delete
        </Button>
      </Group>
    </Card>
  );
};

export default TaskItem;
