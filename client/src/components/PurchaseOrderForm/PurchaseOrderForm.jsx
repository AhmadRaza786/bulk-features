import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

import { 
  FormContainer, 
  FormGroup, 
  FileInput, 
  Label, 
  Message, 
  DateInput, 
  TextInput, 
} from './styles'

import Button from '../Button/Button'

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [error, setError] = useState();
  const [successMessage, setSuccessMessage] = useState();

  const onSubmit = (data) => {
    const { files, vendorName, date } = data;
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("name", vendorName);
    formData.append("date", date);

    axios
      .post("/api", formData)
      .then(function () {
        setError(undefined)
        setSuccessMessage('Purchase Order Posted successfuly')
        reset();
      })
      .catch(function (error) {
        setError(error.response.data.error);
      });
  };

  return (
    <FormContainer action="/post" onSubmit={handleSubmit(onSubmit)}>
      <Message error={!!error && !successMessage}>{error || successMessage}</Message>
      <FormGroup>
        <Label>Vendor Name:</Label>
        <TextInput
          type="text"
          {...register("vendorName", { required: true })}
        />
        <Message error>{errors.vendorName && <>This field is required </>}</Message>
      </FormGroup>

      <FormGroup>
        <Label>Date:</Label>
        <DateInput type="date" {...register("date", { required: true })} />
        <Message error>{errors.date && <>This field is required </>}</Message>
      </FormGroup>

      <FormGroup style={{ height: "max-content" }}>
        <Label>CSV File:</Label>
        <FileInput
          type="file"
          {...register("files", { required: true })}
          accept=".csv"
        />
        <Message error>{errors.files && <>This field is required </>}</Message>
      </FormGroup>

      <Button type="submit" label="Submit" loading={false} />
    </FormContainer>
  );
};

export default Form;
