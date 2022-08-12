import React from 'react';
import styled from 'styled-components';
import DaysController from './DaysController';
import MonthController from './MonthController';

const Container = styled.section`
    padding: 8px 0 8px 40px;
    background-color: #F6F6F6;
    border-top: 1px solid #EBEBEB;
    border-bottom: 1px solid #EBEBEB;
`;

const DateContainer = () => {
  return (
    <Container>
      <DaysController />
      <MonthController />
    </Container>
  )
};

export default DateContainer;
