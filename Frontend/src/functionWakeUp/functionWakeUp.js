const fetchEvents = async () => {
    try {
      // Using relative URL
      const response = await fetch("https://delightful-forest-0475dad03.5.azurestaticapps.net/api/Basic", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };


// This will wake up the homepage function every minute
setInterval(() => {
    console.log("Great Success")
    fetchEvents();
  },60000)