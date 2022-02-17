import { useState, useEffect } from "react";
import { Button } from "../Button/Button";

export type ActionProps = "/" | "x" | "+" | "-" | "AC" | "=";
export type ButtonType = "number" | "action";
export type ButtonListProps = {
  title:
    | ActionProps
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
    if (typeof totalResult === "number") {
      setCurrentValue(totalResult);
    }
  }, [totalResult]);

  const resultHandler = () => {
    if (valueA === "" || valueB === "" || action === undefined) return;

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
        setTotalResult(0);
    }
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
      } else if (value.title === ("/" || "x" || "+" || "-")) {
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
