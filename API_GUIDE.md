# API Configuration Guide

## TMDB API Setup

This Netflix clone uses The Movie Database (TMDB) API to fetch real movie and TV show data.

### Getting Your API Key

1. **Create a TMDB Account**
   - Visit [TMDB](https://www.themoviedb.org/)
   - Sign up for a free account

2. **Request API Access**
   - Go to [API Settings](https://www.themoviedb.org/settings/api)
   - Request an API key for personal use
   - Fill out the required information

3. **Configure the Application**
   - Open `Netflix_clone-main/script2.js`
   - Replace the API key on line 2:
   ```javascript
   const api = "api_key=YOUR_API_KEY_HERE";
   ```

### API Endpoints Used

| Endpoint | Purpose | Parameters |
|----------|---------|------------|
| `/trending/all/week` | Weekly trending content | `api_key`, `language` |
| `/discover/tv?with_networks=213` | Netflix Originals | `api_key`, `with_networks=213` |
| `/discover/movie?with_genres=X` | Movies by genre | `api_key`, `with_genres` |
| `/search/multi` | Search movies and TV | `api_key`, `query`, `language` |
| `/movie/{movie_id}` | Movie details | `api_key`, `language` |

### Genre IDs

- **Action**: 28
- **Comedy**: 35
- **Horror**: 27
- **Romance**: 10749
- **Documentary**: 99

### API Rate Limits

- **Free Tier**: 1,000 requests per day
- **Paid Tier**: Higher limits available

### Error Handling

The application includes comprehensive error handling for:
- Network failures
- API rate limiting
- Invalid responses
- Missing data fields

### Image URLs

TMDB provides different image sizes:
- **Poster Images**: `w300`, `w500`, `w780`, `original`
- **Backdrop Images**: `w300`, `w780`, `w1280`, `original`

Current configuration uses:
- `w300` for posters
- `original` for hero banners

### Security Note

⚠️ **Important**: The API key is currently exposed in the frontend code. For production use, consider:
- Using environment variables
- Implementing a backend proxy
- Using TMDB's authentication flow