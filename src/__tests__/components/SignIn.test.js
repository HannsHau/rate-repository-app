import { LogInForm } from "../../components/SignIn";
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";

describe("SignIn", () => {
  describe("LogInFormContainer", () => {
    it("calls onSubmit function with correct arguments when a valid form is submitted", async () => {
      const onSubmit = jest.fn();
      render(<LogInForm onSubmit={onSubmit} />);
      //screen.debug();
      expect(screen.getByPlaceholderText("username")).toBeOnTheScreen();
      expect(screen.getByPlaceholderText("password")).toBeOnTheScreen();

      fireEvent.changeText(screen.getByPlaceholderText("username"), "kalle");
      fireEvent.changeText(screen.getByPlaceholderText("password"), "password");

      await waitFor(() => {
        fireEvent.press(screen.getByText("Log In"));
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: "kalle",
          password: "password",
        });
      });
    });
  });
});
