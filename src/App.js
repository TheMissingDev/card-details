import "./App.css";
import cardFront from "./interactive-card-details-form-main/images/bg-card-front.png";
import cardBack from "./interactive-card-details-form-main/images/bg-card-back.png";
import circleIcon from "./interactive-card-details-form-main/images/card-logo.svg";
import completeIcon from "./interactive-card-details-form-main/images/icon-complete.svg";
import { useState } from "react";

function App() {
  const [cardHolderName, setCardHolderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpMM, setCardExpMM] = useState("");
  const [cardExpYY, setCardExpYY] = useState("");
  const [cardCVC, setCardCVC] = useState("");
  const [isError, setIsError] = useState(false);
  const [id, setId] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const splitCardNumber = (cardNumber) => {
    cardNumber = cardNumber.replace(/\D/g, "");
    let chunks = cardNumber.match(/.{1,4}/g);
    return chunks ? chunks.join(" ") : "";
  };

  const handleCardNumChange = (e) => {
    setIsClicked(false)
    let input = e.target.value.replace(/\D/g, "");
    if (input.length <= 16) {
      setCardNumber(input);
    }
  };

  const handleNameChange = (e) => {
    setIsClicked(false)

    setCardHolderName(e.target.value);
  };
  const handleMMChange = (e) => {
    setIsClicked(false)

    if (e.target.value.length <= 3 && e.target.value <= 12) {
      setCardExpMM(e.target.value);
    }
  };
  const handleYYChange = (e) => {
    setIsClicked(false)

    if (e.target.value.length <= 2) {
      setCardExpYY(e.target.value);
    }
  };
  const handleCVCChange = (e) => {
    setIsClicked(false)
    if (e.target.value.length <= 3) {
      setCardCVC(e.target.value);
    }
  };
  const handleClick = () => {
    setIsClicked(true)
    if (cardHolderName == "" || null) {
      setIsError(true);
      setId(1);
    } else {
      setIsError(false);
    }
    if (cardNumber == "" || null) {
      setIsError(true);
      setId(2);
    } else {
      setIsError(false);
    }
    if ((cardExpMM && cardExpYY == "") || null) {
      setIsError(true);
      setId(3);
    } else {
      setIsError(false);
    }
    if (cardCVC == "" || null) {
      setIsError(true);
      setId(4);
    } else {
      setIsError(false);
    }
  };
  return (
    <>
      <div className="cards-validate">
        <div className="cardFront">
          <img id="card-front" src={cardFront} alt="card-front.svg" />
          <img id="card-icon" src={circleIcon} alt="card-icon.svg" />
          <h2 id="cardNum">
            {cardNumber === ""
              ? "0000 0000 0000 0000"
              : splitCardNumber(cardNumber)}
          </h2>
          <p id="cardHolderName">
            {cardHolderName === "" ? "Jane appleseed" : cardHolderName}
          </p>
          <p id="expDate">
            {cardExpMM === "" && cardExpYY !== ""
              ? `00/${cardExpYY}`
              : cardExpYY === "" && cardExpMM !== ""
              ? `${cardExpMM}/00`
              : cardExpMM === "" && cardExpYY === ""
              ? "00/00"
              : `${cardExpMM}/${cardExpYY}`}
          </p>
        </div>
        <div className="cardBack">
          <img id="card-back" src={cardBack} alt="card-back.svg" />
          <p>{cardCVC === "" ? "000" : cardCVC}</p>
        </div>
        <div className={`card-validate ${!isError && isClicked ? 'hide' : '' }`}>
          <label htmlFor="cardHolderName">CardHolder Name</label> <br />
          <input
            className={`holderInput ${
              cardHolderName == "" && isError ? "error" : ""
            }`}
            type="text"
            value={cardHolderName}
            onChange={handleNameChange}
            placeholder="e.g. Jane Appleseed"
          />
          <br />
          <span className="err">
            {cardHolderName == "" && isError ? "Can't be blank" : ""}
          </span>
          <br />
          <label id="card-num" htmlFor="cardNumber">
            Card Number
          </label>
          <br />
          <input
            className={`cardNum ${cardNumber == "" && isError ? "error" : ""}`}
            type="text"
            id="card-num"
            placeholder="e.g. 1234 5678 9123 0000"
            onChange={handleCardNumChange}
            value={splitCardNumber(cardNumber)}
          />
          <br />
          <span className="err">
            {cardNumber == "" && isError ? "Can't be blank" :  isError && cardNumber.length < 16 ? 'Number must be atleast 16 characters long' : ''}
          </span>
          <br />
          <label id="ExpLabel" htmlFor="ExpLabel">
            Exp. Date (MM/YY)
          </label>
          <label id="cvc" htmlFor="Cvc">
            Cvc
          </label>
          <br />
            <input
              className={`exp ${cardExpMM == "" && isError ? "error" : ""}`}
              type="number"
              value={cardExpMM}
              onChange={handleMMChange}
              id="ExpDate"
              placeholder="MM"
            />
            <input
              className={`exp ${cardExpYY == "" && isError ? "error" : ""}`}
              type="number"
              value={cardExpYY}
              onChange={handleYYChange}
              id="ExpDate"
              placeholder="YY"
            />
            <input
              className={`cardCVC ${cardCVC == "" && isError ? "error" : ""}`}
              type="number"
              value={cardCVC}
              onChange={handleCVCChange}
              id="CVC"
              placeholder="e.g. 123"
            />
            <br />
            <span className="err2">
              {cardCVC == "" && isError ? "Can't be blank" : ""}
            </span>
          <span className="err3">
            {cardExpMM == "" && cardExpYY == "" && isError
              ? "Can't be blank"
              : ""}
          </span>
          <button onClick={handleClick} id="btnConfirm">
            Confirm
          </button>
        </div>
      <div className={`complete ${!isError && isClicked ? 'show' : ''}`}>
        <img src={completeIcon} alt="icon-complete.svg" />
        <h2>THANK YOU!</h2>
        <p>We've added your card details</p>
        <button id="btnContinue">Continue</button>
      </div>
      </div>
    </>
  );
}

export default App;
