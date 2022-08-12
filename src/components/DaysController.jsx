import React, { createRef, useEffect, useContext } from 'react';
import styled, { css } from 'styled-components';
import { DateContext } from '../context/DateContext';
import { createMonthDays } from '../helpers/date';
import eventBus from '../helpers/eventBus';

const Container = styled.div`
  position: relative;
  display: flex;
  overflow: scroll;
  scroll-behavior: smooth;
`;

const DayBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  width: 14.28%;
  gap: 5px;
  cursor: pointer;
`;

const Weekday = styled.span`
  font-size: 8px;
`;

const Day = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  font-size: 12px;

  ${props => props.selected && css`
    color: #fff;
    background-color: var(--accent-color);
  `}
`;

const DaysController = () => {
  const {selectedDate, setSelectedDate} = useContext(DateContext);
  const days = createMonthDays(selectedDate);

  const containerRef = createRef(null);

  const handleDayClick = (day) => () => {
    const newSelectedDate = new Date(selectedDate.getTime());
    newSelectedDate.setDate(day);
    setSelectedDate(newSelectedDate);
  };

  useEffect(() => {
    const currentDate = containerRef.current.querySelector(`[data-date="${selectedDate.getDate()}"]`);
    containerRef.current.scrollLeft = currentDate.offsetLeft +
      currentDate.offsetWidth / 2 - containerRef.current.offsetWidth / 2;
  }, [containerRef, selectedDate]);

  const handleContainerScroll = (event) => {
    eventBus.emit('daysContainerScroll', {
      scrollLeft: event.target.scrollLeft,
      offsetWidth: event.target.offsetWidth,
    });
  }

  return (
    <Container ref={containerRef} className="hidden-scrollbar" onScroll={handleContainerScroll}>
        {days.map(({weekday, day}) => (
          <DayBlock key={day} data-date={day} onClick={handleDayClick(day)}>
            <Weekday>{weekday}</Weekday>
            <Day selected={selectedDate.getDate() === day}>{day}</Day>
          </DayBlock>
        ))}
    </Container>
  )
};

export default DaysController;
