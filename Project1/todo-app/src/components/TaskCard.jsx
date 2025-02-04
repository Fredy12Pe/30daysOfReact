import styled from '@emotion/styled';

const Card = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 12px;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  animation: slideIn 0.3s ease-out;
  opacity: ${props => props.completed ? 0.6 : 1};
  transition: opacity 0.3s ease;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  margin-right: 1rem;
  accent-color: var(--purple-primary);
`;

const TaskText = styled.span`
  color: ${props => props.checked ? 'var(--purple-light)' : '#2D3748'};
  text-decoration: ${props => props.checked ? 'line-through' : 'none'};
`;

export default function TaskCard({ task, onToggle }) {
  return (
    <Card completed={task.completed}>
      <Checkbox
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      <TaskText checked={task.completed}>{task.text}</TaskText>
    </Card>
  );
}