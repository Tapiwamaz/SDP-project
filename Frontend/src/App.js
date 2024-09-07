import "./App.css";

function App() {
  const fetchEvents = async () => {
    try {
      // Using relative URL
      const response = await fetch("/api/Basic", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Data received from Azure Function:", data);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };
  return (
    <div>
      <div data-testid="title" className="App">
        <h1>We're currently working on a few things :(</h1>
      </div>
      <button onClick={() => fetchEvents()}>fetch</button>
    </div>
  );
}

export default App;
