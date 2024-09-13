const {
  doc,
  query,
  where,
  getDoc,
  getDocs,
  collection,
  updateDoc,
} = require("firebase/firestore");
const { app } = require("@azure/functions"); // used to define and manage the functions within the Azure Function App.

const { db } = require("../firebase_config"); // Import the db instance from the config f

app.http("GetUser", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    context.log(`Http function processed request for url "${request.url}"`);

    try {
      const userID = request.params.userID;
      context.log(userID); // assuming the userId is passed as a query parameter
      const usersRef = collection(db, "Users");
      const q = query(usersRef, where("userID", "==", userID));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        context.log("User document data:", userDoc.data());
        return {
          status: 200,
          body: JSON.stringify({ ...userDoc.data(), id: userDoc.id }),
          headers: {
            "Content-Type": "application/json",
          },
        };
      } else {
        return {
          status: 404,
          body: "User not found",
        };
      }
    } catch (error) {
      context.log("Error getting user document:", error);
      return {
        status: 500,
        body: "Internal Server Error",
      };
    }
  },
});
app.http("Rating", {
  methods: ["PUT"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    context.log(`Http function processed request for url "${request.url}"`);

    try {
      let body = "";
      for await (const chunk of request.body) {
        body += chunk;
      }

      const charCodes = body.split(",").map(Number);
      const jsonString = String.fromCharCode(...charCodes);
      context.log(`Received body: ${jsonString}`);

      const data = JSON.parse(jsonString);
      const userID = data.userID;
      let rating = parseInt(data.rating);
      let rates = parseInt(data.rates);
      let EventOrgRating = parseInt(data.EventOrgRating);
      
      context.log(`Received userID: ${userID}`);
      context.log(`Received rating: ${rating}`);
      context.log(`Received EventOrgRating: ${EventOrgRating}`);
      context.log(`Received rates: ${rates}`);

      const newRating = (EventOrgRating * rates + rating) / (rates + 1);

      // Uncomment the following lines to update the user's rating in the database
      const usersRef = collection(db, "Users");
      const q = query(usersRef, where("userID", "==", userID));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userRef = doc(db, "Users", userDoc.id);
        await updateDoc(userRef, {
          rating: newRating,
          Rates: rates+1, // assuming 'rates' is defined somewhere in your code
        });

        return {
          status: 200,
          body: "Rating updated successfully",
        };
      } else {
        return {
          status: 404,
          body: "User not found",
        };
      }
    } catch (error) {
      context.log("Error updating user rating:", error);
      return {
        status: 500,
        body: "Internal Server Error",
      };
    }
  },
});
