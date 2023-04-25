import React, { useState, useEffect } from "react";
import "./Style.css";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import Thankyou from "./Thankyou";

function FormCard() {
  const { register, control, formState, handleSubmit } = useForm();
  const { errors } = formState;
  const [customer, setCustomer] = useState({
    number: "0000 0000 0000 0000",
    name: "CARD HOLDER NAME",
    month: 12,
    year: 22,
    cvc: 123
  });
  const [isRegistrationComplete, setIsRegistrationComplete] = useState(true);

  const onSubmit = (data) => {
    setCustomer({
      name: data.name,
      number: data.number,
      month: data.month,
      year: data.year,
      cvc: data.cvc,
    });
    setIsRegistrationComplete(false);
    console.log(customer);
  };
  return (
    <div className="parentContainer">
      <div className="emptyDiv">
        <img src="/Assets/bg-main-desktop.png" alt="bcg" />

        <div className="frontSideCard">
          <div className="circles">
            <div className="circle"></div>
            <div className="circleOutline"></div>
          </div>

          <div className="cardNumberContainer">
            <p className="cardNumber">{customer?.number }</p>
          </div>

          <div className="nameDate">
            <div className="cardName">
              <p className="userName">{customer?.name}</p>
            </div>

            <div className="cardDate">
              <p className="date">
                <span>
                  {customer?.month}/{customer?.year}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="backSideCard">
          <p className="cvcNumber">{customer?.cvc}</p>
        </div>
      </div>
      {isRegistrationComplete ? (
        <>
          <div className="formContainer">
            <form
              action=""
              className="form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >
              <label htmlFor="name" className="name">
                CARDHOLDER NAME
                <input
                  type="text"
                  placeholder="e.g John Doe"
                  id="name"
                  {...register("name", {
                    required: {
                      value: true,
                      message: "Name is required",
                    },
                  })}
                />
                <p className="errorMessage">{errors.name?.message}</p>
              </label>

              <label htmlFor="number" className="number">
                CARD NUMBER
                <input
                  type="number"
                  placeholder="e.g 1234 5678 0000 4321"
                  id="number"
                  {...register("number", {
                    required: {
                      value: true,
                      message: "Card number is required",
                    },
                    minLength: {
                      value: 16,
                      message: "Card number should not be less than 16",
                    },
                    maxLength: {
                      value: 16,
                      message: "Card number should not be more than 16",
                    },
                  })}
                />
                <p className="errorMessage">{errors.number?.message}</p>
              </label>

              <div className="dateCvc">
                <label htmlFor="date" className="date">
                  EXP DATE
                  <div className="dateInputs">
                    <input
                      type="number"
                      placeholder="MM"
                      id="month"
                      {...register("month", {
                        required: {
                          value: true,
                          message: "This field is required",
                        },
                        min: {
                          value: 1,
                        },
                        max: {
                          value: 12,
                        },
                        minLength: {
                          value: 2,
                          message: "Minimum length is 2",
                        },
                        maxLength: {
                          value: 2,
                          message: "Maximum length is 2",
                        },
                      })}
                    />

                    <input
                      type="number"
                      placeholder="YY"
                      id="year"
                      {...register("year", {
                        required: {
                          value: true,
                          message: "This field is required",
                        },
                        minLength: {
                          value: 2,
                          message: "Minimum length is 2",
                        },
                        maxLength: {
                          value: 2,
                          message: "Maximum length is 2",
                        },
                      })}
                    />
                  </div>
                  <p className="errorMessage">{errors.year?.message}</p>
                </label>

                <label htmlFor="cvc" className="cvc">
                  CVC
                  <input
                    type="number"
                    placeholder="e.g 123"
                    id="cvc"
                    {...register("cvc", {
                      required: {
                        value: true,
                        message: "This field is required",
                      },
                      minLength: {
                        value: 3,
                        message: "Minimum length is 3",
                      },
                      maxLength: {
                        value: 3,
                        message: "Maximum length is 3",
                      },
                    })}
                  />
                  <p className="errorMessage">{errors.cvc?.message}</p>
                </label>
              </div>

              <button className="confirmBtn">Confirm</button>
            </form>
          </div>
        </>
      ) : (
        <Thankyou />
      )}

      {/* <DevTool control={control} /> */}
    </div>
  );
}

export default FormCard;
