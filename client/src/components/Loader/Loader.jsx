import React from 'react';
import styled, { keyframes } from 'styled-components';


const Loader = () => {
  return (
    <LoaderContainer>
      <Spinner />
    </LoaderContainer>
  );
};

const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Spinner = styled.div`
  border: 4px solid #f3f3f3; /* Light gray border */
  border-top: 4px solid #3498db; /* Blue border on top to create the spinning effect */
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: ${spinAnimation} 1s linear infinite; /* Apply animation to create the spinning effect */
`;

export default Loader;