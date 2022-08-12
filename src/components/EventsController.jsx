import React, { useContext } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import { DateContext } from '../context/DateContext';
import { EventContext } from '../context/EventContext';
import { createMonthDays } from '../helpers/date';
import eventBus from '../helpers/eventBus';

const Container = styled.section`
  flex: 1;
  overflow-y: scroll;
  padding-top: 10px;
`;

const Content = styled.div`
  display: flex;
`;

const TimesColumn = styled.div`
  position: relative;
  top: -5px;
  flex: 0 0 40px;
  display: flex;
  flex-direction: column;
  padding-right: 5px;
`;

const TimeCell = styled.div`
  flex: 1;
  text-align: end;
  font-size: 10px;
  color: #C0C0C0;
`;

const Cell = styled.div`
  border-top: 1px solid #EBEBEB;
  border-right: 1px solid #EBEBEB;
  aspect-ratio: 78 / 62;
  flex-shrink: 0;
`;

const CellsColumn = styled.div`
  position: relative;
  flex: 1 0 14.28%;
  display: flex;
  flex-direction: column;
`;

const CellsTable = styled.div`
  display: flex;
`;

const CellsWrapper = styled.div`
  flex: 1;
  overflow: hidden;
`;

const EventCell = styled.div`
  position: absolute;
  left: 2px;
  right: 3px;
  transform: translateY(3px);
  background-color: var(${props => props.isSelected ? '--selected-event-color' : '--event-color'});
  aspect-ratio: 78 / 60;
  cursor: pointer;
`;

const times = new Array(24).fill().map((_, index) => {
  return `${String(index).padStart(2, 0)}:00`;
});

const EventsController = () => {
  const {selectedDate} = useContext(DateContext);
  const days = createMonthDays(selectedDate);
  const {events, selectedEvent, setSelectedEvent} = useContext(EventContext);

  const tableRef = useRef(null);

  useEffect(() => {
    const scrollTable = ({scrollLeft, offsetWidth}) => {
      const movePercent = scrollLeft / offsetWidth * 100;
      tableRef.current.style.transform = `translateX(-${movePercent}%)`;
    };

    const unsubscribe = eventBus.on('daysContainerScroll', scrollTable);

    return () => unsubscribe();
  }, []);

  const handleEventClick = (event) => () => {
    if (selectedEvent === event) {
      setSelectedEvent(null);
    } else {
      setSelectedEvent(event);
    }
  };

  return (
    <Container className="hidden-scrollbar">
      <Content>
        <TimesColumn>
          {times.map(time => (
            <TimeCell key={time}>{time}</TimeCell>
          ))}
        </TimesColumn>

        <CellsWrapper>
          <CellsTable ref={tableRef}>
            {days.map((day, columnIndex) => (
              <CellsColumn key={columnIndex}>
                {new Array(24).fill().map((_, cellIndex) => (
                  <Cell key={cellIndex} />
                ))}
                {events[day.dateLabel] && events[day.dateLabel].map((event) => {
                  const timeMin = event.timeMin;
                  return (
                    <EventCell 
                      key={timeMin} 
                      isSelected={event === selectedEvent} 
                      style={{top: `${timeMin / 24 / 60 * 100}%`}}
                      onClick={handleEventClick(event)}
                    />
                  );
                })}
              </CellsColumn>
            ))}
          </CellsTable>
        </CellsWrapper>
      </Content>
    </Container>
  );
};

export default EventsController;
