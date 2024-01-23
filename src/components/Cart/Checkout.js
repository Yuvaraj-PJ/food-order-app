import useInput from "../../hooks/use-input";

import classes from "./Checkout.module.css";

const Checkout = (props) => {
    const isNotEmpty = (value) => value.trim() !== "";
  const ispostalCodevalid = (value) => value.trim().length === 5;
  const {
    value: name,
    valueChangeHandler: nameChangehandler,
    hasError: nameisInvalid,
    isValid: nameIsvalid,
    valueOnBlurHandler: nameBlurHandler,
  } = useInput(isNotEmpty);
  const {
    value: street,
    valueChangeHandler: streetChangehandler,
    hasError: streetisInvalid,
    isValid: streetIsvalid,
    valueOnBlurHandler: streetBlurHandler,
  } = useInput(isNotEmpty);
  const {
    value: landmark,
    valueChangeHandler: landmarkChangehandler,
    hasError: landmarkisInvalid,
    isValid: landmarkIsvalid,
    valueOnBlurHandler: landmarkBlurHandler,
  } = useInput(isNotEmpty);
  const {
    value: postalCode,
    valueChangeHandler: postalCodeChangehandler,
    hasError: postalCodeisInvalid,
    isValid: postalCodeIsvalid,
    valueOnBlurHandler: postalCodeBlurHandler,
  } = useInput(ispostalCodevalid);

  let isFormValid = false;
  const nameInputClasses = nameisInvalid
    ? "form-control invalid"
    : "form-control";
  const streetClasses = streetisInvalid
    ? "form-control invalid"
    : "form-control";
  const landmarkClasses = landmarkisInvalid
    ? "form-control invalid"
    : "form-control";
  const postalCodeClasses = postalCodeisInvalid
    ? "form-control invalid"
    : "form-control";

  if (
    nameIsvalid &&
    streetIsvalid &&
    landmarkIsvalid &&
    postalCodeIsvalid
  ) {
    isFormValid = true;
  }

  const submitHandler = (ev) => {
    ev.preventDefault();
    nameBlurHandler(true);
    streetBlurHandler(true);
    landmarkBlurHandler(true);
    postalCodeBlurHandler(true);
    if (!isFormValid) {
        return;
    }
    console.log({ name, street, landmark, postalCode });
    const userDetails = { name, street, landmark, postalCode };
    props.onCheckout(userDetails)
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Name</label>
        <input
          value={name}
          onChange={nameChangehandler}
          onBlur={nameBlurHandler}
          type="text"
          id="name"
        />
        {nameisInvalid && <p className="error-text">Please enter name</p>}
      </div>
      <div className={streetClasses}>
        <label htmlFor="street">Street</label>
        <input
          value={street}
          onChange={streetChangehandler}
          onBlur={streetBlurHandler}
          type="text"
          id="street"
        />
        {streetisInvalid && <p className="error-text"> Please enter Street</p>}
      </div>
      <div className={landmarkClasses}>
        <label htmlFor="landmark">Landmark</label>
        <input
          value={landmark}
          onChange={landmarkChangehandler}
          onBlur={landmarkBlurHandler}
          type="text"
          id="landmark"
        />
        {landmarkisInvalid && (
          <p className="error-text">Please enter Landmark</p>
        )}
      </div>
      <div className={postalCodeClasses}>
        <label htmlFor="postelcode">Postel Code</label>
        <input
          value={postalCode}
          onChange={postalCodeChangehandler}
          onBlur={postalCodeBlurHandler}
          type="text"
          id="postelcode"
        />
        {postalCodeisInvalid && (
          <p className="error-text">Please enter postcode</p>
        )}
      </div>
      <button onClick={props.onClose} className={classes["button--alt"]}>
        Close
      </button>
      <button type="submit" className={classes.button}>
        Confirm
      </button>
    </form>
  );
};
export default Checkout;
