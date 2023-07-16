import Form from "./components/PurchaseOrderForm/PurchaseOrderForm";
import styled from "styled-components";

function App() {
  return (
    <Container>
      <Warpper>
        <Form />
      </Warpper>
    </Container>
  );
}

export default App;

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #4070f4;
`;

const Warpper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 20px;
  width: 100%;
`;
