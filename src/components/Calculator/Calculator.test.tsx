import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import Calculator from "./Calculator";

const buttonsList = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
  "/",
  "x",
  "-",
  "+",
  "=",
  "AC",
];

test("render calculator", () => {
  const { container } = render(<Calculator />);

  const initialValue = screen.getByRole("heading", { name: "0" });
  expect(initialValue).toBeInTheDocument();

  expect(screen.getAllByRole("button")).toHaveLength(16);

  expect(container).toMatchSnapshot();
});

test.each(buttonsList)("renders %p button", (btn) => {
  render(<Calculator />);

  const getButton = screen.getByRole("button", { name: btn });

  expect(getButton).toBeInTheDocument();
});

test("when first clicked on action button", () => {
  render(<Calculator />);

  const result = screen.getByRole("heading", { name: "0" });

  const buttonPlus = screen.getByRole("button", { name: "+" });
  fireEvent.click(buttonPlus);

  expect(result).toBeInTheDocument();
});

test("functionality", () => {
  render(<Calculator />);

  const result = screen.getByRole("heading", { name: "0" });

  const buttonSix = screen.getByRole("button", { name: "6" });
  fireEvent.click(buttonSix);

  expect(result).toHaveTextContent("6");

  const buttonPlus = screen.getByRole("button", { name: "+" });
  fireEvent.click(buttonPlus);

  const buttonThree = screen.getByRole("button", { name: "3" });
  fireEvent.click(buttonThree);

  expect(result).toHaveTextContent("3");

  const buttonEquals = screen.getByRole("button", { name: "=" });
  fireEvent.click(buttonEquals);

  expect(result).toBeInTheDocument();
});

test("clear the calculator", async () => {
  render(<Calculator />);

  const buttonSix = screen.getByRole("button", { name: "6" });
  fireEvent.click(buttonSix);

  const buttonNine = screen.getByRole("button", { name: "9" });
  fireEvent.click(buttonNine);

  const result = screen.queryByText("69");
  expect(result).toBeInTheDocument();

  const buttonAC = screen.getByRole("button", { name: "AC" });
  fireEvent.click(buttonAC);

  await waitFor(() => {
    expect(screen.queryByText("69")).not.toBeInTheDocument();
  });

  expect(result).toHaveTextContent("0");
});
