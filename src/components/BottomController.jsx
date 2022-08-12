import React, { useContext } from 'react';
import styled from 'styled-components';
import { DateContext } from '../context/DateContext';
import { EventContext } from '../context/EventContext';

const Container = styled.section`
  display: flex;
  justify-content: space-between;
  background-color: #F6F6F6;
  border-top: 1px solid #EBEBEB;
  padding: 15px 20px;
`;

const Button = styled.button`
  font-size: 12px;
  color: var(--accent-color);
`;

const BottomController = () => {
  const {setSelectedDate} = useContext(DateContext);
  const {events, setEvents, selectedEvent, setSelectedEvent} = useContext(EventContext);

  const resetDate = () => {
    setSelectedDate(new Date());
  };

  const deleteSelectedEvent = () => {
    setEvents({
      ...events,
      [selectedEvent.date]: [
        ...events[selectedEvent.date].filter(event => event !== selectedEvent)
      ],
    });
    setSelectedEvent(null);
  };

  return (
    <Container>
      <Button onClick={resetDate}>Today</Button>
      {selectedEvent !== null && <Button onClick={deleteSelectedEvent}>Delete</Button>}
    </Container>
  );
};

export default BottomController;
