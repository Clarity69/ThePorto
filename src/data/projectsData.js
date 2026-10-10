export const featuredProjects = [
  {
    id: 1,
    fileName: "shell.qml",
    fileType: "qml",
    title: "MY-SHELL",
    description: "A minimal Hyprland desktop shell built with Quickshell: featuring an app-style Control Center and a dynamic status bar replacing Waybar, with live pywal color integration.",
    points: [
      "Built a feature-rich Control Center with 10 dedicated pages (network, audio, Bluetooth, display, wallpapers, clipboard, and keybinds) interfacing with system CLI tools (nmcli, wpctl, bluetoothctl).",
      "Designed a responsive status bar supporting 7 switchable layouts, swaync notification integration, calendar popup, and real-time IPC control via Hyprland keybinds."
    ],
    tech: ["Quickshell", "QML", "Hyprland", "Shell Script", "pywal"],
    github: "https://github.com/Clarity69/My-Shell"
  },
  {
    id: 2,
    fileName: "App.jsx",
    fileType: "jsx",
    title: "Personal Notes App V2",
    description: "Full-featured personal notes web application integrated with a RESTful API, supporting user authentication, responsive theme switching, and multi-language capabilities.",
    points: [
      "Architected using React Hooks, Context API, and custom hooks for scalable global state management.",
      "Implemented robust user authentication, protected routes, dynamic dark/light mode, and seamless ID/EN localization."
    ],
    tech: ["React", "JavaScript", "REST API", "CSS"],
    github: "https://github.com/Clarity69/personal-notes-app",
    demo: "https://personal-notes-app-mu.vercel.app/"
  },
  {
    id: 3,
    fileName: "SimMahasiswa.blade.php",
    fileType: "php",
    title: "SIM-MAHASISWA",
    description: "A web-based Student Information System built with Laravel to streamline academic profile management, grade recording, and administrative workflows.",
    points: [
      "Developed following Laravel MVC pattern, utilizing Eloquent ORM for database relations and Blade Templating for modular UI components.",
      "Features fine-grained administrative access control, student data operations, and structured record management."
    ],
    tech: ["Laravel", "PHP", "MySQL", "Blade", "Bootstrap"],
    github: "https://github.com/Clarity69/SIM-MAHASISWA"
  },
  {
    id: 4,
    fileName: "compose.yml",
    fileType: "yml",
    title: "homelabbing",
    description: "Personal homelab infrastructure configuration focusing on self-hosted cloud services, containerized deployment, and system resource monitoring.",
    points: [
      "Configured and managed containerized services using Docker Compose for cloud storage and server telemetry.",
      "Documented deployment procedures, network isolation, and maintenance workflows for reproducible local infrastructure."
    ],
    tech: ["Docker", "Linux", "YAML"],
    github: "https://github.com/Clarity69/Homelab"
  },
  {
    id: 5,
    fileName: "main.py",
    fileType: "py",
    title: "Vibe-code",
    description: "An experimental Python repository evaluating AI-assisted development workflows and rapid prototyping patterns.",
    points: [
      "Explores prompt-guided code generation and developer-AI collaborative loops to accelerate software prototyping.",
      "Serves as a sandbox for testing code generation limits, automated refactoring, and AI tooling capabilities in Python."
    ],
    tech: ["Python"],
    github: "https://github.com/Clarity69/Vibe-code"
  },
  {
    id: 6,
    fileName: "form.js",
    fileType: "js",
    title: "website-form-mhs",
    description: "A lightweight dynamic form processing engine built strictly using native browser Web APIs.",
    points: [
      "Implemented client-side dynamic input handling and DOM updates entirely in vanilla JavaScript without framework overhead.",
      "Zero-dependency structure focused on reliable client-side validation and event handling."
    ],
    tech: ["JavaScript", "HTML5", "CSS3"],
    github: "https://github.com/Clarity69/website-form-mhs"
  },
  {
    id: 7,
    fileName: "index.html",
    fileType: "html",
    title: "Porto (Legacy)",
    description: "An earlier iteration of personal developer portfolio designed to master core layout structures and responsive web design.",
    points: [
      "Constructed with semantic HTML5 and vanilla CSS, establishing core layout rules without external frameworks.",
      "Provided the structural layout blueprint and design foundation for the current portfolio iteration."
    ],
    tech: ["HTML5", "CSS3"],
    github: "https://github.com/Clarity69/ThePorto"
  }
];

export const otherProjects = [
  {
    id: 1,
    title: "Pemweb",
    description: "Practicum coursework repository (Praktikum Pemrograman Web) covering foundational web programming exercises.",
    tech: ["HTML", "CSS"],
    github: "https://github.com/Clarity69/Pemweb"
  },
  {
    id: 2,
    title: "dotfiles",
    description: "Personal Linux dotfiles and rice configuration — window manager, terminal and desktop styling setup.",
    tech: ["CSS", "Shell"],
    github: "https://github.com/Clarity69/dotfiles"
  },
  {
    id: 3,
    title: "wofi-config",
    description: "A personal Wofi application-launcher configuration, built for a customized GNOME desktop.",
    tech: ["CSS"],
    github: "https://github.com/Clarity69/wofi-config"
  }
];