import "./App.css";
import AutoComplete from "./components/AutoComplete";

function App() {
  const staticData = [
    "apple",
    "banana",
    "berrl",
    "orange",
    "grape",
    "mango",
    "melon",
    "berry",
    "peach",
    "cherry",
    "plum",
  ];
  // API functionton to get the result nby passing the query
  const fetchSuggestion = async (query) => {
    const response = await fetch(
      `https://dummyjson.com/recipes/search?q=${query}`
    );

    if (!response.ok) {
      throw new Error("Network response was not okay");
    }

    const result = await response.json();

    return result.recipes;
  };
  return (
    <>
      <div>
        <h1>AutoComplete Type</h1>

        <div>
          <AutoComplete
            placeholder={"Enter Recipe"}
            // staticData={staticData}
            fetchSuggestion={fetchSuggestion}
            dataKey={"name"}
            customLoading={<>Loading Recipes...</>}
            onSelect={(res) => console.log(res)}
            onChange={(input) => {}}
            onBlur={() => {}}
            onFocus={() => {}}
            customStyles={{}}
          />
        </div>
      </div>
    </>
  );
}

export default App;
