import styled from 'styled-components'
import Loader from '../Loader/Loader'

const Button = ({ label, loading, onClick, ...p }) => {
  return (
    <StyledButton onClick={onClick} {...p} >
      <ButtonLabel loading={loading}>{label}</ButtonLabel>
      {loading && <Loader />}
    </StyledButton>
  );
};

export default Button

const StyledButton = styled.button`
  position: relative;
  background: #4070f4;
  color: #fff;
  padding: 10px 25px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  &:hover {
    opacity: 0.8;
  }
  &:active {
    opacity: 0.5;
  }
  &:disabled {
    background-color: gray;
    cursor: not-allowed;
  }
`;

const ButtonLabel = styled.span`
  display: ${props => (props.loading ? 'none' : 'block')};
`;