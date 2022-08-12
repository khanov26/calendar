import React, {useContext, useEffect, useState} from 'react';
import { useRef } from 'react';
import styled, { css } from 'styled-components';
import { ReactComponent as ArrowRight } from '../assets/icons/arrow-right.svg';
import { DateContext } from '../context/DateContext';

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
`;

const ArrowButton = styled.button`
  width: 14.28%;
  flex-shrink: 0;
  svg {
    stroke: var(--accent-color);
    width: 18px;
    height: 18px;
    ${props => props.direction === 'left' && css`
      transform: rotate(180deg);
    `}
  }
`;

const SliderContainer = styled.div`
  flex: 1;
  overflow: hidden;
`;

const SliderTape = styled.div`
  display: flex;
  width: 100%;
  ${props => props.transitionEnabled && css`
    transition: transform .3s;
  `}
  transform: translateX(${props => -100 * props.slide}%);
`;

const Slide = styled.div`
  flex-shrink: 0;
  width: 100%;
  text-align: center;
  font-size: 12px;
`;

function getAdjacentMonths(selectedDate) {
  const date = new Date(selectedDate.getTime());
  date.setDate(1);
  const labelOption = {
    year: 'numeric',
    month: 'long',
  };

  const months = [];
  
  // prev month
  date.setMonth(selectedDate.getMonth() - 1);
  addMonth(date);

  // current month
  date.setMonth(selectedDate.getMonth());
  addMonth(date);

  // next month
  date.setMonth(selectedDate.getMonth() + 1);
  addMonth(date);

  return months;

  function addMonth(date) {
    months.push(date.toLocaleDateString('en', labelOption));
  }
}

const MonthController = () => {
  const [slide, setSlide] = useState(1);
  const transitionEnabled = useRef(true);
  const {selectedDate, setSelectedDate} = useContext(DateContext);
  const months = getAdjacentMonths(selectedDate);

  const handlePrevButtonClick = () => {
    setSlide(slide - 1);
  };

  const handleNextButtonClick = () => {
    setSlide(slide + 1);    
  };

  const handleTransitionEnd = () => {
    transitionEnabled.current = false;
    
    const newDate = new Date(selectedDate.getTime());
    newDate.setDate(1);
    newDate.setMonth(selectedDate.getMonth() + slide - 1);
    setSelectedDate(newDate);
    setSlide(1);
    setTimeout(() => {
      transitionEnabled.current = true;
    });
  };

  return (
    <Container onTransitionEnd={handleTransitionEnd}>
      <ArrowButton direction="left" onClick={handlePrevButtonClick}>
        <ArrowRight />
      </ArrowButton>

      <SliderContainer>
        <SliderTape slide={slide} transitionEnabled={transitionEnabled.current}>
          {months.map(month => (
            <Slide key={month}>{month}</Slide>
          ))}
        </SliderTape>
      </SliderContainer>

      <ArrowButton onClick={handleNextButtonClick}>
        <ArrowRight />
      </ArrowButton>
    </Container>
  );
};

export default MonthController;
