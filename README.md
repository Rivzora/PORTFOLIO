# Abdul's Portfolio Website

A modern, responsive portfolio website built with **TypeScript**, **Vite**, and modern web technologies.

## ✨ Features

- **🎨 Modern Design**: Clean, professional design with smooth animations
- **📱 Fully Responsive**: Works perfectly on all devices and screen sizes
- **⚡ Fast Performance**: Built with Vite for lightning-fast development and production builds
- **🎪 Smooth Animations**: Uses AOS (Animate On Scroll) for beautiful page transitions
- **✏️ Typewriter Effect**: Dynamic typing animation for hero section
- **📧 Contact Form**: Functional contact form with EmailJS integration
- **🔧 TypeScript**: Full type safety and better development experience
- **🎯 SEO Optimized**: Proper meta tags and semantic HTML structure

## 🛠️ Technologies Used

### Frontend
- **TypeScript** - Type-safe JavaScript
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with custom properties
- **Vite** - Build tool and development server

### Libraries & Plugins
- **AOS** - Animate On Scroll library
- **Typed.js** - Typewriter effect animations
- **EmailJS** - Contact form functionality
- **Font Awesome** - Icons
- **Google Fonts** - Typography (Inter)

### Development Tools
- **PostCSS** - CSS processing
- **Autoprefixer** - Automatic vendor prefixes
- **Vite Legacy Plugin** - Browser compatibility

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 📧 Contact Form Setup

To make the contact form functional, you need to set up EmailJS:

1. **Create an EmailJS account** at [emailjs.com](https://www.emailjs.com/)

2. **Create a service** (Gmail, Outlook, etc.)

3. **Create an email template**

4. **Update the configuration** in `src/main.ts`:
   ```typescript
   // Replace these with your actual EmailJS credentials
   emailjs.init('YOUR_PUBLIC_KEY');
   
   await emailjs.send(
     'YOUR_SERVICE_ID',
     'YOUR_TEMPLATE_ID',
     templateParams
   );
   ```

## 🎨 Customization

### Colors
Update the CSS custom properties in `src/styles/main.css`:
```css
:root {
  --primary-color: #6366f1;
  --secondary-color: #06b6d4;
  --accent-color: #f59e0b;
  /* ... other colors */
}
```

### Content
1. **Personal Information**: Update in `index.html`
2. **Projects**: Modify the projects section in `index.html`
3. **Skills**: Update the skills section with your technologies
4. **About Section**: Customize your bio and stats

### Animations
Customize AOS animations by modifying the `data-aos` attributes in HTML or updating the AOS configuration in `src/main.ts`.

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- IE11+ (with legacy plugin)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Contact

**Abdul** - abdul@example.com

Project Link: [https://github.com/yourusername/portfolio](https://github.com/yourusername/portfolio)

---

⭐ If you found this project helpful, please give it a star!
