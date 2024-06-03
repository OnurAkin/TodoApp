import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import TaskItem from "./TaskItem";
import { Container, Paper, Title, Menu, Button, Group } from "@mantine/core";
import { IconFilter } from "@tabler/icons-react";
interface TaskListProps {
  onEdit: (task: { id: number; title: string; description?: string }) => void;
}

const TaskList: React.FC<TaskListProps> = ({ onEdit }) => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  // Filtreleme durumu için useState hook'u kullanımı
  const [filter, setFilter] = useState<"all" | "completed" | "incomplete">(
    "all"
  );
  const icon = <IconFilter size={14} />;
  // Görevleri filtreleme işlemi
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "incomplete") return !task.completed;
    return true;
  });

  return (
    <Container>
      {/* Filtreleme dropdown menüsü */}
      <Group justify="flex-end" mb="md">
        <Menu>
          <Menu.Target>
            <Button leftSection={icon}>Filter Tasks</Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item onClick={() => setFilter("all")}>All</Menu.Item>
            <Menu.Item onClick={() => setFilter("completed")}>
              Completed
            </Menu.Item>
            <Menu.Item onClick={() => setFilter("incomplete")}>
              Incomplete
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
      {/* Filtrelenmiş görevlerin listelenmesi */}
      {filteredTasks.length > 0 ? (
        filteredTasks.map((task) => (
          <Paper shadow="xs" p="md" mb="md" key={task.id}>
            <TaskItem
              id={task.id}
              title={task.title}
              description={task.description}
              completed={task.completed}
              onEdit={onEdit}
            />
          </Paper>
        ))
      ) : (
        <Title order={3}>No tasks found</Title>
      )}
    </Container>
  );
};

export default TaskList;
