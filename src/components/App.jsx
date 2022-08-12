import styled from "styled-components";
import { DateProvider } from "../context/DateContext";
import { EventProvider } from "../context/EventContext";
import BottomController from "./BottomController";
import DateContainer from "./DateContainer";
import EventsController from "./EventsController";
import Header from "./Header";

const Container = styled.div`
  height: 100vh;
  max-width: 740px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

function App() {
  return (
    <Container>
      <DateProvider>
        <EventProvider>
          <Header />
          <DateContainer />
          <EventsController />
          <BottomController />
        </EventProvider>
      </DateProvider>
    </Container>
  );
}

export default App;
