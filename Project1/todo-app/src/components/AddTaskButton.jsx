import styled from '@emotion/styled';

const Button = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 60px;
  height: 60px;
  border-radius: 12px;
  background: var(--purple-primary);
  color: white;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px rgba(107, 70, 193, 0.2);
  transition: all 0.2s ease;

  &:hover {
    background: var(--purple-dark);
    transform: translateY(-2px);
  }
`;

export default function AddTaskButton({ onClick }) {
  return <Button onClick={onClick}>+</Button>;
}