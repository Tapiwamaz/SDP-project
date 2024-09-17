// const { app } = require("@azure/functions"); 
// const { db } = require("../firebase_config"); 
// const { query, getDocs,where, collection } = require("firebase/firestore"); 

// app.http("getUserById", {

//   methods: ["GET"],
//   authLevel: "anonymous", 
//   handler: async (request, context) => {

//     context.log(`Http function processed request for url "${request.url}"`);


//     const userId = request.params.user_id;
//     if (!userId) {
//       return { status: 400, body: "user_id is required" }; 
//     }

//     try {
//       const usersRef = collection(db, "Users");
//       const q = query(usersRef, where("user_id", "==", userId));
//       const querySnapshot = await getDocs(q);

//       if (querySnapshot.empty) {
//         context.log(`No user found with id: ${userId}`);
//         return { status: 404, body: "User not found" }; 
//       }


//       const userDoc = querySnapshot.docs[0];
//       const userData = { ...userDoc.data(), userId: userDoc.id };

//       return {
//         status: 200,
//         headers: { "Content-Type": "application/json" }, 
//         body: JSON.stringify(userData),
//       };
//     } catch (error) {

//       context.log("Error getting user document:", error);
//       return { status: 500, body: "Internal Server Error" };
//     }
//   },
// });

const { app } = require("@azure/functions");
const { db } = require("../firebase_config");
const { query, getDocs, where, collection } = require("firebase/firestore");

app.http("getUserById", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    context.log(`Http function processed request for url "${request.url}"`);

    const userId = request.params.user_id;
    if (!userId) {
      return { status: 400, body: "user_id is required" };
    }

    try {
      const usersRef = collection(db, "Users");
      const q = query(usersRef, where("user_id", "==", userId));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        context.log(`No user found with id: ${userId}`);
        return { status: 404, body: "User not found" };
      }

      const userDoc = querySnapshot.docs[0];
      const userData = { name: userDoc.data().name }; // Only return the 'name'

      return {
        status: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      };
    } catch (error) {
      context.log("Error getting user document:", error);
      return { status: 500, body: "Internal Server Error" };
    }
  },
});
