# Contributing Guide

Thank you for your interest in contributing to the Netflix Clone project! This guide will help you get started.

## 📋 Prerequisites

Before contributing, ensure you have:
- Basic knowledge of HTML, CSS, and JavaScript
- Understanding of REST APIs
- A TMDB API key (see [API_GUIDE.md](API_GUIDE.md))
- A text editor or IDE
- Git for version control

## 🚀 Getting Started

### 1. Fork and Clone
```bash
# Fork the repository on GitHub
# Then clone your fork
git clone https://github.com/YOUR_USERNAME/netflix.git
cd netflix
```

### 2. Set Up Development Environment
```bash
# No build tools required - it's a vanilla JavaScript project
# Simply open in your preferred editor
code .  # VS Code
# or
vim .   # Vim
# or any other editor
```

### 3. Run Locally
```bash
# Option 1: Python
python -m http.server 8000

# Option 2: Node.js
npx http-server

# Option 3: PHP
php -S localhost:8000

# Then visit http://localhost:8000
```

### 4. Configure API
- Get your TMDB API key from [themoviedb.org](https://www.themoviedb.org/settings/api)
- Replace the API key in `Netflix_clone-main/script2.js`

## 🛠️ Development Guidelines

### Code Style

#### JavaScript
```javascript
// Use modern ES6+ syntax
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
  }
};

// Use descriptive variable names
const movieContainer = document.getElementById('movieContainer');

// Add error handling
function handleApiError(error) {
  console.error('API Error:', error);
  // Show user-friendly message
}
```

#### CSS
```css
/* Use consistent naming conventions */
.movie-card {
  /* Use CSS custom properties when possible */
  background-color: var(--primary-color);
  
  /* Mobile-first approach */
  width: 100%;
}

@media (min-width: 768px) {
  .movie-card {
    width: 300px;
  }
}
```

#### HTML
```html
<!-- Use semantic HTML -->
<section class="movie-section">
  <h2 class="section-title">Action Movies</h2>
  <div class="movie-grid" role="grid">
    <!-- Movie items -->
  </div>
</section>

<!-- Include alt text for images -->
<img src="movie-poster.jpg" alt="Movie title - poster">
```

### File Structure
```
netflix/
├── README.md
├── API_GUIDE.md
├── FEATURES.md
├── CONTRIBUTING.md
├── index.html                 # Welcome page
└── Netflix_clone-main/
    ├── index.html            # Main application
    ├── home_page.css         # Styles
    ├── script2.js            # JavaScript logic
    └── images/
        ├── logo.png
        └── avatar.jpeg
```

## 🎯 How to Contribute

### 1. Choose an Issue
- Look for issues labeled `good first issue` or `help wanted`
- Check the [FEATURES.md](FEATURES.md) for enhancement ideas
- Create a new issue if you have an idea

### 2. Create a Branch
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/issue-description
```

### 3. Make Changes
- Follow the coding guidelines above
- Test your changes thoroughly
- Ensure responsive design works
- Check for console errors

### 4. Test Your Changes
```bash
# Test in different browsers
# Test responsive design
# Test API functionality
# Test error scenarios
```

### 5. Commit Your Changes
```bash
git add .
git commit -m "feat: add movie search functionality"
# Use conventional commit messages:
# feat: new feature
# fix: bug fix
# docs: documentation
# style: formatting
# refactor: code restructure
# test: adding tests
```

### 6. Push and Create PR
```bash
git push origin feature/your-feature-name
# Then create a Pull Request on GitHub
```

## 🐛 Bug Reports

When reporting bugs, include:
- **Browser and version**
- **Steps to reproduce**
- **Expected behavior**
- **Actual behavior**
- **Screenshots** (if applicable)
- **Console errors** (if any)

### Bug Report Template
```markdown
**Bug Description**
A clear description of the bug.

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior**
What should happen.

**Actual Behavior**
What actually happens.

**Environment**
- Browser: Chrome 90.0
- OS: Windows 10
- Device: Desktop
```

## ✨ Feature Requests

For new features, include:
- **Problem statement**
- **Proposed solution**
- **Alternative solutions**
- **Mockups/wireframes** (if applicable)

### Feature Request Template
```markdown
**Feature Description**
A clear description of the feature.

**Problem**
What problem does this solve?

**Solution**
Detailed description of the proposed solution.

**Alternatives**
Other solutions you've considered.

**Additional Context**
Screenshots, mockups, or other context.
```

## 🎨 Design Contributions

### UI/UX Improvements
- Follow Netflix's design language
- Maintain dark theme consistency
- Ensure accessibility standards
- Test on multiple screen sizes

### Assets
- Use high-quality images
- Optimize file sizes
- Provide multiple resolutions
- Include proper attribution

## 🧪 Testing

### Manual Testing Checklist
- [ ] Homepage loads correctly
- [ ] Search functionality works
- [ ] Movie details modal opens/closes
- [ ] Responsive design on mobile
- [ ] All links work
- [ ] Images load properly
- [ ] Error handling works
- [ ] No console errors

### Browser Testing
Test in:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 📚 Resources

### Learning Resources
- [MDN Web Docs](https://developer.mozilla.org/) - HTML, CSS, JavaScript
- [TMDB API Documentation](https://developers.themoviedb.org/3)
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

### Tools
- [Can I Use](https://caniuse.com/) - Browser compatibility
- [Validator.w3.org](https://validator.w3.org/) - HTML validation
- [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools)

## 🤝 Code of Conduct

### Be Respectful
- Be kind and respectful to all contributors
- Welcome newcomers and help them learn
- Focus on constructive feedback

### Be Collaborative
- Share knowledge and resources
- Help others solve problems
- Review pull requests thoughtfully

## 📞 Getting Help

If you need help:
1. Check the documentation first
2. Search existing issues
3. Create a new issue with your question
4. Be specific about your problem

## 🎉 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes for significant contributions
- Special mentions for outstanding help

Thank you for contributing to make this project better! 🚀