# Netflix Clone - Component Documentation

## 🏗️ Component Architecture

This document provides detailed technical documentation for each component in the Netflix clone application.

## 📦 Core Components

### 1. Navigation Component (`nav`)

**Files**: `index.html`, `Netflix_clone-main/index.html`, `home_page.css`

**Structure**:
```html
<div class="nav">
  <div class="nav__left">        <!-- Logo -->
  <div class="nav__center">      <!-- Search Bar -->
  <div class="nav__right">       <!-- User Avatar -->
</div>
```

**CSS Classes**:
- `.nav` - Main navigation container
- `.nav.active` - Navigation with background (on scroll)
- `.nav__left` - Logo container
- `.nav__center` - Search functionality container
- `.nav__right` - User avatar container

**JavaScript Behavior**:
- Transparent background becomes solid on scroll
- Search functionality integrated in center
- Responsive layout changes on mobile

---

### 2. Banner Component (`#banner`)

**Files**: `index.html`, `Netflix_clone-main/index.html`, `script2.js`

**Structure**:
```html
<header id="banner">
  <div id="banner__contents">
    <h1 id="banner__title"></h1>      <!-- Dynamic title -->
    <div id="banner__buttons">         <!-- Action buttons -->
    <p id="banner__description"></p>   <!-- Dynamic description -->
  </div>
  <div id="banner__fadeBottom"></div>  <!-- Gradient overlay -->
</header>
```

**Dynamic Content**:
- Random Netflix original show as background
- Title and description fetched from TMDB API
- Background image changes on each page load

**JavaScript Logic**:
```javascript
fetch(requests.fetchNetflixOrignals)
  .then((res) => res.json())
  .then((data) => {
    const setMovie = data.results[Math.floor(Math.random() * data.results.length - 1)];
    banner.style.backgroundImage = "url(" + banner_url + setMovie.backdrop_path + ")";
    banner__desc.innerText = truncate(setMovie.overview, 150);
    banner_title.innerText = setMovie.name;
  });
```

---

### 3. Search Component (`NetflixSearch` class)

**Files**: `script2.js`, `home_page.css`

**Class Methods**:

#### `constructor()`
- Initializes DOM references
- Sets up event listeners
- Configures search functionality

#### `performSearch()`
- Handles search API calls
- Manages loading states
- Processes search results

#### `displaySearchResults(results, query)`
- Renders search results in grid format
- Handles empty results
- Adds click handlers to results

**API Integration**:
```javascript
const searchUrl = `${base_url}/search/multi?${api}&language=en-US&query=${encodeURIComponent(query)}`;
```

**CSS Classes**:
- `.search-container` - Search input and button container
- `.search-results` - Results overlay container
- `.search-results-grid` - Grid layout for results
- `.search-result-item` - Individual search result item

---

### 4. Movie Modal Component (`MovieModal` class)

**Files**: `script2.js`, `home_page.css`

**Class Methods**:

#### `constructor()`
- Initializes modal DOM references
- Sets up event listeners (close button, ESC key, click outside)

#### `showMovieDetails(movieId, mediaType)`
- Fetches detailed movie/TV show information
- Populates modal with movie data
- Displays modal with animation

#### `populateModal(movie, mediaType)`
- Formats movie data for display
- Handles different data types (movie vs TV show)
- Creates rich information layout

**Modal Structure**:
```html
<div id="movie-modal" class="movie-modal">
  <div class="modal-content">
    <span class="close-modal">&times;</span>
    <h2 id="modal-title" class="modal-title"></h2>
    <div id="modal-rating" class="modal-rating"></div>
    <p id="modal-overview" class="modal-overview"></p>
    <div id="modal-details" class="modal-details"></div>
  </div>
</div>
```

---

### 5. Movie Row Components (`.row`)

**Files**: `script2.js`, `home_page.css`

**Dynamic Generation**:
```javascript
function createMovieRow(endpoint, title, posterClass, imageType) {
  // Creates row container
  // Adds loading state
  // Fetches data from API
  // Generates poster grid
  // Adds click handlers
}
```

**Row Types**:
1. **Netflix Originals** - Large posters (`row__posterLarge`)
2. **Trending Content** - Large posters
3. **Genre Categories** - Standard posters (`row__poster`)

**CSS Classes**:
- `.row` - Main row container
- `.row__title` - Category title
- `.row__posters` - Horizontal scrollable container
- `.row__poster` - Standard poster size
- `.row__posterLarge` - Large poster size

---

## 🎨 Styling System

### Color Scheme
```css
:root {
  --primary-bg: #111;
  --netflix-red: #e50914;
  --text-primary: white;
  --text-secondary: #999;
  --overlay: rgba(0, 0, 0, 0.8);
}
```

### Typography
- **Primary Font**: 'Netflix Sans', sans-serif
- **Heading Sizes**: 3rem (banner), 2rem (modal), 1.5rem (row titles)
- **Body Text**: 0.9rem with 1.5 line-height

### Responsive Breakpoints
```css
/* Mobile */
@media (max-width: 768px) {
  /* Mobile-specific styles */
}
```

---

## 🔧 API Integration

### TMDB API Configuration
```javascript
const api = "api_key=0d7fcb538472b4a248392fdaf9ae8532";
const base_url = "https://api.themoviedb.org/3";
const banner_url = "https://image.tmdb.org/t/p/original";
const img_url = "https://image.tmdb.org/t/p/w300";
```

### Endpoint Mapping
| Component | Endpoint | Purpose |
|-----------|----------|---------|
| Banner | `/discover/tv?with_networks=213` | Netflix originals for banner |
| Netflix Row | `/discover/tv?with_networks=213` | Netflix original shows |
| Trending | `/trending/all/week` | Weekly trending content |
| Action | `/discover/movie?with_genres=28` | Action movies |
| Comedy | `/discover/movie?with_genres=35` | Comedy movies |
| Horror | `/discover/movie?with_genres=27` | Horror movies |
| Romance | `/discover/movie?with_genres=10749` | Romance movies |
| Documentaries | `/discover/movie?with_genres=99` | Documentary movies |
| Search | `/search/multi` | Multi-search across all content |
| Details | `/{media_type}/{id}` | Detailed movie/show information |

---

## 🚀 Performance Considerations

### Image Loading
- **Lazy Loading**: Images load as they become visible
- **Error Handling**: Broken images are hidden automatically
- **Multiple Sizes**: Different image qualities for different uses

### API Optimization
- **Error Boundaries**: Graceful degradation on API failures
- **Loading States**: User feedback during data fetching
- **Caching**: Browser caches API responses

### CSS Performance
- **Efficient Selectors**: Minimal specificity and complexity
- **Hardware Acceleration**: CSS transforms for smooth animations
- **Minimal Reflow**: Optimized layout changes

---

## ♿ Accessibility Features

### Keyboard Navigation
- **ESC Key**: Close modals
- **Enter Key**: Submit search
- **Tab Navigation**: Proper focus order

### Screen Readers
- **Alt Text**: Descriptive alt attributes for all images
- **ARIA Labels**: Proper labeling for interactive elements
- **Semantic HTML**: Meaningful HTML structure

### Visual Accessibility
- **High Contrast**: Good color contrast ratios
- **Focus Indicators**: Clear focus states
- **Responsive Text**: Scalable font sizes

---

## 🔄 Event Handling

### Search Events
```javascript
// Search button click
this.searchButton?.addEventListener('click', () => this.performSearch());

// Enter key in search input
this.searchInput?.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') this.performSearch();
});
```

### Modal Events
```javascript
// Close modal events
this.closeBtn?.addEventListener('click', () => this.hideModal());
this.modal?.addEventListener('click', (e) => {
  if (e.target === this.modal) this.hideModal();
});

// ESC key to close modal
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') this.hideModal();
});
```

### Scroll Events
```javascript
// Navigation background on scroll
window.addEventListener("scroll", function(){
  var nav = document.querySelector(".nav");
  nav.classList.toggle("active", window.scrollY > 0);
});
```

---

## 🧪 Testing Considerations

### Manual Testing Checklist
- [ ] Search functionality works with various queries
- [ ] Modal opens and closes properly
- [ ] Responsive design works on different screen sizes
- [ ] Error states display appropriately
- [ ] Loading states provide user feedback
- [ ] Keyboard navigation functions correctly
- [ ] Images load and handle errors gracefully

### Browser Compatibility
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

## 📝 Maintenance Notes

### Code Organization
- **Modular Structure**: Each component is self-contained
- **Clear Naming**: Descriptive class and function names
- **Documentation**: Comprehensive JSDoc comments
- **Error Handling**: Consistent error boundaries

### Future Enhancements
- Consider implementing virtual scrolling for large datasets
- Add unit tests for JavaScript functions
- Implement service worker for offline functionality
- Add analytics tracking for user interactions

This component documentation serves as a technical reference for developers working on or maintaining the Netflix clone application.