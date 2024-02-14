const apiUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/";

async function searchDictionary() {
  const searchBox = document.getElementById('searchBox');
  const word = searchBox.value;

  // Input validation
  if (!/^[a-zA-Z]+$/.test(word)) {
    alert('Please enter a valid word with only alphabets.');
    return;
  }

  try {
    const response = await fetch(apiUrl + word);
    const data = await response.json();

    // Display data
    displayDictionaryData(data);
  } catch (error) {
    console.error('Error fetching data from the API:', error);
    alert('An error occurred while fetching data. Please try again.');
  }
}

function displayDictionaryData(data) {
  const definitionContainer = document.getElementById('definitionContainer');
  definitionContainer.innerHTML = '';

  data.forEach(entry => {
    // Loop through each entry in the data array

    const partOfSpeech = entry.meanings[0].partOfSpeech;
    // Extract the part of speech from the first meaning of the entry

    const definitions = entry.meanings.map(meaning => meaning.definitions[0].definition);
    // Extract the first definition from each meaning of the entry and create an array of definitions
    // .map() is a function that goes through each item in an array and lets you perform an operation on each item.
    // It goes through each meaning in the entry.meanings array and extracts the first definition of each meaning. 

    const entryHTML = `
          <div>
              <p><strong>Part of Speech:</strong> ${partOfSpeech}</p>
              <!-- Display part of speech -->
              <!--<strong> tag is used to make the text  bold-->
  
              <p><strong>Definitions:</strong></p>
              <!-- Heading for definitions -->
  
              <ul>
                  ${definitions.map(definition => `<li>${definition}</li>`).join('')}
                  <!-- Create an unordered list of definitions -->
              </ul>
          </div>
      `;
    // Create an HTML block with the extracted part of speech and definitions

    definitionContainer.innerHTML += entryHTML;
    // Append the HTML block to the container in the document
  });

}


SearchBox.addEventListener("keydown", (event) => {
  // Check if the key pressed is Enter (key code 13)
  if (event.key === "Enter") {
      checkWeather(SearchBox.value);
  }
});