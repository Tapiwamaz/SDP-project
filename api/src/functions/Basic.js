// This is a template file on how you should define your functions/ api calls
// This example uses a get to get all the event entries (documents) from the events table (collection)

const { app } = require('@azure/functions'); // used to define and manage the functions within the Azure Function App.

const { db } = require('../firebase_config'); // Import the db instance from the config file

// import the neccessary functions to do what you want to do with the db
// standard functions are getDocs, getDoc , addDoc... check firebase functions to see which you might need
const {collection, getDocs} = require("firebase/firestore")
 
app.http('Basic', {  // this defines the function name e.g localhost:4280/api/Basic (This can be different from the name of the file)
    methods: ['GET'], // this of request methods
    authLevel: 'anonymous', // define the auth level

    handler: async (request, context) => { //actual function operation

        context.log(`Http function processed request for url "${request.url}"`);

        try {
            const eventsRef = collection(db,"Events"); //this is to get a reference to the collection you want to work on 
            const data = await getDocs(eventsRef); //since this function is to get documents from events collection
            context.log(data)
            console.log(data)
            let events = data.docs.map((doc) => ({...doc.data(), eventID: doc.id})); // formatting the output to a usable format string
            context.log(events)
            console.log(events)
            if (events.length === 0) {
                context.log("The collection is empty");
                return { status: 200, body: 'No events found'}
            }

            return {
                status: 200,
                headers: { 'Content-Type': 'application/json' }, // format of response (if this is not specified output will be a string) 
                body: JSON.stringify(events)
            };

        } catch (error) {
            // any other type of error
            context.log('Error getting documents:', error);
            return { status: 500, body: 'Internal Server Error' };
        }
    }
});
