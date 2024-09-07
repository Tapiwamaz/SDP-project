# Setup
<!--  -->
First navigate to your api folder in a terminal and install firebase's node_modules
# `npm install Firebase`
<!--  -->

# Creating an api function
<!--  -->
Inside the functions folder under api/src create a .js file based on the collection you want to work on (if it doens't already exist)
Inside the file create your funtion accoriding to the format shown in Basic.js
Make sure to check the correct spellings of collections in your firebase console
<!--  -->


# Testing your functions with swa and postman
<!--  -->
Once you have created your function, navigate in a terminal to the Frontend folder and  build the project
# `npm run build`
In a terminal (preferrably a git bash terminal) start the swa emulator and connect it to your build and the api directory
# `swa start build --api-location ../api`
Now you should be able to us postman to test you functions.
If an error occurs with the swa command make sure your swa emulator is updated
# `npm install -g @azure/static-web-apps-cli@latest`
### You don't need to run build again to test the functions/ unless you change something from frontend
### You don't need to close or rerun swa because it connects automaticatically to changes in build or in the api folder on save.
<!--  -->

# Using your function in frontend
<!--  -->
You can make a fetch function to your function and call it.
Below is a function template

<!-- const fetchEvents = (arguments) {
    try {
        // Using relative URL
        const response = await fetch('/api/Basic', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Data received from Azure Function:', data);
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
} -->

<!--  -->
