# Netflix Clone 🎬

A responsive Netflix homepage clone built with HTML, CSS, and JavaScript that fetches real movie data from The Movie Database (TMDB) API.

## 🌟 Features

- **Dynamic Movie Content**: Fetches real-time movie data from TMDB API
- **Multiple Categories**: 
  - Netflix Originals
  - Top Rated Movies
  - Action Movies
  - Comedy Movies
  - Horror Movies
  - Romance Movies
  - Documentaries
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Interactive Navigation**: Smooth scrolling effects and dynamic navbar
- **Movie Posters**: High-quality movie posters and backdrop images
- **Hero Banner**: Featured movie banner with description and action buttons

## 🚀 Live Demo

[View Live Demo](https://abs6187.github.io/netflix/)

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **API**: The Movie Database (TMDB) API
- **Hosting**: GitHub Pages
- **Design**: Netflix-inspired UI/UX

## 📋 Prerequisites

Before running this project, make sure you have:

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (for API calls)
- (Optional) A local web server for development

## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Abs6187/netflix.git
   cd netflix
   ```

2. **API Configuration**
   - The project uses TMDB API with a pre-configured API key
   - For development, you can get your own API key from [TMDB](https://www.themoviedb.org/settings/api)
   - Replace the API key in `Netflix_clone-main/script2.js`:
     ```javascript
     const api = "api_key=YOUR_API_KEY_HERE";
     ```

3. **Run Locally**
   - Simply open `index.html` in your browser, or
   - Use a local server:
     ```bash
     # Python 3
     python -m http.server 8000
     
     # Python 2
     python -m SimpleHTTPServer 8000
     
     # Node.js (with http-server)
     npx http-server
     ```
   - Visit `http://localhost:8000`

## 📁 Project Structure

```
netflix/
├── README.md
├── index.html              # Main entry point
└── Netflix_clone-main/
    ├── index.html          # Netflix clone main page
    ├── home_page.css       # Styles and responsive design
    ├── script2.js          # JavaScript logic and API calls
    └── images/
        ├── logo.png        # Netflix logo
        └── avatar.jpeg     # User avatar
```

## 🎯 Usage

1. **Homepage**: Browse through different movie categories
2. **Navigation**: Use the top navigation bar to access different sections
3. **Responsive**: Resize your browser window to see responsive design in action
4. **Scrolling**: Experience smooth scrolling effects and dynamic navigation

## 🔧 API Configuration Details

The project uses The Movie Database (TMDB) API to fetch:
- Trending movies and TV shows
- Netflix Originals
- Movies by genre (Action, Comedy, Horror, Romance, Documentary)

**API Endpoints Used:**
- `/trending/all/week` - Weekly trending content
- `/discover/tv?with_networks=213` - Netflix Originals
- `/discover/movie?with_genres=X` - Movies by genre

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Ideas for Contributions:
- Add search functionality
- Implement movie details modal
- Add user authentication
- Improve accessibility
- Add more movie categories
- Implement dark/light theme toggle

## 🐛 Known Issues

- API key is exposed in the frontend (consider using environment variables)
- No error handling for failed API requests
- Limited offline functionality

## 📝 License

This project is created for educational purposes as part of a web development internship.

## 👨‍💻 Author

Created with ❤️ by [Abs6187](https://github.com/Abs6187)

## 🙏 Acknowledgments

- [Netflix](https://netflix.com) for the design inspiration
- [The Movie Database (TMDB)](https://www.themoviedb.org/) for the movie data API
- Web development community for tutorials and resources
