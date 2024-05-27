import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup
  .object({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    phone: yup
      .string()
      .required("Phone Number is required")
      .matches(/^[0-9()+]{12}$/, "Invalid Phone number"),
    address1: yup.string().required("Address Line1 is required"),
    address2: yup.string(),
    city: yup.string().required("City is required"),
    zipCode: yup.string().required("Zip Code is required"),
  })
  .required();

const ShippingAddress = () => {
  const Input = ({ label, register, name, forLabel, required }) => {
    return (
      <div className="field">
        <label className="label" htmlFor={forLabel}>
          {label} {required ? "*" : null}
        </label>
        <input
          {...register(name)}
          type="text"
          className="input"
          id={forLabel}
        />
        {errors[name] && <span className="error">{errors[name].message}</span>}
      </div>
    );
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "+1 ",
      address1: "",
      address2: "",
      city: "",
      zipCode: "",
    },
    resolver: yupResolver(schema),
  });
  console.log("errors", errors);
  const onSubmitForm = (data) => {
    console.log("data", data);
  };
  return (
    <Wrapper>
      <h1>Shipping Address</h1>
      <p>* indicates the field is required</p>
      <form className="form" onSubmit={handleSubmit(onSubmitForm)}>
        <Input
          label="First Name"
          register={register}
          name="firstName"
          forLabel="shippingFirstName"
          required={true}
        />
        <Input
          label="Last Name"
          register={register}
          name="lastName"
          forLabel="shippingLastName"
          required
        />
        <div className="field">
          <label className="label" htmlFor="phoneNum">
            Phone *
          </label>
          <input
            {...register("phone")}
            type="tel"
            className="input"
            id="phoneNum"
          />
          {errors.phone && (
            <span className="error">{errors.phone.message}</span>
          )}
        </div>
        <Input
          label="Address line 1"
          register={register}
          name="address1"
          forLabel="addressLine1"
          required
        />
        <Input
          label="Address line 2"
          register={register}
          name="address2"
          forLabel="addressLine2"
          required={false}
        />
        <Input
          label="City/Town"
          register={register}
          name="city"
          forLabel="city"
          required
        />
        <Input
          label="Zip Code"
          register={register}
          name="zipCode"
          forLabel="zipCode"
          required
        />
        <div className="submit">
          <button type="submit" className="btn">
            Add Shipping Address
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: block;

  form {
    padding: 12px;
    padding-left: 0;
    .field {
      margin-bottom: 0.5rem;
    }

    input {
      height: 2rem;
      border-radius: 4px;
      width: 100%;
    }
    label {
      display: block;
      font-size: 16px;
      margin-bottom: 0.25rem;
    }
    .submit {
      margin-top: 1rem;
      text-align: center;
    }
    .error {
      color: red;
      font-size: 14px;
    }
  }
`;

export default ShippingAddress;
