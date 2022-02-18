import { useState, useEffect } from "react";
import { Button } from "../Button/Button";

export type ActionProps = "/" | "x" | "+" | "-" | "AC" | "=";
export type ButtonType = "number" | "action";
export type ButtonListProps = {
  title: ActionProps | number;
  type: ButtonType;
};

const buttonsList: ButtonListProps[] = [
  { title: 7, type: "number" },
  { title: 8, type: "number" },
  { title: 9, type: "number" },
  { title: "/", type: "action" },
  { title: 4, type: "number" },
  { title: 5, type: "number" },
  { title: 6, type: "number" },
  { title: "x", type: "action" },
  { title: 1, type: "number" },
  { title: 2, type: "number" },
  { title: 3, type: "number" },
  { title: "-", type: "action" },
  { title: "AC", type: "action" },
  { title: 0, type: "number" },
  { title: "=", type: "action" },
  { title: "+", type: "action" },
];

export const Calculator = (): JSX.Element => {
  const [valueA, setValueA] = useState<number>();
  const [valueB, setValueB] = useState<number>();
  const [action, setAction] = useState<ActionProps>();
  const [totalResult, setTotalResult] = useState<number>();
  const [currentValue, setCurrentValue] = useState<number>(0);

  useEffect(() => {
    if (valueA === undefined) {
      setCurrentValue(0);
    } else if (valueB === undefined) {
      setCurrentValue(valueA);
    } else {
      setCurrentValue(valueB);
    }
  }, [valueA, valueB]);

  useEffect(() => {
    if (totalResult !== undefined) {
      setCurrentValue(totalResult);
    }
  }, [totalResult]);

  const resultHandlerSwitch = (result: number) => {
    setTotalResult(result);
    setValueA(result);
  };

  const resultHandler = () => {
    // if ([valueA, valueB, action].includes(undefined)) return;
    if (valueA === undefined || valueB === undefined || action === undefined)
      return;

    // We never reseted the A and B values so when we choose second action it always adds up to B string value, and A value stays the same. This way, after choosing action "=" the total result becomes A, and B is empty.

    switch (action) {
      case "/":
        resultHandlerSwitch(valueA / valueB);
        break;
      case "x":
        resultHandlerSwitch(valueA * valueB);
        break;
      case "+":
        resultHandlerSwitch(valueA + valueB);
        break;
      case "-":
        resultHandlerSwitch(valueA - valueB);
        break;
      case undefined:
      default:
        setTotalResult(0);
    }
    setValueB(undefined);
  };

  const onButtonClickHandler = (value: ButtonListProps) => {
    if (value.type === "number") {
      if (action === undefined) {
        setValueA((prev) =>
          Number(
            !!prev
              ? prev.toString() + value.title.toString()
              : value.title.toString()
          )
        );
      } else {
        setValueB((prev) =>
          Number(
            !!prev
              ? prev.toString() + value.title.toString()
              : value.title.toString()
          )
        );
      }
    } else {
      if (value.title === "=") {
        resultHandler();
      } else if (value.title === "AC") {
        setValueA(undefined);
        setValueB(undefined);
        setAction(undefined);
        setTotalResult(0);
      } else if (["+", "-", "/", "x"].includes(value.title.toString())) {
        if (currentValue === 0) {
          setValueA(0);
        }
        setAction(value.title as ActionProps);
      }
    }
  };

  return (
    <div className="calculator container bg-black bg-opacity-40 rounded-md p-4 mx-auto md:w-1/2">
      <h1 className="p-8 text-right text-white text-6xl">{currentValue}</h1>

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
