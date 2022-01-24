import { useMemo, useState } from "react";
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
  const [valueA, setValueA] = useState(null);
  const [valueB, setValueB] = useState(null);
  const [action, setAction] = useState(null);
  const [totalResult, setTotalResult] = useState(0);
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    console.log("valueA", valueA);
    console.log("valueB", valueB);
    console.log("action", action);
  }, [action, valueA, valueB]);

  useEffect(() => {
    if (valueA === null) {
      setCurrentValue(0);
    }

    if (valueB === null) {
      setCurrentValue(valueA);
    }

    if (action !== null) {
      setCurrentValue(totalResult);
    }

  }, [action, totalResult, valueA, valueB]);

  const resultHandler = () => {
    // if (valueA === null || valueB === null || action === null) return;

    if ([valueA, valueB, action].includes(null)) return;

    switch (action) {
      case "/":
        setTotalResult(valueA / valueB);
        break;
      case "x":
        setTotalResult(valueA * valueB);
        break;
      case "+":
        setTotalResult(valueA + valueB);
        break;
      case "-":
        setTotalResult(valueA - valueB);
        break;
      default:
        return 0;
    }
  };

  const onButtonClickHandler = (value) => {
    if (value.type === "number") {
      if (valueA === null || action === null) {
        setValueA(Number(value.title));
      } else {
        setValueB(Number(value.title));
      }
    } else {
      if (value.title === "=") {
        resultHandler();
      } else if (value.title === "AC") {
        setValueA(null);
        setValueB(null);
        setAction(null);
      } else {
        setAction(value.title);
      }
    }
  };

  return (
    <div className="calculator container mx-auto">
      <h1 className="py-8 px-8 text-right text-6xl">{currentValue}</h1>

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
