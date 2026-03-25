import { Text, View } from "react-native";
import { render, screen } from "@testing-library/react-native";

const Greeting = ({ name }) => {
  return (
    <View>
      <Text>Hello {name}!</Text>
    </View>
  );
};

describe("Greeting", () => {
  it("renders a greeting message based on the name prop", () => {
    render(<Greeting name="Kalle" />);

    //screen.debug();

    expect(screen.getByText("Hello Kalle!")).toBeDefined();

    const textObject = screen.getByText("Hello Kalle!");
    //console.log(textObject);
    //console.log(textObject.props.children);

    //expect(textObject).toBeInTheDocument();

    expect(textObject).toHaveTextContent(/Kalle/);
    expect(screen.getByText("Hello Kalle!")).toHaveTextContent(/Kalle/);
  });
});
