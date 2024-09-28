import { render, fireEvent } from "@testing-library/react";
import SignIn from "./SignIn.js";

describe("SignIn", () => {
    it("updates email when user inputs email", () => {
        const { getByText, getByPlaceholderText } = render(<SignIn />);
        const emailInput = getByPlaceholderText("Email");
        fireEvent.change(emailInput, { target: { value: "this is" } });
        expect(emailInput.target.value).toBe("this is");
        fireEvent.change(emailInput, { target: { value: "a test" } });
        expect(emailInput.target.value).toBe("a test");
    });

    it("updates name when user inputs name", () => {
        const { getByText, getByPlaceholderText } = render(<SignIn />);
        const nameInput = getByPlaceholderText("Name");
        fireEvent.change(nameInput, { target: { value: "this is" } });
        expect(nameInput.target.value).toBe("this is");
        fireEvent.change(nameInput, { target: { value: "a test" } });
        expect(nameInput.target.value).toBe("a test");
    });

    it("updates password when user inputs password", () => {
        const { getByText, getByPlaceholderText } = render(<SignIn />);
        const passwordInput = getByPlaceholderText("Password");
        fireEvent.change(passwordInput, { target: { value: "this is" } });
        expect(passwordInput.target.value).toBe("this is");
        fireEvent.change(passwordInput, { target: { value: "a test" } });
        expect(passwordInput.target.value).toBe("a test");
    });

    it("updates error message when user inputs invalid email", () => {
        const { getByText, getByPlaceholderText } = render(<SignIn />);
        const emailInput = getByPlaceholderText("Email");
        const submitButton = getByText("Sign In");
        fireEvent.change(emailInput, { target: { value: "this is" } });
        fireEvent.click(submitButton);
        expect(getByText("Email address is invalid")).toBeInTheDocument();
    });

    it("updates error message when fields are empty", () => {
        const { getByText, getByPlaceholderText } = render(<SignIn />);
        const submitButton = getByText("Sign In");
        fireEvent.click(submitButton);
        expect(getByText("Please fill in all fields")).toBeInTheDocument();
    });

    it("updates error message when checkbox is not checked", () => {
        const { getByText, getByPlaceholderText } = render(<SignIn />);
        const emailInput = getByPlaceholderText("Email");
        const nameInput = getByPlaceholderText("Name");
        const passwordInput = getByPlaceholderText("Password");
        fireEvent.change(emailInput, { target: { value: "test@123.com" } });
        fireEvent.change(nameInput, { target: { value: "test" } });
        fireEvent.change(passwordInput, { target: { value: "123456" } });
        const checkbox = document.getElementById("checkbox");
        const submitButton = getByText("Sign In");
        fireEvent.click(submitButton);
        expect(getByText("Please agree to the Terms and Conditions")).toBeInTheDocument();
    });

    it("updates error message when password too weak", () => {
        const { getByText, getByPlaceholderText } = render(<SignIn />);
        const emailInput = getByPlaceholderText("Email");
        const nameInput = getByPlaceholderText("Name");
        const passwordInput = getByPlaceholderText("Password");
        fireEvent.change(emailInput, { target: { value: "test@123.com" } });
        fireEvent.change(nameInput, { target: { value: "test" } });
        fireEvent.change(passwordInput, { target: { value: "12" } });
        const checkbox = document.getElementById("checkbox");
        fireEvent.click(checkbox);
        const submitButton = getByText("Sign In");
        fireEvent.click(submitButton);
        expect(getByText("Password too weak")).toBeInTheDocument();
    });

});