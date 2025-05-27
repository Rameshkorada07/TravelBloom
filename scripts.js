const resultsDiv = document.getElementById('results');

// Fetch data from the JSON file
let travelData = {};
fetch('travel_recomendations_api.json')
  .then(response => response.json())
  .then(data => travelData = data)
  .catch(error => console.error('Error loading JSON:', error));

// Function to show each result
function showResult(name, imageUrl, description) {
  const div = document.createElement('div');
  div.className = 'result';
  div.innerHTML = `
  <div class="result-box">
    ${imageUrl ? `<img src="${imageUrl}" alt="${name}" />` : ''}
    <h3>${name}</h3>
    ${description ? `<p>${description}</p>` : ''}
    <div class="visit-btn">
      <button>Visit</button>
    </div>
  </div>
`;

  resultsDiv.appendChild(div);
}

// Main search handler function
function handleSearch(query) {
  query = query.trim().toLowerCase();
  resultsDiv.innerHTML = '';

  if (!travelData || Object.keys(travelData).length === 0) return;

  if (query === "temples") {
    travelData.temples.forEach(item => showResult(item.name, item.imageUrl, item.description));
    return;
  }

  if (query === "beaches") {
    travelData.beaches.forEach(item => showResult(item.name, item.imageUrl, item.description));
    return;
  }

  if (query === "countries") {
    travelData.countries.forEach(country => {
     
      country.cities.forEach(city => {
        showResult(city.name, city.imageUrl, city.description);
      });
    });
    return;
  }

  travelData.countries.forEach(country => {
    
    country.cities.forEach(city => {
      if (city.name.toLowerCase().includes(query)) {
        showResult(city.name, city.imageUrl, city.description);
      }
    });
  });

  travelData.temples.forEach(temple => {
    if (temple.name.toLowerCase().includes(query)) {
      showResult(temple.name, temple.imageUrl, temple.description);
    }
  });

  travelData.beaches.forEach(beach => {
    if (beach.name.toLowerCase().includes(query)) {
      showResult(beach.name, beach.imageUrl, beach.description);
    }
  });
}

// Attach to all matching inputs and buttons
document.querySelectorAll('#search-button').forEach(button => {
  button.addEventListener('click', () => {
    const input = button.parentElement.querySelector('#searchInput');
    if (input) handleSearch(input.value);
  });
});

document.querySelectorAll('#clear-button').forEach(button => {
  button.addEventListener('click', () => {
    const input = button.parentElement.querySelector('#searchInput');
    if (input) input.value = '';
    resultsDiv.innerHTML = '';
  });
});

//menu toggle
const menu = document.getElementById('menu-bar');

menu.addEventListener('click', () => {
  const nav = document.getElementById('nav-mid');
  const currentDisplay = getComputedStyle(nav).display;

  if (currentDisplay === 'flex') {
    nav.style.display = 'none'; // hide it
  } else {
    nav.style.display = 'flex'; // show it
  }
});


