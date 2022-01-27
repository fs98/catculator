import { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import Button from "../Button/Button";

const buttonsList = [
  { title: "7", type: "number" },
  { title: "8", type: "number" },
  { title: "9", type: "number" },
  { title: "/", type: "action" },
  { title: "4", type: "number" },
  { title: "5", type: "number" },
  { title: "6", type: "number" },
  { title: "x", type: "action" },
  { title: "1", type: "number" },
  { title: "2", type: "number" },
  { title: "3", type: "number" },
  { title: "-", type: "action" },
  { title: "AC", type: "action" },
  { title: "0", type: "number" },
  { title: "=", type: "action" },
  { title: "+", type: "action" },
];

const Calculator = () => {
  const [valueA, setValueA] = useState("");
  const [valueB, setValueB] = useState("");
  const [action, setAction] = useState(null);
  const [totalResult, setTotalResult] = useState(null);
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    console.log("valueA", valueA);
    console.log("valueB", valueB);
    console.log("action", action);
  }, [action, valueA, valueB]);

  useEffect(() => {
    if (valueA === "") {
      setCurrentValue(0);
    } else if (valueB === "") {
      setCurrentValue(valueA);
    } else {
      setCurrentValue(valueB);
    }
  }, [valueA, valueB]);

  useEffect(() => {
    if (totalResult !== null) {
      setCurrentValue(totalResult);
    }
  }, [totalResult]);

  const resultHandler = () => {

    if ([valueA, valueB, action].includes(null)) return;

    switch (action) {
      case "/":
        setTotalResult(Number(valueA) / Number(valueB));
        break;
      case "x":
        setTotalResult(Number(valueA) * Number(valueB));
        break;
      case "+":
        setTotalResult(Number(valueA) + Number(valueB));
        break;
      case "-":
        setTotalResult(Number(valueA) - Number(valueB));
        break;
      default:
        return 0;
    }
  };

  const onButtonClickHandler = (value) => {
    if (value.type === "number") {
      if (action === null) {
        setValueA((prev) => prev.toString() + value.title.toString());
      } else {
        setValueB((prev) => prev.toString() + value.title.toString());
      }
    } else {
      if (value.title === "=") {
        resultHandler();
      } else if (value.title === "AC") {
        setValueA("");
        setValueB("");
        setAction(null);
        setTotalResult(null);
      } else {
        setAction(value.title);
      }
    }
  };

  return (
    <div className="calculator container mx-auto md:w-1/2">
      <h1 className="p-8 text-right text-6xl">{currentValue}</h1>

      <div className="grid grid-cols-4 gap-2">
        {buttonsList.map((btn, index) => {
          return (
            <Button
              key={btn.title}
              type={btn.type}
              onClick={() => onButtonClickHandler(btn)}
            >
              {btn.title}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default Calculator;
