import React, { useContext } from 'react';
import styled from 'styled-components';
import { ReactComponent as AddIcon } from '../assets/icons/plus.svg';
import { EventContext } from '../context/EventContext';

const Container = styled.section`
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 14px;
  font-weight: 400;
`;

const AddButton = styled.button`  
  svg {
    width: 14px;
    height: 14px;
    fill: var(--accent-color);
  }
`;

const Header = () => {
  const {events, setEvents} = useContext(EventContext);

  const addEvent = () => {
    const eventTimeString = prompt('Enter event time: \n YYYY-MM-DD HH:mm:ss');
    if (!eventTimeString) {
      return;
    }

    const timePattern = /(?<date>\d{4}-\d{2}-\d{2})\s(?<time>\d{2}:\d{2}:\d{2})/;
    const timeMatch = eventTimeString.match(timePattern);
    if (!timeMatch) {
      alert('Invalid time format');
      return;
    }

    const {date, time} = timeMatch.groups;
    const [hourStr, minStr] = time.split(':');
    const timeMin = Number(hourStr) * 60 + Number(minStr);
    setEvents({
      ...events,
      [date]: [
        ...(events[date] ?? []),
        {
          date,
          time,
          timeMin,
        },
      ],
    });
  };

  return (
    <Container>
      <Title>Interview Calendar</Title>
      <AddButton onClick={addEvent}>
        <AddIcon />
      </AddButton>
    </Container>
  )
};

export default Header;
