// api key  from TMDB
const api = "api_key=0d7fcb538472b4a248392fdaf9ae8532";

// base url of the site
const base_url = "https://api.themoviedb.org/3";

const banner_url = "https://image.tmdb.org/t/p/original";
const img_url = "https://image.tmdb.org/t/p/w300";

// requests for movies data
const requests = {
  fetchTrending: `${base_url}/trending/all/week?${api}&language=en-US`,
  fetchNetflixOrignals: `${base_url}/discover/tv?${api}&with_networks=213`,
  fetchActionMovies: `${base_url}/discover/movie?${api}&with_genres=28`,
  fetchComedyMovies: `${base_url}/discover/movie?${api}&with_genres=35`,
  fetchHorrorMovies: `${base_url}/discover/movie?${api}&with_genres=27`,
  fetchRomanceMovies: `${base_url}/discover/movie?${api}&with_genres=10749`,
  fetchDocumentaries: `${base_url}/discover/movie?${api}&with_genres=99`,
  searchMovies: (query) => `${base_url}/search/multi?${api}&language=en-US&query=${encodeURIComponent(query)}`,
  getMovieDetails: (movieId) => `${base_url}/movie/${movieId}?${api}&language=en-US`
};

// Global variables
let currentSearchQuery = '';

// Utility functions
function truncate(str, n) {
  return str?.length > n ? str.substr(0, n - 1) + "..." : str;
}

function showLoading(container) {
  container.innerHTML = '<div class="loading"></div>';
}

function showError(container, message) {
  container.innerHTML = `<p style="color: #e50914; text-align: center;">${message}</p>`;
}

// API fetch with error handling
async function fetchWithErrorHandling(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

// Search functionality
function initializeSearch() {
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  const searchResults = document.getElementById('searchResults');

  function performSearch() {
    const query = searchInput.value.trim();
    if (query === '') {
      searchResults.style.display = 'none';
      return;
    }

    currentSearchQuery = query;
    searchResults.style.display = 'block';
    
    const resultsContainer = document.getElementById('searchResultsContainer');
    showLoading(resultsContainer);

    fetchWithErrorHandling(requests.searchMovies(query))
      .then(data => {
        resultsContainer.innerHTML = '';
        if (data.results && data.results.length > 0) {
          data.results.forEach(item => {
            if (item.poster_path || item.backdrop_path) {
              const poster = document.createElement('img');
              poster.className = 'row__poster';
              poster.src = img_url + (item.poster_path || item.backdrop_path);
              poster.alt = item.title || item.name || 'Movie poster';
              poster.addEventListener('click', () => showMovieModal(item));
              resultsContainer.appendChild(poster);
            }
          });
        } else {
          resultsContainer.innerHTML = '<p style="color: white; text-align: center;">No results found for "' + query + '"</p>';
        }
      })
      .catch(error => {
        showError(resultsContainer, 'Failed to search movies. Please try again.');
      });
  }

  searchBtn.addEventListener('click', performSearch);
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      performSearch();
    }
  });

  // Clear search when input is empty
  searchInput.addEventListener('input', (e) => {
    if (e.target.value.trim() === '') {
      searchResults.style.display = 'none';
    }
  });
}
// Modal functionality
function showMovieModal(movie) {
  const modal = document.getElementById('movieModal');
  const modalBody = document.getElementById('modalBody');
  
  // Show modal with loading
  modal.style.display = 'block';
  showLoading(modalBody);

  // If it's a movie, fetch detailed information
  if (movie.id && (movie.title || movie.media_type === 'movie')) {
    fetchWithErrorHandling(requests.getMovieDetails(movie.id))
      .then(details => {
        displayMovieDetails(details);
      })
      .catch(error => {
        // Fallback to basic info if detailed fetch fails
        displayMovieDetails(movie);
      });
  } else {
    // For TV shows or when detailed fetch is not available
    displayMovieDetails(movie);
  }

  function displayMovieDetails(details) {
    const title = details.title || details.name || 'Unknown Title';
    const overview = details.overview || 'No description available.';
    const releaseDate = details.release_date || details.first_air_date || 'Unknown';
    const rating = details.vote_average ? details.vote_average.toFixed(1) : 'N/A';
    const runtime = details.runtime ? `${details.runtime} min` : 'N/A';
    const genres = details.genres ? details.genres.map(g => g.name).join(', ') : 'N/A';
    const posterPath = details.poster_path || details.backdrop_path;

    modalBody.innerHTML = `
      <div class="movie-details">
        ${posterPath ? `<img src="${img_url}${posterPath}" alt="${title}" class="movie-poster-large">` : ''}
        <div class="movie-info">
          <h2 class="movie-title">${title}</h2>
          <p class="movie-overview">${overview}</p>
          <div class="movie-meta">
            <div class="meta-item">
              <span class="meta-label">Release Date</span>
              <span class="meta-value">${releaseDate}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Rating</span>
              <span class="meta-value">⭐ ${rating}/10</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Runtime</span>
              <span class="meta-value">${runtime}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Genres</span>
              <span class="meta-value">${genres}</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

function initializeModal() {
  const modal = document.getElementById('movieModal');
  const closeBtn = document.querySelector('.close');

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
}

// Enhanced movie row creation with click handlers
function createMovieRow(data, title, containerClass = 'row__poster', isLarge = false) {
  const headrow = document.getElementById("headrow");
  const row = document.createElement("div");
  row.className = "row";
  headrow.appendChild(row);

  const titleElement = document.createElement("h2");
  titleElement.className = "row__title";
  titleElement.innerText = title;
  row.appendChild(titleElement);

  const row_posters = document.createElement("div");
  row_posters.className = "row__posters";
  row.appendChild(row_posters);

  data.results.forEach((movie) => {
    const poster = document.createElement("img");
    poster.className = isLarge ? "row__posterLarge" : "row__poster";
    
    const imagePath = isLarge ? movie.poster_path : (movie.backdrop_path || movie.poster_path);
    if (imagePath) {
      poster.src = img_url + imagePath;
      poster.alt = movie.title || movie.name || 'Movie poster';
      poster.addEventListener('click', () => showMovieModal(movie));
      row_posters.appendChild(poster);
    }
  });
}
// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', () => {
  initializeSearch();
  initializeModal();
  loadBanner();
  loadMovieCategories();
});

// Banner loading with error handling
function loadBanner() {
  fetchWithErrorHandling(requests.fetchNetflixOrignals)
    .then((data) => {
      if (data.results && data.results.length > 0) {
        const setMovie = data.results[Math.floor(Math.random() * data.results.length)];
        
        const banner = document.getElementById("banner");
        const banner_title = document.getElementById("banner__title");
        const banner__desc = document.getElementById("banner__description");

        if (setMovie.backdrop_path) {
          banner.style.backgroundImage = "url(" + banner_url + setMovie.backdrop_path + ")";
        }
        banner__desc.innerText = truncate(setMovie.overview || 'No description available.', 150);
        banner_title.innerText = setMovie.name || setMovie.title || 'Featured Content';
      }
    })
    .catch(error => {
      console.error('Failed to load banner:', error);
      // Set a fallback banner
      const banner_title = document.getElementById("banner__title");
      const banner__desc = document.getElementById("banner__description");
      banner_title.innerText = "Welcome to Netflix";
      banner__desc.innerText = "Unlimited movies, TV shows, and more.";
    });
}

// Load all movie categories
function loadMovieCategories() {
  // Netflix Originals
  fetchWithErrorHandling(requests.fetchNetflixOrignals)
    .then(data => createMovieRow(data, "NETFLIX ORIGINALS", "row__posterLarge", true))
    .catch(error => console.error('Failed to load Netflix Originals:', error));

  // Top Rated
  fetchWithErrorHandling(requests.fetchTrending)
    .then(data => createMovieRow(data, "Top Rated", "row__posterLarge", true))
    .catch(error => console.error('Failed to load Top Rated:', error));

  // Action Movies
  fetchWithErrorHandling(requests.fetchActionMovies)
    .then(data => createMovieRow(data, "Action Movies", "row__poster", false))
    .catch(error => console.error('Failed to load Action Movies:', error));

  // Comedy Movies
  fetchWithErrorHandling(requests.fetchComedyMovies)
    .then(data => createMovieRow(data, "Comedy Movies", "row__poster", false))
    .catch(error => console.error('Failed to load Comedy Movies:', error));

  // Horror Movies
  fetchWithErrorHandling(requests.fetchHorrorMovies)
    .then(data => createMovieRow(data, "Horror Movies", "row__poster", false))
    .catch(error => console.error('Failed to load Horror Movies:', error));

  // Romance Movies
  fetchWithErrorHandling(requests.fetchRomanceMovies)
    .then(data => createMovieRow(data, "Romance Movies", "row__poster", false))
    .catch(error => console.error('Failed to load Romance Movies:', error));

  // Documentaries
  fetchWithErrorHandling(requests.fetchDocumentaries)
    .then(data => createMovieRow(data, "Documentaries", "row__poster", false))
    .catch(error => console.error('Failed to load Documentaries:', error));
}
