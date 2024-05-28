import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAddressContext } from "../context/address_context";
import { useNavigate } from "react-router-dom";

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
const BillingAddress = () => {
  const { addBillingAddress, shippingAddress } = useAddressContext();
  const navigate = useNavigate();
  const Input = ({ label, register, name, forLabel, required }) => {
    return (
      <div className="field">
        <label className="label" htmlFor={forLabel}>
          {label} {required ? "*" : null}
        </label>
        <input
          {...register(name)}
          type="text"
          className={`input ${errors[name] ? "error" : null}`}
          id={forLabel}
          aria-invalid={errors[name] ? "true" : "false"}
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
      phone: "+1",
      address1: "",
      address2: "",
      city: "",
      zipCode: "",
    },
    resolver: yupResolver(schema),
    mode: "all",
  });
  const onSubmitForm = (data) => {
    addBillingAddress(data);
    navigate("/checkout");
  };
  const [addressType, setAddressType] = useState("sameBilling");

  const handleAddressChange = (event) => {
    setAddressType(event.target.value);
  };

  const copyShippingToBilling = () => {
    addBillingAddress({ ...shippingAddress });
    navigate("/checkout");
  };

  return (
    <Wrapper>
      <h2>Billing Address</h2>
      <form>
        <div className="form-group">
          <div className="form-control">
            <label>Same as Shipping Address</label>
            <input
              type="radio"
              value="sameBilling"
              checked={addressType === "sameBilling"}
              onChange={handleAddressChange}
            />
          </div>
          <div className="form-control">
            <label>Add a new Billing Address</label>
            <input
              type="radio"
              value="newBilling"
              checked={addressType === "newBilling"}
              onChange={handleAddressChange}
            />
          </div>
        </div>
      </form>
      {addressType === "newBilling" ? (
        <Wrapper>
          <h5>Add new Billing Address</h5>
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
                Add Billing Address
              </button>
            </div>
          </form>
        </Wrapper>
      ) : (
        <button type="button" className="btn" onClick={copyShippingToBilling}>
          Continue to Pay
        </button>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  form {
    padding: 12px;
    padding-left: 0;
    .field {
      margin-bottom: 0.5rem;
    }

    .form-control {
      display: flex;
      gap: 0.5rem;
      align-items: center;
    }

    input {
      height: 2rem;
      border-radius: 4px;
    }
    input[type="text"],
    input[type="tel"] {
      width: 100%;
    }
    label {
      display: block;
      font-size: 16px;
      margin-bottom: 0.25rem;
      order: 1;
    }
    .submit {
      margin-top: 1rem;
      text-align: center;
    }
    .error {
      color: red;
      font-size: 14px;
      display: block;
    }
    input.error {
      border: 1px solid red;
    }
  }
`;

export default BillingAddress;
