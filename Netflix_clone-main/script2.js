/**
 * Netflix Clone - JavaScript Configuration and API Integration
 * 
 * This file handles:
 * - TMDB API configuration and endpoints
 * - Dynamic banner content generation
 * - Movie category rows creation
 * - Image loading and display
 */

// TMDB API configuration
const api = "api_key=0d7fcb538472b4a248392fdaf9ae8532";
const base_url = "https://api.themoviedb.org/3";

// Image URLs for different poster sizes
const banner_url = "https://image.tmdb.org/t/p/original";  // High-res for banner backgrounds
const img_url = "https://image.tmdb.org/t/p/w300";         // Medium-res for movie posters

/**
 * API Endpoints Configuration
 * Each endpoint fetches different categories of movies/TV shows
 */
const requests = {
  fetchTrending: `${base_url}/trending/all/week?${api}&language=en-US`,        // Weekly trending content
  fetchNetflixOrignals: `${base_url}/discover/tv?${api}&with_networks=213`,    // Netflix original TV shows
  fetchActionMovies: `${base_url}/discover/movie?${api}&with_genres=28`,       // Action movies (genre ID: 28)
  fetchComedyMovies: `${base_url}/discover/movie?${api}&with_genres=35`,       // Comedy movies (genre ID: 35)
  fetchHorrorMovies: `${base_url}/discover/movie?${api}&with_genres=27`,       // Horror movies (genre ID: 27)
  fetchRomanceMovies: `${base_url}/discover/movie?${api}&with_genres=10749`,   // Romance movies (genre ID: 10749)
  fetchDocumentaries: `${base_url}/discover/movie?${api}&with_genres=99`,      // Documentary movies (genre ID: 99)
};
/**
 * Utility function to truncate long text strings
 * @param {string} str - The string to truncate
 * @param {number} n - Maximum length before truncation
 * @returns {string} Truncated string with ellipsis or original string
 */
function truncate(str, n) {
  return str?.length > n ? str.substr(0, n - 1) + "..." : str;
}

/**
 * BANNER SECTION
 * Fetches Netflix Originals and displays a random show as the main banner
 */
fetch(requests.fetchNetflixOrignals)
  .then((res) => res.json())
  .then((data) => {
    // Select a random movie/show from the results for the banner
    const setMovie = data.results[Math.floor(Math.random() * data.results.length - 1)];

    // Get banner DOM elements
    var banner = document.getElementById("banner");
    var banner_title = document.getElementById("banner__title");
    var banner__desc = document.getElementById("banner__description");

    // Set banner background image and content
    banner.style.backgroundImage = "url(" + banner_url + setMovie.backdrop_path + ")";
    banner__desc.innerText = truncate(setMovie.overview, 150);  // Limit description to 150 chars
    banner_title.innerText = setMovie.name;
  });

/**
 * Creates a movie row section with title and posters
 * @param {string} endpoint - API endpoint to fetch movies from
 * @param {string} title - Display title for the row
 * @param {string} posterClass - CSS class for poster sizing (row__poster or row__posterLarge)
 * @param {string} imageType - Type of image to use ('poster_path' or 'backdrop_path')
 */
function createMovieRow(endpoint, title, posterClass = 'row__poster', imageType = 'backdrop_path') {
  fetch(endpoint)
    .then((res) => res.json())
    .then((data) => {
      // Get the main container for all movie rows
      const headrow = document.getElementById("headrow");
      
      // Create row container
      const row = document.createElement("div");
      row.className = "row";
      if (title === "NETFLIX ORIGINALS") {
        row.classList.add("netflixrow");
      }
      headrow.appendChild(row);

      // Create and add row title
      const titleElement = document.createElement("h2");
      titleElement.className = "row__title";
      titleElement.innerText = title;
      row.appendChild(titleElement);

      // Create posters container
      const row_posters = document.createElement("div");
      row_posters.className = "row__posters";
      row.appendChild(row_posters);

      // Generate poster images for each movie/show
      data.results.forEach((movie) => {
        const poster = document.createElement("img");
        poster.className = posterClass;
        
        // Create unique ID for each poster
        const movieId = movie.name ? movie.name.replace(/\s+/g, "") : movie.id;
        poster.id = movieId;
        
        // Set poster image source
        const imagePath = movie[imageType] || movie.poster_path || movie.backdrop_path;
        poster.src = img_url + imagePath;
        
        // Add alt text for accessibility
        poster.alt = movie.title || movie.name || "Movie poster";
        
        row_posters.appendChild(poster);
      });
    })
    .catch((error) => {
      console.error(`Error fetching ${title}:`, error);
    });
}

/**
 * MOVIE ROWS SECTION
 * Creates all movie category rows using the reusable function
 */

// Netflix Originals - Large posters with poster images
createMovieRow(requests.fetchNetflixOrignals, "NETFLIX ORIGINALS", "row__posterLarge", "poster_path");

// Trending content - Large posters  
createMovieRow(requests.fetchTrending, "Top Rated", "row__posterLarge", "poster_path");

// Movie genre categories - Standard size with backdrop images
createMovieRow(requests.fetchActionMovies, "Action Movies", "row__poster", "backdrop_path");
createMovieRow(requests.fetchComedyMovies, "Comedy Movies", "row__poster", "backdrop_path");
createMovieRow(requests.fetchHorrorMovies, "Horror Movies", "row__poster", "backdrop_path");
createMovieRow(requests.fetchRomanceMovies, "Romance Movies", "row__poster", "backdrop_path");
createMovieRow(requests.fetchDocumentaries, "Documentaries", "row__poster", "backdrop_path");

/**
 * ADVANCED FEATURES
 */

/**
 * Search functionality
 */
class NetflixSearch {
  constructor() {
    this.searchInput = document.getElementById('search-input');
    this.searchButton = document.getElementById('search-button');
    this.searchResults = document.getElementById('search-results');
    this.searchContent = document.getElementById('search-content');
    
    this.initEventListeners();
  }
  
  initEventListeners() {
    // Search button click
    this.searchButton?.addEventListener('click', () => this.performSearch());
    
    // Enter key press in search input
    this.searchInput?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.performSearch();
      }
    });
    
    // Hide search results when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.searchResults?.contains(e.target) && 
          !this.searchInput?.contains(e.target) && 
          !this.searchButton?.contains(e.target)) {
        this.hideSearchResults();
      }
    });
  }
  
  async performSearch() {
    const query = this.searchInput?.value.trim();
    if (!query) return;
    
    this.showLoadingState();
    
    try {
      const searchUrl = `${base_url}/search/multi?${api}&language=en-US&query=${encodeURIComponent(query)}`;
      const response = await fetch(searchUrl);
      const data = await response.json();
      
      this.displaySearchResults(data.results, query);
    } catch (error) {
      console.error('Search error:', error);
      this.showErrorState();
    }
  }
  
  showLoadingState() {
    this.searchContent.innerHTML = '<div class="loading-spinner"></div><p>Searching...</p>';
    this.searchResults.classList.add('active');
  }
  
  showErrorState() {
    this.searchContent.innerHTML = '<p class="no-results">Error occurred while searching. Please try again.</p>';
  }
  
  displaySearchResults(results, query) {
    if (!results || results.length === 0) {
      this.searchContent.innerHTML = `<p class="no-results">No results found for "${query}"</p>`;
      return;
    }
    
    // Filter out results without posters
    const validResults = results.filter(item => item.poster_path || item.backdrop_path);
    
    const resultsHTML = validResults.slice(0, 20).map(item => {
      const title = item.title || item.name;
      const imagePath = item.poster_path || item.backdrop_path;
      const year = item.release_date || item.first_air_date;
      const displayYear = year ? new Date(year).getFullYear() : '';
      
      return `
        <div class="search-result-item" data-id="${item.id}" data-type="${item.media_type || 'movie'}">
          <img src="${img_url}${imagePath}" alt="${title}" class="search-poster">
          <div class="search-info">
            <h3>${title}</h3>
            <p class="search-year">${displayYear}</p>
            <p class="search-overview">${truncate(item.overview || '', 100)}</p>
          </div>
        </div>
      `;
    }).join('');
    
    this.searchContent.innerHTML = `
      <p class="search-count">${validResults.length} results for "${query}"</p>
      <div class="search-results-grid">${resultsHTML}</div>
    `;
    
    // Add click listeners to search results
    this.addSearchResultListeners();
  }
  
  addSearchResultListeners() {
    const searchItems = this.searchContent.querySelectorAll('.search-result-item');
    searchItems.forEach(item => {
      item.addEventListener('click', () => {
        const movieId = item.dataset.id;
        const mediaType = item.dataset.type;
        movieModal.showMovieDetails(movieId, mediaType);
      });
    });
  }
  
  hideSearchResults() {
    this.searchResults?.classList.remove('active');
  }
}

/**
 * Movie Detail Modal functionality
 */
class MovieModal {
  constructor() {
    this.modal = document.getElementById('movie-modal');
    this.closeBtn = document.querySelector('.close-modal');
    this.modalTitle = document.getElementById('modal-title');
    this.modalRating = document.getElementById('modal-rating');
    this.modalOverview = document.getElementById('modal-overview');
    this.modalDetails = document.getElementById('modal-details');
    
    this.initEventListeners();
  }
  
  initEventListeners() {
    // Close modal events
    this.closeBtn?.addEventListener('click', () => this.hideModal());
    this.modal?.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.hideModal();
      }
    });
    
    // ESC key to close modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal?.classList.contains('active')) {
        this.hideModal();
      }
    });
  }
  
  async showMovieDetails(movieId, mediaType = 'movie') {
    try {
      const detailUrl = `${base_url}/${mediaType}/${movieId}?${api}&language=en-US`;
      const response = await fetch(detailUrl);
      const movie = await response.json();
      
      this.populateModal(movie, mediaType);
      this.showModal();
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  }
  
  populateModal(movie, mediaType) {
    const title = movie.title || movie.name;
    const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';
    const overview = movie.overview || 'No overview available.';
    
    // Format release date
    const releaseDate = movie.release_date || movie.first_air_date;
    const formattedDate = releaseDate ? new Date(releaseDate).getFullYear() : 'Unknown';
    
    // Format runtime or episode info
    let runtimeInfo = '';
    if (mediaType === 'movie' && movie.runtime) {
      runtimeInfo = `${movie.runtime} minutes`;
    } else if (mediaType === 'tv' && movie.number_of_seasons) {
      runtimeInfo = `${movie.number_of_seasons} season(s)`;
    }
    
    // Format genres
    const genres = movie.genres ? movie.genres.map(g => g.name).join(', ') : 'Unknown';
    
    this.modalTitle.textContent = title;
    this.modalRating.textContent = `★ ${rating}/10`;
    this.modalOverview.textContent = overview;
    this.modalDetails.innerHTML = `
      <p><strong>Release:</strong> ${formattedDate}</p>
      <p><strong>Genres:</strong> ${genres}</p>
      ${runtimeInfo ? `<p><strong>Duration:</strong> ${runtimeInfo}</p>` : ''}
      ${movie.production_companies?.length ? `<p><strong>Studio:</strong> ${movie.production_companies[0].name}</p>` : ''}
    `;
  }
  
  showModal() {
    this.modal?.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }
  
  hideModal() {
    this.modal?.classList.remove('active');
    document.body.style.overflow = 'auto'; // Restore scrolling
  }
}

/**
 * Creates a movie row section with title and posters
 * @param {string} endpoint - API endpoint to fetch movies from
 * @param {string} title - Display title for the row
 * @param {string} posterClass - CSS class for poster sizing (row__poster or row__posterLarge)
 * @param {string} imageType - Type of image to use ('poster_path' or 'backdrop_path')
 */
function createMovieRowWithFeatures(endpoint, title, posterClass = 'row__poster', imageType = 'backdrop_path') {
  // Create row with loading state first
  const headrow = document.getElementById("headrow");
  if (!headrow) {
    console.error('headrow element not found');
    return;
  }
  
  const row = document.createElement("div");
  row.className = "row";
  if (title === "NETFLIX ORIGINALS") {
    row.classList.add("netflixrow");
  }
  headrow.appendChild(row);

  // Add title
  const titleElement = document.createElement("h2");
  titleElement.className = "row__title";
  titleElement.innerText = title;
  row.appendChild(titleElement);

  // Add loading state
  const loadingDiv = document.createElement("div");
  loadingDiv.className = "row-loading";
  loadingDiv.innerHTML = '<div class="loading-spinner"></div><p>Loading...</p>';
  row.appendChild(loadingDiv);

  fetch(endpoint)
    .then((res) => res.json())
    .then((data) => {
      // Remove loading state
      loadingDiv.remove();
      
      // Create posters container
      const row_posters = document.createElement("div");
      row_posters.className = "row__posters";
      row.appendChild(row_posters);

      // Generate poster images for each movie/show
      data.results.forEach((movie) => {
        const poster = document.createElement("img");
        poster.className = posterClass;
        
        // Create unique ID for each poster
        const movieId = movie.name ? movie.name.replace(/\s+/g, "") : movie.id;
        poster.id = movieId;
        poster.dataset.movieId = movie.id;
        poster.dataset.mediaType = movie.first_air_date ? 'tv' : 'movie';
        
        // Set poster image source
        const imagePath = movie[imageType] || movie.poster_path || movie.backdrop_path;
        poster.src = img_url + imagePath;
        
        // Add alt text for accessibility
        poster.alt = movie.title || movie.name || "Movie poster";
        
        // Add click event for modal (only if movieModal exists)
        if (typeof movieModal !== 'undefined') {
          poster.addEventListener('click', () => {
            movieModal.showMovieDetails(movie.id, poster.dataset.mediaType);
          });
        }
        
        // Add loading error handler
        poster.addEventListener('error', () => {
          poster.style.display = 'none';
        });
        
        row_posters.appendChild(poster);
      });
    })
    .catch((error) => {
      console.error(`Error fetching ${title}:`, error);
      loadingDiv.innerHTML = '<p class="no-results">Failed to load content. Please check your connection.</p>';
    });
}

// Initialize advanced features when DOM is ready
let netflixSearch, movieModal;

document.addEventListener('DOMContentLoaded', function() {
  // Initialize advanced features
  netflixSearch = new NetflixSearch();
  movieModal = new MovieModal();
  
  // Add click handlers to existing posters if they exist
  setTimeout(() => {
    addClickHandlersToExistingPosters();
  }, 2000); // Give time for original posters to load
});

/**
 * Add click handlers to posters created by original functions
 */
function addClickHandlersToExistingPosters() {
  const posters = document.querySelectorAll('.row__poster, .row__posterLarge');
  posters.forEach(poster => {
    if (!poster.hasAttribute('data-click-handler')) {
      poster.setAttribute('data-click-handler', 'true');
      poster.style.cursor = 'pointer';
      
      poster.addEventListener('click', () => {
        // Try to extract movie ID from existing poster ID or create a simple modal
        const movieId = poster.id;
        const mediaType = poster.src.includes('/tv/') ? 'tv' : 'movie';
        
        if (movieModal && movieId) {
          // For existing posters, we'll show a simple info modal
          showSimpleModal(poster.alt || 'Movie Details', 'Click to see more information about this title.');
        }
      });
    }
  });
}

/**
 * Simple modal for existing posters without full movie data
 */
function showSimpleModal(title, message) {
  if (movieModal && movieModal.modal) {
    movieModal.modalTitle.textContent = title;
    movieModal.modalRating.textContent = '';
    movieModal.modalOverview.textContent = message;
    movieModal.modalDetails.innerHTML = '<p>Full details available for new search results.</p>';
    movieModal.showModal();
  }
}
