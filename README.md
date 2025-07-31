# Netflix Clone

A responsive Netflix homepage clone built with HTML, CSS, and JavaScript, featuring dynamic content from The Movie Database (TMDB) API.

**Live Demo:** [https://abs6187.github.io/netflix/](https://abs6187.github.io/netflix/)

## 🎬 Features

- **Dynamic Banner**: Random Netflix original shows as featured content
- **Movie Categories**: Netflix Originals, Trending, Action, Comedy, Horror, Romance, Documentaries
- **Responsive Design**: Mobile-friendly layout with smooth hover effects
- **Real-time Data**: Live movie/TV show data from TMDB API
- **Interactive Navigation**: Scroll-based navbar transparency effects

## 🏗️ Project Structure

```
netflix/
├── index.html                 # Main entry point
├── Netflix_clone-main/        # Core application files
│   ├── index.html            # Main application HTML
│   ├── home_page.css         # Styles and responsive design
│   ├── script2.js            # JavaScript functionality & API integration
│   └── images/               # Static assets
│       ├── logo.png         # Netflix logo
│       └── avatar.jpeg      # User avatar placeholder
└── README.md                 # Project documentation
```

## 🧩 Components Documentation

### 1. Navigation Component (`nav`)
- **Location**: Both HTML files, styled in `home_page.css`
- **Functionality**: 
  - Fixed position navigation bar
  - Dynamic background on scroll (transparent → solid black)
  - Netflix logo and user avatar
- **CSS Classes**: `.nav`, `.nav.active`, `.nav__left`, `.nav__right`

### 2. Banner Component (`#banner`)
- **Location**: HTML `#banner` section, JavaScript banner logic
- **Functionality**:
  - Displays random Netflix original as background
  - Dynamic title and description from API
  - Action buttons (Play, My List)
  - Fade gradient overlay
- **CSS Classes**: `#banner`, `#banner__contents`, `#banner__title`, `#banner__description`, `#banner__button`

### 3. Movie Rows Component (`.row`)
- **Location**: Dynamically generated in `script2.js`
- **Functionality**:
  - Horizontal scrollable movie/show posters
  - Different poster sizes for different categories
  - Hover effects with scaling animations
- **CSS Classes**: `.row`, `.row__title`, `.row__posters`, `.row__poster`, `.row__posterLarge`

## 🔧 API Integration

### TMDB API Configuration
- **API Key**: Configured in `script2.js`
- **Base URL**: `https://api.themoviedb.org/3`
- **Image URLs**: 
  - Banner: `https://image.tmdb.org/t/p/original`
  - Posters: `https://image.tmdb.org/t/p/w300`

### API Endpoints Used
| Category | Endpoint | Description |
|----------|----------|-------------|
| Netflix Originals | `/discover/tv?with_networks=213` | TV shows from Netflix |
| Trending | `/trending/all/week` | Trending content this week |
| Action Movies | `/discover/movie?with_genres=28` | Action genre movies |
| Comedy Movies | `/discover/movie?with_genres=35` | Comedy genre movies |
| Horror Movies | `/discover/movie?with_genres=27` | Horror genre movies |
| Romance Movies | `/discover/movie?with_genres=10749` | Romance genre movies |
| Documentaries | `/discover/movie?with_genres=99` | Documentary movies |

## 🎨 Styling Features

### Color Scheme
- **Primary Background**: `#111` (Dark theme)
- **Text Color**: `white`
- **Accent Colors**: Gradients and transparency effects

### Responsive Features
- Custom scrollbar styling
- Smooth hover transitions
- Mobile-friendly navigation
- Flexible movie poster layouts

### Animations
- Navbar transparency on scroll
- Poster hover scaling (`transform: scale(1.08)`)
- Smooth transitions (`transition: all .5s`)

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/Abs6187/netflix.git
   cd netflix
   ```

2. **Open in browser**
   - Open `index.html` in your preferred web browser
   - Or serve locally using a web server for better API functionality

3. **API Setup**
   - The project uses a TMDB API key already configured
   - For production use, obtain your own API key from [TMDB](https://www.themoviedb.org/settings/api)

## 🔧 Customization

### Adding New Movie Categories
1. Add new endpoint to `requests` object in `script2.js`
2. Create fetch function following existing pattern
3. Customize title and poster styling as needed

### Modifying Styles
- Edit `home_page.css` for visual changes
- Responsive breakpoints can be added for different screen sizes
- Color scheme can be modified by updating CSS variables

## 🤝 Contributing

This project was created as part of a web development internship. Feel free to fork and enhance with additional features!

## 📄 License

This project is open source and available under the MIT License.
