import { fireEvent, render, screen } from "@testing-library/react";
import Button from "./Button";

const buttonText = "Fake button text";

const onClick = jest.fn();

test("renders the button", () => {
  render(<Button>{buttonText}</Button>);

  const button = screen.getByRole("button", { name: buttonText });

  expect(button).toBeInTheDocument();
  expect(button).toHaveClass("bg-gray-300");
});

test("checks correct styles if type is number", () => {
  render(<Button type="action">{buttonText}</Button>);

  const button = screen.getByRole("button", { name: buttonText });

  expect(button).toHaveClass("bg-orange-500");
});

test("onClick action", () => {
  render(
    <Button type="action" onClick={onClick}>
      {buttonText}
    </Button>
  );

  const button = screen.getByRole("button", { name: buttonText });

  fireEvent.click(button);

  expect(onClick).toHaveBeenCalled();
});
