import styled from '@emotion/styled';
import TaskCard from './TaskCard';

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`;

export default function TaskList({ tasks, onToggleTask }) {
  return (
    <ListContainer>
      {tasks.map(task => (
        <TaskCard
          key={task.id}
          task={task}
          onToggle={onToggleTask}
        />
      ))}
    </ListContainer>
  );
}