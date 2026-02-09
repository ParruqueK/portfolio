# Kevin Parruque - Portfolio Website

Modern, responsive personal portfolio website showcasing my skills, projects, and experience in web development and IT.

🌐 **Live Website:** https://ParruqueK.github.io/portfolio

## Features

- ✨ Modern, clean design with dark/light mode
- 📱 Fully responsive across all devices
- 🎨 Smooth animations and transitions
- 💼 Project showcase with technology tags
- 📊 Interactive skills visualization
- 📬 Direct contact via email and social media
- ⚡ Fast, optimized performance

## Sections

1. **Hero** - Introduction with name and tagline
2. **About Me** - Professional summary with profile image
3. **Skills** - Programming languages, tools, and soft skills
4. **Projects** - Featured projects with descriptions and links
5. **Experience & Education** - Timeline of education and experience
6. **Contact** - Email and social media links

## Technologies Used

### Frontend
- React 19
- Tailwind CSS
- shadcn/ui components
- React Router
- Lucide React (icons)

### Tools
- Create React App with CRACO
- ESLint for code quality
- Yarn for package management

## Projects Featured

1. **Responsive Portfolio Website** - React, Tailwind CSS, JavaScript
2. **Small Real Estate Website** - HTML5, CSS3, JavaScript
3. **WordPress Website for Electrical Company** - WordPress, PHP, CSS
4. **Small Photography Website** - HTML5, CSS3, JavaScript
5. **Simple Budgeting App** - React, JavaScript, Chart.js
6. **Photo Editing and Posters Design** - Photoshop, Illustrator, Canva

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- Yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ParruqueK/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
yarn install
```

3. Start development server:
```bash
yarn start
```

4. Open http://localhost:3000 in your browser

### Building for Production

```bash
yarn build
```

### Deploying to GitHub Pages

```bash
yarn deploy
```

## Customization

### Update Personal Information
Edit `src/mock.js` to update:
- Personal details (name, email, tagline)
- Skills and proficiency levels
- Projects and technologies
- Experience timeline
- Social media links

### Update Projects
```javascript
// In src/mock.js
export const projects = [
  {
    id: 1,
    title: "Your Project",
    description: "Project description",
    technologies: ["Tech1", "Tech2"],
    liveDemo: "https://demo-link.com",
    github: "https://github.com/username/repo",
    image: "/placeholder-project1.jpg"
  }
];
```

### Change Color Theme
Edit `src/index.css` to modify the color variables:
- Primary color (deep blue)
- Accent color (cyan)
- Background and text colors

## Contact

**Kevin Parruque**
- Email: Kparruque@gmail.com
- LinkedIn: [linkedin.com/in/kevin-parruque-482a66335](https://www.linkedin.com/in/kevin-parruque-482a66335)
- GitHub: [github.com/ParruqueK](https://github.com/ParruqueK)

## License

This project is open source and available for personal use.

## Acknowledgments

- Built with Create React App
- UI components from shadcn/ui
- Icons from Lucide React
- Hosted on GitHub Pages

---

⭐ If you like this portfolio, feel free to star the repository!
