import { useState, useEffect } from "react";
import { Button } from "../Button/Button";

export type ActionProps = "/" | "x" | "+" | "-" | "AC" | "=";
export type NumberList =
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9";
export type ButtonType = "number" | "action";
export type ButtonListProps = {
  title: ActionProps | NumberList;
  type: ButtonType;
};

const buttonsList: ButtonListProps[] = [
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

export const Calculator = (): JSX.Element => {
  const [valueA, setValueA] = useState("");
  const [valueB, setValueB] = useState("");
  const [action, setAction] = useState<ActionProps>();
  const [totalResult, setTotalResult] = useState<number>();
  const [currentValue, setCurrentValue] = useState<number>(0);

  useEffect(() => {
    if (valueA === "") {
      setCurrentValue(0);
    } else if (valueB === "") {
      setCurrentValue(parseInt(valueA));
    } else {
      setCurrentValue(parseInt(valueB));
    }
  }, [valueA, valueB]);

  useEffect(() => {
    if (totalResult !== undefined) {
      setCurrentValue(totalResult);
    }
  }, [totalResult]);

  const resultHandler = () => {
    if (valueA === "" || valueB === "" || action === undefined) return;

    // We never reseted the A and B values so when we choose second action it always adds up to B string value, and A value stays the same. This way, after choosing action "=" the total result becomes A, and B is empty.

    let result = 0;

    switch (action) {
      case "/":
        result = Number(valueA) / Number(valueB);
        setTotalResult(result);
        setValueA(result.toString());
        break;
      case "x":
        result = Number(valueA) * Number(valueB);
        setTotalResult(result);
        setValueA(result.toString());
        break;
      case "+":
        result = Number(valueA) + Number(valueB);
        setTotalResult(result);
        setValueA(result.toString());
        break;
      case "-":
        result = Number(valueA) - Number(valueB);
        setTotalResult(result);
        setValueA(result.toString());
        break;
      default:
        setTotalResult(0);
    }
    setValueB("");
  };

  const onButtonClickHandler = (value: ButtonListProps) => {
    if (value.type === "number") {
      if (action === undefined) {
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
        setAction(undefined);
        setTotalResult(0);
      } else if (
        value.title === "/" ||
        value.title === "x" ||
        value.title === "+" ||
        value.title === "-"
      ) {
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
