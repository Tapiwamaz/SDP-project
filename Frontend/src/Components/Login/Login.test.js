import Login from './Login';

describe('Login', () => {
    it('updates email when user inputs email', () => {
        const { getByText, getByPlaceholderText } = render(<Login />);
        const emailInput = getByPlaceholderText('Email');
        fireEvent.change(emailInput, { target: { value: 'this is' } });
        expect(emailInput.target.value).toBe('this is');
        fireEvent.change(emailInput, { target: { value: 'a test' } });
        expect(emailInput.target.value).toBe('a test');
    });

    it('updates password when user inputs password', () => {
        const { getByText, getByPlaceholderText } = render(<Login />);
        const passwordInput = getByPlaceholderText('Password');
        fireEvent.change(passwordInput, { target: { value: 'this is' } });
        expect(passwordInput.target.value).toBe('this is');
        fireEvent.change(passwordInput, { target: { value: 'a test' } });
        expect(passwordInput.target.value).toBe('a test');
    });

    it('updates error message when fields are empty', () => {
        const { getByText, getByPlaceholderText } = render(<Login />);
        const submitButton = getByText('Login');
        fireEvent.click(submitButton);
        expect(getByText('Please fill in all fields')).toBeInTheDocument();
    });
});