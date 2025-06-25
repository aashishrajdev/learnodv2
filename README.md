# Learnod - Interactive Learning Platform (Next.js)

Learnod is a powerful interactive learning platform built with Next.js that combines video tutorials with hands-on coding practice. It features an advanced Monaco Editor integration and real-time code execution capabilities.

## 🚀 Features

### Core Features

- 🎥 **Integrated YouTube Video Player** - Watch tutorials directly in the platform
- 💻 **Advanced Monaco Code Editor** - Professional-grade code editor with syntax highlighting
- 🌓 **Dark/Light Mode** - Toggle between themes for comfortable learning
- 🔄 **Real-time Code Execution** - Run JavaScript/TypeScript code instantly
- 📱 **Responsive Design** - Works seamlessly on all devices
- 🎨 **Beautiful UI** - Modern design with Tailwind CSS

### Enhanced Code Editor Features

- **Multi-language Support**: JavaScript, TypeScript, Python, HTML, JSON, CSS, Markdown
- **Customizable Font Size**: Adjustable from 10px to 24px
- **Line Numbers Toggle**: Show/hide line numbers
- **Code Execution**: Run JavaScript and TypeScript with console output
- **Example Code Templates**: Pre-loaded examples for each language
- **Reset Functionality**: Quickly restore example code
- **Monaco Editor Integration**: Full VS Code-like editing experience
- **Syntax Highlighting**: Advanced syntax highlighting for all supported languages
- **Auto-completion**: IntelliSense support
- **Error Detection**: Real-time error highlighting

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, Custom CSS
- **Code Editor**: Monaco Editor (VS Code engine)
- **Icons**: Emoji-based icons
- **Package Manager**: npm

## 📂 Project Structure

```
my-nextjs-app/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles with Tailwind
│   ├── layout.tsx         # Root layout with navigation
│   ├── page.tsx          # Landing page
│   ├── about/            # About page
│   └── app-page/         # Main learning interface
├── components/           # React components
│   ├── CodeEditor.tsx    # Advanced Monaco Editor component
│   ├── ThemeToggle.tsx   # Dark/light mode toggle
│   └── VideoPlayer.tsx   # YouTube video player
├── constants/            # App constants
│   └── languages.ts      # Supported programming languages
├── services/             # Business logic
│   └── CodeExecutionService.ts # Code execution service
├── styles/              # Custom CSS
│   └── editor.css       # Monaco Editor custom styles
└── public/              # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**:

   ```bash
   git clone <your-repo-url>
   cd learnod-nextjs/my-nextjs-app
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the development server**:

   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:3000`

## 📖 Usage

### Landing Page

- Browse features and supported languages
- Navigate to learning interface or about page

### Learning Interface (`/app-page`)

1. **Video Section**: Enter any YouTube URL to watch tutorials
2. **Code Editor**:
   - Select from 7+ programming languages
   - Use the Monaco Editor with full VS Code features
   - Adjust font size and toggle line numbers
   - Run JavaScript/TypeScript code with instant output
   - Reset to example code anytime

### Code Execution

- **JavaScript/TypeScript**: Full execution with console output
- **HTML**: Validation and preview information
- **JSON**: Parsing validation and object analysis
- **Python**: Information about browser limitations
- **Other Languages**: Syntax highlighting and editing support

## 🎯 Supported Languages

| Language   | Execution     | Features                        |
| ---------- | ------------- | ------------------------------- |
| JavaScript | ✅ Full       | Console output, error handling  |
| TypeScript | ✅ Full       | Type checking, console output   |
| HTML       | ⚠️ Validation | Syntax validation, preview info |
| JSON       | ✅ Parsing    | Validation, object analysis     |
| Python     | ❌ Info       | Syntax highlighting only        |
| CSS        | ❌ Editing    | Syntax highlighting only        |
| Markdown   | ❌ Editing    | Syntax highlighting only        |

## ⚙️ Configuration

### Theme Customization

The app supports dark/light mode switching with persistent storage. Themes are applied globally using Tailwind's dark mode classes.

### Editor Settings

- **Font Size**: 10-24px range
- **Line Numbers**: Toggle on/off
- **Theme**: Automatically syncs with app theme
- **Auto-completion**: Enabled by default
- **Error Detection**: Real-time syntax checking

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Adding New Languages

1. Add language to `constants/languages.ts`
2. Add example code to `CodeEditor.tsx`
3. Add execution logic to `CodeExecutionService.ts`

### Customizing Editor

Modify `styles/editor.css` to customize:

- Editor appearance
- Button styles
- Responsive behavior
- Custom animations

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm run build
# Deploy to Vercel
```

### Other Platforms

The app can be deployed to any platform supporting Next.js:

- Netlify
- AWS Amplify
- DigitalOcean App Platform

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Monaco Editor](https://microsoft.github.io/monaco-editor/) - VS Code editor for the web
- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [React](https://reactjs.org/) - JavaScript library for user interfaces

## 📧 Support

For support, email rajaashish.dev@google.com or open an issue on GitHub.

---

**Happy Learning with Learnod! 🎓**
