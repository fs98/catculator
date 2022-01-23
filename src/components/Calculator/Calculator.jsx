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
  return (
    <div className="calculator container mx-auto">
      <h1>0</h1>
      <hr />

      <div className="grid grid-cols-4 gap-2">
          {buttonsList.map((btn) => {
            return (
              <Button key={btn.title} type={btn.type}>
                {btn.title}
              </Button>
            );
          })}
      </div>
    </div>
  );
};

export default Calculator;
