import { format } from 'date-fns';
import styled from '@emotion/styled';

const HeaderContainer = styled.header`
  margin-bottom: 2rem;
`;

const DayText = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  color: var(--purple-dark);
  margin: 0;
`;

const DateText = styled.p`
  font-size: 1.2rem;
  color: var(--purple-light);
  margin: 0;
`;

export default function Header() {
  const today = new Date();
  
  return (
    <HeaderContainer>
      <DayText>{format(today, 'EEEE')}</DayText>
      <DateText>{format(today, 'MMM do')}</DateText>
    </HeaderContainer>
  );
}