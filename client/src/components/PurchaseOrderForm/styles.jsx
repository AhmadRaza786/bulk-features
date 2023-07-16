import styled from 'styled-components' 

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: 0 auto;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;

export const FormGroup = styled.div`
  height: 90px;
  width: 302px;
`;

export const Message = styled.div`
height: 21px;
font-weight: 500;
margin-top: 5px;
color: ${props => (props.error ? '#e31717' : '#0c6f0c')};
`;

export const Label = styled.label`
  font-weight: bold;
`;
export const FileInput = styled.input`
  margin-top: 10px;
  height: 100px;
  display: flex;
  justify-content: center;
  width: 100%;
  flex-direction: column;
  align-items: center;
  &::-webkit-file-upload-button {
    visibility: hidden;
    display: none;
  }
  &::before {
    height: 50px;
    content: "upload or Drop file here";
    border: 2px dashed #4070f4;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &::before:hover {
    border-color: #1b1c1d;
  }
`;

export const TextInput = styled.input`
  padding: 10px;
  width: 100%;
  border: 1px solid;
  border-radius: 5px;
  margin-top: 5px;
  &:focus {
    border: 2px solid;
    border-color: #4070f4;

    outline: none;
  }
`;

export const DateInput = styled(TextInput)``;

export const SubmitButton = styled.button`
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
