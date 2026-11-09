document.addEventListener('DOMContentLoaded', () => {
  const btnSearch = document.getElementById('btnSearch');
  const btnClear = document.getElementById('btnClear');
  const searchInput = document.getElementById('searchInput');
  const resultsContainer = document.getElementById('resultsContainer');

  let travelData = null;

  // Fetch travel recommendations data
  fetch('./travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {
      travelData = data;
    })
    .catch(error => console.error('Error fetching travel data:', error));

  // Search functionality
  btnSearch.addEventListener('click', handleSearch);

  function handleSearch() {
    if (!travelData) return;
    const query = searchInput.value.trim().toLowerCase();
    resultsContainer.innerHTML = '';

    if (!query) return;

    let matches = [];

    // Check for keyword "beach"
    if (query.includes('beach')) {
      matches = travelData.beaches;
    }
    // Check for keyword "temple"
    else if (query.includes('temple')) {
      matches = travelData.temples;
    }
    // Check for keyword "country" or specific country search
    else if (query.includes('country') || query.includes('australia') || query.includes('japan')) {
      travelData.countries.forEach(country => {
        if (query.includes('country') || country.name.toLowerCase().includes(query)) {
          matches.push(...country.cities);
        }
      });
    }

    displayResults(matches);
  }

  // Display results as cards
  function displayResults(items) {
    if (items.length === 0) {
      resultsContainer.innerHTML = '<p class="no-results">No results found. Try searching for "beach", "temple", or "country".</p>';
      return;
    }

    items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'result-card';
      card.innerHTML = `
        <img src="${item.imageUrl}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <button class="visit-btn">Visit</button>
      `;
      resultsContainer.appendChild(card);
    });
  }

  // Clear functionality
  btnClear.addEventListener('click', () => {
    searchInput.value = '';
    resultsContainer.innerHTML = '';
  });
});
