import styled from 'styled-components';
import { Link } from 'react-router-dom';
import background from '../../Images/background.jpg';


export const ResponsiveBackground = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url(${background});
  background-position: center;
  background-size: cover;   /* Ensures the background image covers the entire area */
  background-repeat: no-repeat;

  display: flex;
  justify-content: center;
  align-items: center;      /* Center the card both horizontally and vertically */
`;


export const ResponsiveDiv = styled.div`
  width: 100%; /* Full width */
  height: 100%; /*Full viewport height */
  background-color: white; /* White background color */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding:10px;

  @media (min-width: 768px) {
    width: 30%;           /* 30% of the viewport width */
    height: fit-content;          /* 80% of the viewport height */
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2); /* Add some shadow for the card */
    border-radius: 15px;  /* Add rounded corners */
    
  }
`;


export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: auto;
  margin: 0px 0;
`;


export const StyledImage = styled.img`
  width: 75%;  /* 75% of the viewport width */
  height: auto; /* height scales automatically */
  margin-top: 0; /* no margin at the top */
  
`;


export const StyledInput = styled.input`
  width: 75%;              /* 75% of the viewport width */
  height: auto;              /* Auto-adjust height */
  padding: 10px;             /* Add some padding inside the input */
  padding-right: 40px; 
  margin: 15px 0;
  border-radius: 15px;       /* Rounded edges */
  border: 1px solid #ccc;    /* Border for better visibility */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Shadow effect */
  font-size: 16px;           /* Set a comfortable font size */
  outline: none;             /* Remove default outline */
  transition: box-shadow 0.3s ease; /* Transition for a smooth effect */

  /* Add a hover effect */
  &:hover {
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.2); /* Increase shadow on hover */
  }

  /* Add a focus effect */
  &:focus {
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.3); /* Further increase shadow on focus */
    border-color: #007bff;  /* Change border color on focus */
  }
`;

export const StyledP = styled.div`
  display: flex;
  justifyContent: space-between;
  align-items: center; 
  width: 81%;              /* 75% of the viewport width */
  height: auto;              /* Auto-adjust height */
  padding: 10px;             /* Add some padding inside the input */
  padding-right: 10px; 
  margin: 15px 0;
  border-radius: 15px;       /* Rounded edges */
  border: 1px solid #ccc;    /* Border for better visibility */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Shadow effect */
  font-size: 16px;           /* Set a comfortable font size */
  outline: none;             /* Remove default outline */
  transition: box-shadow 0.3s ease; /* Transition for a smooth effect */

  /* Add a hover effect */
  &:hover {
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.2); /* Increase shadow on hover */
  }

  /* Add a focus effect */
  &:focus {
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.3); /* Further increase shadow on focus */
    border-color: #007bff;  /* Change border color on focus */
  }
`;


export const StyledButton = styled.button`
  width: 75%;              /* 75% of the viewport width */
  height: auto;              /* Auto-adjust height */
  padding: 10px;             /* Padding inside the button */
  margin: 15px 0;
  background-color: #18336C; /* Darkish blue background */
  color: white;              /* White text */
  border: none;              /* No border */
  border-radius: 15px;       /* Rounded edges */
  font-size: 16px;           /* Font size matching the input */
  cursor: pointer;           /* Pointer cursor on hover */
  transition: background-color 0.3s ease; /* Smooth transition for hover effect */

  &:hover {
    background-color: blue; /* Slightly lighter blue on hover */
  }

  &:active {
    background-color: #1b2733; /* Darker blue when button is pressed */
  }
`;


export const ImageButton = styled.button`
  width: 60px;               /* Set the width of the button */
  height: 60px;              /* Set the height of the button */
  padding: 0;               /* Remove padding */
  border-radius: 50%;       /* Make it circular */
  border: 4px solid transparent; /* Circular outline without stroke */
  background-color: transparent; /* Transparent background */
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3); /* Shadow effect */
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;           /* Pointer cursor on hover */
  transition: box-shadow 0.3s ease; /* Transition for smooth shadow effect */
  margin-bottom: 15px;       /* Margin at the bottom to separate from other elements */
  
  /* Add a hover effect */
  &:hover {
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.4);
  }

  /* Add a focus effect */
  &:focus {
    outline: none;           /* Remove default focus outline */
  }

  img {
    width: 100%;             /* Make image fill the button */
    height: 100%;            /* Make image fill the button */
    border-radius: 50%;     /* Ensure image is circular */
    object-fit: cover;      /* Cover the button area */
  }
`;


export const StyledBoldText = styled.div`
  width: 75%;               /* Same width as input and button */
  font-size: 25px;           /* Match font size */
  font-weight: bold;         /* Bold text */
  text-align: center;        /* Center text */
  margin: 20px 0;            /* Margin to separate from other elements */
`;


export const StyledText = styled.div`
  width: 75%;               /* Same width as input and button */
  font-size: ${(props) => props.size || '20px'};
  text-align: center;        /* Center text */
  margin: 10px 0;            /* Margin to separate from other elements */
`;


export const ClickableText = styled.div`
  width: 85%;               /* Same width as input */
  margin: 20px 0;            /* Vertical margins */
  padding: 20px;             /* Padding for visual spacing */
  text-align: right;          /* Align text to the left */
  color: black;
  font-size: 16px;           /* Same font size as input */
`;


export const StyledLink = styled.a`
  color: #18336C;               /* Default text color */
  text-decoration: none;    /* Remove underline */
  cursor: pointer;          /* Pointer cursor on hover */
`;

export const ErrorMessage = styled.div`
  width: 75%;              /* Same width as input */
  margin-left: auto;         /* Align to the input's left */
  margin-right: auto;        /* Center horizontally */
  margin-top: -10px;         /* Slightly move up to reduce the gap */
  font-size: 14px;           /* Slightly smaller font size for the text */
  color: red; 
  text-align: left;
`;


export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center; /* Align checkbox and text vertically */
  width: 75%;        /* Same width as the input */
  margin: 15px auto;  /* Center horizontally with vertical margin */
`;

// Styled checkbox
export const StyledCheckbox = styled.input.attrs({ type: 'checkbox' })`

  margin-right: 10px; /* Space between checkbox and text */
  width: 20px;        /* Size of the checkbox */
  height: 20px;       /* Size of the checkbox */
`;

// Styled text
export const CheckboxText = styled.label`
  font-size: 16px;    /* Same font size as input */
  color: #333;        /* Text color */
`;

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Overlay = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7);
`;

export const ModalContent = styled.div`
  position: relative;
  padding: 20px;
  background: white;
  border-radius: 8px;
  width: 500px;
  max-width: 90vw;
  max-height: 80vh;
  overflow-y: auto;
  
`;

export const EyeIcon = styled.div`
  position: absolute;
  top: 50%;
  right: 15px;  /* Position inside the input */
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 18px;
  color: #888;
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 75%;
`;

