export interface Project {
  id: string;
  slug: string;
  title: string;
  category: 'code-drive' | 'code-qr' | 'mau-tui-ban' | 'skill' | 'web-app';
  categoryLabel: string;
  summary: string;
  fullDescription: string;
  challenges: string;
  solution: string;
  coverGradient: string;
  accentColor: string;
  badgeIcon: string;
  tags: string[];
  features: {
    title: string;
    description: string;
  }[];
  techStack: {
    frontend: string[];
    backend?: string[];
    database?: string[];
    tooling: string[];
  };
  metrics: {
    label: string;
    value: string;
  }[];
  liveDemoUrl: string;
  githubUrl: string;
  releaseDate: string;
  version: string;
  clientOrScope: string;
  demoType?: 'qr' | 'palette' | 'code' | 'metric';
}

export interface ColorPalette {
  id: string;
  name: string;
  theme: string;
  price: string;
  downloads: number;
  rating: number;
  description: string;
  colors: {
    name: string;
    hex: string;
    role: string;
  }[];
}

export interface SkillCategory {
  title: string;
  category: string;
  iconName: string;
  skills: {
    name: string;
    level: number;
    years: string;
    highlight: string;
  }[];
}

export interface SkillVideo {
  id: string;
  title: string;
  badge: string;
  duration: string;
  views: string;
  gradientTheme: string;
  animationPattern: 'zoom' | 'slide' | 'glitch' | 'glow' | 'particles';
  accentColor: string;
}

export interface ColorItem1x1 {
  id: string;
  imageUrl: string;
  price: string;
}

export interface DriveItem {
  id: string;
  title: string;
  avatarUrl: string;
  link: string;
  type: 'repo' | 'snippet' | 'template' | 'bundle';
  size: string;
  stars: number;
  downloads: number;
  description?: string;
  language: string;
  updatedAt: string;
}

export const SKILL_VIDEOS: SkillVideo[] = [
  {
    id: 'vid-1',
    title: 'Chuyển cảnh (Seamless Transition FX)',
    badge: 'Chuyển cảnh',
    duration: '0:15',
    views: '14.2k',
    gradientTheme: 'from-emerald-400 via-teal-600 to-slate-950',
    animationPattern: 'zoom',
    accentColor: '#14b8a6',
  },
  {
    id: 'vid-2',
    title: 'Intro (3D Cyber Emerald Opening)',
    badge: 'Intro',
    duration: '0:12',
    views: '28.5k',
    gradientTheme: 'from-cyan-400 via-teal-700 to-indigo-950',
    animationPattern: 'glow',
    accentColor: '#06b6d4',
  },
  {
    id: 'vid-3',
    title: 'Outro (Cinematic Call-To-Action)',
    badge: 'Outro',
    duration: '0:10',
    views: '9.8k',
    gradientTheme: 'from-teal-300 via-emerald-700 to-blue-950',
    animationPattern: 'slide',
    accentColor: '#10b981',
  },
  {
    id: 'vid-4',
    title: 'Visual Effects (Particle Wave)',
    badge: 'Visual FX',
    duration: '0:18',
    views: '32.1k',
    gradientTheme: 'from-teal-500 via-sky-700 to-slate-950',
    animationPattern: 'particles',
    accentColor: '#2dd4bf',
  },
  {
    id: 'vid-5',
    title: 'Typo Motion (Kinetic Glitch)',
    badge: 'Typo Motion',
    duration: '0:14',
    views: '19.4k',
    gradientTheme: 'from-emerald-500 via-cyan-800 to-slate-950',
    animationPattern: 'glitch',
    accentColor: '#34d399',
  },
  {
    id: 'vid-6',
    title: 'Chuyển cảnh Phóng Đại (Whip Pan)',
    badge: 'Chuyển cảnh',
    duration: '0:11',
    views: '22.7k',
    gradientTheme: 'from-cyan-300 via-teal-600 to-navy-950',
    animationPattern: 'zoom',
    accentColor: '#0ea5e9',
  },
];

export const COLOR_ITEMS_1X1: ColorItem1x1[] = [
  {
    id: 'color-1',
    imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80',
    price: '49.000 đ',
  },
  {
    id: 'color-2',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
    price: '79.000 đ',
  },
  {
    id: 'color-3',
    imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80',
    price: '99.000 đ',
  },
  {
    id: 'color-4',
    imageUrl: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=600&auto=format&fit=crop&q=80',
    price: 'Miễn phí',
  },
  {
    id: 'color-5',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80',
    price: '59.000 đ',
  },
  {
    id: 'color-6',
    imageUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&auto=format&fit=crop&q=80',
    price: '89.000 đ',
  },
];

export const INITIAL_DRIVE_RESOURCES: DriveItem[] = [
  {
    id: "drive-1",
    title: "React + Tailwind V4 Production Starter Kit",
    avatarUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80",
    link: "https://drive.google.com/drive/folders/react-starter-kit-v4",
    type: "template",
    size: "2.4 MB",
    stars: 342,
    downloads: 2450,
    description: "Bộ khung khởi tạo dự án chuẩn Enterprise với Router, Zustand, Tailwind v4 và bảo mật CSP.",
    language: "TypeScript",
    updatedAt: "2 ngày trước",
  },
  {
    id: "drive-2",
    title: "QR Vector Engine Core (Zero Dependency)",
    avatarUrl: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=150&auto=format&fit=crop&q=80",
    link: "https://drive.google.com/drive/folders/qr-vector-engine",
    type: "snippet",
    size: "180 KB",
    stars: 580,
    downloads: 4120,
    description: "Thư viện tạo mã QR SVG / Canvas siêu nhẹ, hỗ trợ chèn Logo và định dạng mắt bo góc.",
    language: "JavaScript / TS",
    updatedAt: "1 tuần trước",
  },
  {
    id: "drive-3",
    title: "Full-Stack Express & Realtime Webhook Hub",
    avatarUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=150&auto=format&fit=crop&q=80",
    link: "https://drive.google.com/drive/folders/express-realtime-webhook",
    type: "repo",
    size: "5.1 MB",
    stars: 420,
    downloads: 1980,
    description: "Máy chủ xử lý thanh toán tự động, biến động số dư và webhook thông báo Telegram/Discord tức thì.",
    language: "Node.js / Express",
    updatedAt: "3 tuần trước",
  },
  {
    id: "drive-4",
    title: "Emerald Glassmorphism UI Component Pack",
    avatarUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80",
    link: "https://drive.google.com/drive/folders/emerald-ui-pack",
    type: "bundle",
    size: "8.6 MB",
    stars: 760,
    downloads: 5300,
    description: "Hơn 50 component UI kính mờ và gradient ngọc bích chuẩn Figma & mã React code sẵn dùng.",
    language: "React + CSS",
    updatedAt: "Hôm qua",
  },
];

export const PROFILE_INFO = {
  name: "Nguyễn Minh Khôi",
  handle: "@khoidev.emerald",
  title: "Senior Full-Stack Engineer & Creative UI Specialist",
  avatarUrl: "",
  bio: "Lập trình viên đam mê sáng tạo giao diện web tinh tế, tối ưu trải nghiệm người dùng và xây dựng hệ thống web mở rộng cao. Chuyên sâu React, TypeScript, Node.js và hệ sinh thái Modern Web.",
  location: "Hà Nội / TP. Hồ Chí Minh, Việt Nam",
  email: "khoidev.emerald@gmail.com",
  phone: "+84 988 123 456",
  github: "https://github.com/khoidev",
  zalo: "https://zalo.me/0988123456",
  telegram: "https://t.me/khoidev",
  facebook: "https://facebook.com/khoidev.designer",
  tiktok: "https://tiktok.com/@khoidev",
  stats: [
    { label: "Năm kinh nghiệm", value: "5+" },
    { label: "Dự án đã bàn giao", value: "42+" },
    { label: "Lượt tải & Clone", value: "28k+" },
    { label: "Khách hàng hài lòng", value: "99.4%" },
  ],
};

export const COLOR_PALETTES: ColorPalette[] = [
  {
    id: "emerald-abyss",
    name: "Emerald Abyss (Ngọc Bích Biển Sâu)",
    theme: "Dark & Vibrant",
    price: "Miễn phí",
    downloads: 1420,
    rating: 4.9,
    description: "Bộ màu chuyển sắc đặc trưng với tâm ngọc bích sáng rực rỡ và góc biển sâu thẳm, cực kỳ lý tưởng cho Portfolio & Landing Page công nghệ cao.",
    colors: [
      { name: "Cyan Spark", hex: "#14b8a6", role: "Primary Accent" },
      { name: "Deep Jade", hex: "#0f766e", role: "Secondary Accent" },
      { name: "Teal Twilight", hex: "#0c4a60", role: "Surface Mid" },
      { name: "Ocean Midnight", hex: "#0b2545", role: "Surface Deep" },
      { name: "Abyss Dark", hex: "#030a1c", role: "Background Canvas" },
    ],
  },
  {
    id: "cyber-neon-mint",
    name: "Cyber Mint & Obsidian",
    theme: "Cyberpunk Minimal",
    price: "49.000 đ",
    downloads: 870,
    rating: 4.8,
    description: "Bộ màu xanh bạc hà kết hợp nền đá hắc diện, tạo cảm giác huyền bí, sắc sảo cho Dashboard và Web3 DApps.",
    colors: [
      { name: "Electric Mint", hex: "#22c55e", role: "Highlight Accent" },
      { name: "Aquamarine Glow", hex: "#06b6d4", role: "Secondary Glow" },
      { name: "Dark Slate", hex: "#1e293b", role: "Card Surface" },
      { name: "Obsidian Core", hex: "#090d16", role: "Deep Background" },
      { name: "Pure Polar White", hex: "#f8fafc", role: "Typography Primary" },
    ],
  },
  {
    id: "luxury-aurora-gold",
    name: "Aurora Borealis & Platinum",
    theme: "Luxury Tech",
    price: "79.000 đ",
    downloads: 630,
    rating: 5.0,
    description: "Sự phối hợp giữa màu cực quang bắc cực xanh ngọc ngả tím ánh khói bạc sang trọng, phù hợp sàn thương mại điện tử cao cấp.",
    colors: [
      { name: "Aurora Jade", hex: "#10b981", role: "Hero Accent" },
      { name: "Twilight Violet", hex: "#6366f1", role: "Secondary Gradient" },
      { name: "Platinum Mist", hex: "#e2e8f0", role: "Foreground Clean" },
      { name: "Midnight Quartz", hex: "#0f172a", role: "Base Canvas" },
      { name: "Pure Gold Spark", hex: "#fbbf24", role: "Badge & Focal" },
    ],
  },
  {
    id: "minimalist-zen-teal",
    name: "Zen Ceramic & Teal Tea",
    theme: "Editorial & SaaS",
    price: "Miễn phí",
    downloads: 1150,
    rating: 4.9,
    description: "Tone màu gốm sứ trắng ngà kết hợp xanh lá chè ngọc bích êm dịu, không gây mỏi mắt cho người đọc sách và blog kỹ thuật.",
    colors: [
      { name: "Ceramic Milk", hex: "#f8fafc", role: "Background" },
      { name: "Sage Teal", hex: "#0d9488", role: "Primary Brand" },
      { name: "Deep Moss", hex: "#115e59", role: "Headings" },
      { name: "Warm Pebble", hex: "#cbd5e1", role: "Borders & Lines" },
      { name: "Ink Slate", hex: "#1e293b", role: "Body Copy" },
    ],
  },
];

export const DRIVE_RESOURCES: DriveItem[] = INITIAL_DRIVE_RESOURCES;

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Frontend Engineering",
    category: "frontend",
    iconName: "Layout",
    skills: [
      { name: "React 19 & Next.js", level: 95, years: "5 năm", highlight: "Server Components, Suspense, Hook tối ưu hiệu năng" },
      { name: "TypeScript", level: 92, years: "4 năm", highlight: "Strict Type System, Generics, Type-safe APIs" },
      { name: "Tailwind CSS & Modern CSS", level: 96, years: "5 năm", highlight: "Responsive, Radial Gradients, Complex Animations" },
      { name: "State Management (Zustand, TanStack)", level: 90, years: "4 năm", highlight: "Optimistic updates, Cache invalidation" },
      { name: "Performance & Web Vitals", level: 88, years: "3 năm", highlight: "LCP/CLS tối ưu, Code-splitting, Lazy loading" },
    ],
  },
  {
    title: "Backend & Cloud Architecture",
    category: "backend",
    iconName: "Server",
    skills: [
      { name: "Node.js & Express / NestJS", level: 90, years: "4 năm", highlight: "RESTful, GraphQL, Microservices, Worker queues" },
      { name: "PostgreSQL & Prisma / Drizzle", level: 86, years: "3 năm", highlight: "Index tối ưu hóa, Transactions, Schema migrations" },
      { name: "Redis & Caching Layer", level: 84, years: "3 năm", highlight: "Session store, Rate limiting, Pub/Sub events" },
      { name: "Docker & Cloud Deployments", level: 82, years: "3 năm", highlight: "Container hóa, CI/CD GitHub Actions, Cloud Run" },
    ],
  },
  {
    title: "UI/UX & Design Systems",
    category: "design",
    iconName: "Palette",
    skills: [
      { name: "Figma & Design Tokens", level: 88, years: "4 năm", highlight: "Auto-layout, Components variant, Handoff chuẩn chỉ" },
      { name: "Phối màu & Contrast Ratios", level: 94, years: "4 năm", highlight: "WCAG AA tiêu chuẩn, Dark/Light modes, Gradients" },
      { name: "Micro-interactions & Motion", level: 86, years: "3 năm", highlight: "Framer Motion, Smooth curves, Responsive feedback" },
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    id: "proj-1",
    slug: "code-drive-vault",
    title: "CodeDrive Cloud Vault",
    category: "code-drive",
    categoryLabel: "Code Drive",
    summary: "Nền tảng đồng bộ mã nguồn cá nhân, lưu trữ snippet và thư viện script tự động hóa trên đám mây với tốc độ truy xuất dưới 45ms.",
    fullDescription: "CodeDrive Cloud Vault ra đời nhằm giải quyết vấn đề quản lý các đoạn mã nguồn ngắn, configuration templates và script hữu ích của lập trình viên bị phân mảnh trên nhiều máy tính cá nhân. Hệ thống hỗ trợ đánh tag thông minh, tìm kiếm theo cú pháp regex, xem trước live code với Monaco Editor và chia sẻ link an toàn có mật khẩu.",
    challenges: "Cần đảm bảo đồng bộ hóa hai chiều tức thì, mã hóa đầu cuối và render syntax highlighting siêu mượt trên các tệp mã nguồn kích thước lớn mà không gây đơ giao diện.",
    solution: "Sử dụng Web Workers để phân tích cú pháp mã nguồn, tích hợp thuật toán CRDT cho khả năng chỉnh sửa offline và mã hóa AES-GCM an toàn trước khi đẩy lên cloud.",
    coverGradient: "from-teal-400 via-emerald-600 to-cyan-900",
    accentColor: "#14b8a6",
    badgeIcon: "HardDrive",
    tags: ["React 19", "TypeScript", "Node.js", "Monaco Editor", "AES-256", "Cloud Sync"],
    features: [
      { title: "Đồng bộ đa thiết bị", description: "Lưu trữ tự động mọi snippet, script bash, docker compose và cấu hình dev." },
      { title: "Trình biên tập nhúng", description: "Hỗ trợ tô màu cú pháp cho hơn 60 ngôn ngữ lập trình với phím tắt VS Code." },
      { title: "Chia sẻ bảo mật", description: "Tạo link tải nhanh, đặt thời hạn hết hạn và mã PIN bảo vệ theo từng tệp." },
      { title: "Tìm kiếm ngữ nghĩa", description: "Tìm chính xác hàm, biến hoặc thư viện cần tìm chỉ sau vài phím gõ." },
    ],
    techStack: {
      frontend: ["React 19", "Tailwind CSS v4", "Lucide Icons", "Monaco Editor API"],
      backend: ["Node.js Express", "RESTful API", "JWT & Crypto API"],
      database: ["PostgreSQL", "Redis Cache"],
      tooling: ["Vite", "ESLint", "Docker", "Git Actions"],
    },
    metrics: [
      { label: "Tốc độ tải", value: "< 45ms" },
      { label: "Snippet lưu trữ", value: "18.5k+" },
      { label: "Người dùng kích hoạt", value: "4.2k+" },
      { label: "Độ tin cậy", value: "99.98%" },
    ],
    liveDemoUrl: "https://codedrive.demo.local",
    githubUrl: "https://github.com/khoidev/codedrive-vault",
    releaseDate: "02/2026",
    version: "v2.4.0",
    clientOrScope: "Sản phẩm mã nguồn mở (Open Source)",
    demoType: "code",
  },
  {
    id: "proj-2",
    slug: "matrix-qr-generator",
    title: "MatrixQR Pro - Dynamic Vector Studio",
    category: "code-qr",
    categoryLabel: "Code QR",
    summary: "Bộ công cụ tạo mã QR Code thời gian thực chuẩn vector, hỗ trợ tùy biến màu chuyển sắc, logo thương hiệu và xuất file SVG/PNG độ nét cao.",
    fullDescription: "MatrixQR Pro là giải pháp tạo mã QR code chuyên nghiệp dành cho doanh nghiệp và nhà thiết kế. Thay vì những mã QR đen trắng đơn điệu, MatrixQR cho phép tùy chỉnh màu nền gradient ngọc bích, bo góc mắt định vị, nhúng biểu trưng doanh nghiệp và theo dõi lượt quét thông minh.",
    challenges: "Đảm bảo mã QR sau khi gắn logo và đổi màu gradient vẫn đạt độ tương phản chuẩn ISO/IEC 18004 để mọi camera điện thoại quét thành công 100%.",
    solution: "Tích hợp thuật toán Reed-Solomon với mức sửa lỗi cao nhất (Level H - 30%), tự động phân tích độ tương phản WCAG giữa các mắt điểm và nền để đưa ra cảnh báo thời gian thực.",
    coverGradient: "from-cyan-400 via-teal-600 to-blue-950",
    accentColor: "#06b6d4",
    badgeIcon: "QrCode",
    tags: ["QR Vector", "Canvas API", "SVG Export", "Reed-Solomon", "Client-side", "Instant"],
    features: [
      { title: "Tạo mã QR tức thì", description: "Render mã QR theo từng phím gõ URL, văn bản, WiFi, danh thiếp vCard hoặc tài khoản ngân hàng." },
      { title: "Tùy biến Gradient & Bo góc", description: "Chọn hiệu ứng màu ngọc bích, xanh đại dương hoặc tùy chỉnh từng module điểm." },
      { title: "Xuất SVG & PNG siêu nét", description: "Hỗ trợ độ phân giải lên tới 4000x4000px, phù hợp in ấn bao bì và bảng hiệu quảng cáo." },
      { title: "100% Client-side", description: "Không lưu trữ dữ liệu cá nhân của người dùng trên máy chủ, an toàn tuyệt đối." },
    ],
    techStack: {
      frontend: ["React 19", "HTML5 Canvas API", "SVG Engine", "Tailwind CSS"],
      tooling: ["QRCode Generator Core", "Vite", "TypeScript"],
    },
    metrics: [
      { label: "Mã QR đã tạo", value: "120k+" },
      { label: "Tỉ lệ quét chuẩn", value: "100%" },
      { label: "Định dạng xuất", value: "PNG / SVG" },
      { label: "Độ trễ render", value: "8ms" },
    ],
    liveDemoUrl: "https://matrixqr.demo.local",
    githubUrl: "https://github.com/khoidev/matrix-qr-pro",
    releaseDate: "01/2026",
    version: "v3.1.2",
    clientOrScope: "Công cụ thiết kế & Marketing",
    demoType: "qr",
  },
  {
    id: "proj-3",
    slug: "chroma-store-palettes",
    title: "ChromaStore - Bảng Màu Sáng Tạo & Token Shop",
    category: "mau-tui-ban",
    categoryLabel: "Màu tui bán",
    summary: "Không gian trưng bày và phân phối các bộ bảng màu độc quyền được tinh chỉnh tỉ mỉ theo tâm lý học thị giác và tiêu chuẩn tương phản.",
    fullDescription: "ChromaStore là dự án cá nhân tâm huyết tổng hợp hơn 40 bộ phối màu hiện đại dành cho UI/UX Designers và Frontend Developers. Mỗi palette gồm đầy đủ 5-8 sắc độ từ Background, Surface, Primary Accent tới Muted Borders, kèm sẵn token xuất sang CSS Variables, Tailwind v4 theme và Figma Tokens.",
    challenges: "Tạo công cụ xem trước giao diện thực tế (Live Mockup Preview) để khách hàng thấy được màu sắc hiển thị như thế nào trên ứng dụng thật trước khi quyết định tải về.",
    solution: "Xây dựng khung Preview tương tác đa trạng thái (Dashboard, Mobile card, Hero banner) tự động cập nhật CSS custom properties theo thời gian thực khi click chọn bảng màu.",
    coverGradient: "from-emerald-300 via-teal-500 to-indigo-950",
    accentColor: "#10b981",
    badgeIcon: "Palette",
    tags: ["Design System", "Color Theory", "Tailwind v4", "Figma Tokens", "CSS Variables", "WCAG 2.1"],
    features: [
      { title: "Sao chép 1-Click", description: "Copy mã HEX, RGB, HSL hoặc khai báo CSS variables chỉ bằng một cú nhấp chuột." },
      { title: "Kiểm tra tương phản WCAG", description: "Hiển thị điểm tương phản AA / AAA đảm bảo tính dễ đọc cho người khiếm thị." },
      { title: "Xem trước giao diện thật", description: "Chuyển đổi tức thì theme ứng dụng mẫu để kiểm chứng thẩm mỹ trước khi dùng." },
      { title: "Gói Preset cao cấp", description: "Hỗ trợ gói token chuyên dụng cho fintech, e-commerce, portfolio và dark mode." },
    ],
    techStack: {
      frontend: ["React", "Tailwind CSS", "Colord Library", "Clipboard API"],
      tooling: ["JSON Schema", "Figma Token Exporter", "Vite"],
    },
    metrics: [
      { label: "Bảng màu phát hành", value: "48+" },
      { label: "Lượt copy mã", value: "35k+" },
      { label: "Điểm tương phản", value: "AA / AAA" },
      { label: "Đánh giá sao", value: "4.9 / 5.0" },
    ],
    liveDemoUrl: "https://chromastore.demo.local",
    githubUrl: "https://github.com/khoidev/chroma-palettes-store",
    releaseDate: "12/2025",
    version: "v1.8.0",
    clientOrScope: "Cửa hàng tài nguyên số",
    demoType: "palette",
  },
  {
    id: "proj-4",
    slug: "devskill-radar-matrix",
    title: "DevSkill Radar - Bản Đồ Kỹ Năng & Lộ Trình",
    category: "skill",
    categoryLabel: "Skill",
    summary: "Hệ thống trực quan hóa năng lực công nghệ và tiến trình học tập của kỹ sư phần mềm dưới dạng biểu đồ radar và cây kỹ năng tương tác.",
    fullDescription: "DevSkill Radar giúp các kỹ sư phần mềm và sinh viên IT tự đánh giá trình độ, theo dõi quá trình phát triển năng lực theo thời gian và lập lộ trình vươn lên cấp bậc Senior / Lead. Dự án phân tích hơn 120 tiêu chí kỹ thuật từ Frontend, Backend, Database tới Kỹ năng mềm và kiến trúc hệ thống.",
    challenges: "Xây dựng biểu đồ Radar SVG mượt mà không dùng thư viện nặng, hỗ trợ tương tác hover từng trục kỹ năng và tính toán điểm tổng hợp chuẩn xác.",
    solution: "Sử dụng toán học tọa độ cực (polar coordinates) để tự render SVG path động với CSS transitions, giúp ứng dụng có dung lượng siêu nhẹ dưới 30KB.",
    coverGradient: "from-teal-300 via-cyan-600 to-slate-950",
    accentColor: "#2dd4bf",
    badgeIcon: "Layers",
    tags: ["Data Viz", "SVG Math", "Interactive Radar", "Skill Roadmap", "Tech Assessment"],
    features: [
      { title: "Biểu đồ Radar đa chiều", description: "Trực quan hóa cân bằng giữa kiến trúc hệ thống, code thực chiến và tư duy thiết kế." },
      { title: "Cây công nghệ tương tác", description: "Khám phá các node công nghệ từ căn bản tới nâng cao với tài liệu học tập gợi ý." },
      { title: "Đánh giá benchmark", description: "So sánh kỹ năng với chuẩn mực thị trường tech quốc tế theo từng vị trí." },
      { title: "Xuất CV Portfolio PDF", description: "Tự động xuất bảng tổng hợp năng lực đẹp mắt phục vụ tuyển dụng." },
    ],
    techStack: {
      frontend: ["React 19", "Native SVG Polygons", "Tailwind CSS", "Canvas"],
      tooling: ["TypeScript", "Vite", "PDFKit Generator"],
    },
    metrics: [
      { label: "Kỹ năng phân tích", value: "120+" },
      { label: "Kỹ sư sử dụng", value: "6.8k+" },
      { label: "Dung lượng Bundle", value: "28 KB" },
      { label: "Hiệu năng FPS", value: "60 FPS" },
    ],
    liveDemoUrl: "https://devskill.demo.local",
    githubUrl: "https://github.com/khoidev/devskill-radar",
    releaseDate: "11/2025",
    version: "v2.0.1",
    clientOrScope: "Công cụ đánh giá nhân sự & Career",
    demoType: "metric",
  },
  {
    id: "proj-5",
    slug: "emerald-ui-design-system",
    title: "Emerald Glass UI - Bộ Linh Kiện Web Hiện Đại",
    category: "web-app",
    categoryLabel: "Giao diện Web",
    summary: "Hệ thống Design System mã nguồn mở với phong cách kính mờ, gradient ngọc bích sang trọng và các nút bấm bo góc bất đối xứng độc đáo.",
    fullDescription: "Emerald Glass UI là bộ thư viện hơn 40 component React được thiết kế riêng với bảng màu chuyển sắc ngọc bích - biển sâu. Bộ linh kiện tuân thủ nghiêm ngặt chuẩn tiếp cận WCAG AA, hỗ trợ dark mode bản năng và đi kèm micro-animations phản hồi xúc giác tinh tế.",
    challenges: "Đảm bảo hiệu ứng kính mờ (backdrop-filter: blur) hiển thị mượt mà trên tất cả trình duyệt Safari, Chrome và Firefox mà không gây tụt khung hình.",
    solution: "Sử dụng CSS containment, will-change cho các phần tử animation và tạo lớp fallback mờ nhẹ trên các thiết bị cấu hình thấp.",
    coverGradient: "from-emerald-400 via-teal-700 to-sky-950",
    accentColor: "#14b8a6",
    badgeIcon: "Sparkles",
    tags: ["Design System", "React Components", "Accessibility", "Backdrop Blur", "Storybook"],
    features: [
      { title: "Nút bấm đa phong cách", description: "Bo góc phải mềm mại tạo chiều sâu với hiệu ứng nổi lên khi di chuột." },
      { title: "Thẻ Card kính mờ", description: "Giao diện trong suốt viền hairline tinh xảo, chống chói mắt." },
      { title: "Bộ điều khiển biểu mẫu", description: "Input, Select, Toggle, Modal và Drawer tối ưu cho cả bàn phím lẫn cảm ứng." },
      { title: "TypeScript 100%", description: "Đầy đủ Props interface, tự động gợi ý code trên IDE." },
    ],
    techStack: {
      frontend: ["React 19", "Tailwind CSS", "Motion", "Radix UI Primitives"],
      tooling: ["Storybook", "TypeScript", "NPM Registry"],
    },
    metrics: [
      { label: "Components", value: "45+" },
      { label: "Lượt tải hàng tuần", value: "8.4k" },
      { label: "Hỗ trợ trình duyệt", value: "100%" },
      { label: "Độ tiếp cận", value: "WCAG AA" },
    ],
    liveDemoUrl: "https://emeraldui.demo.local",
    githubUrl: "https://github.com/khoidev/emerald-ui-system",
    releaseDate: "03/2026",
    version: "v1.2.0",
    clientOrScope: "Design System & UI Library",
    demoType: "palette",
  },
  {
    id: "proj-6",
    slug: "realtime-flow-kanban",
    title: "FlowSync - Bảng Công Việc Thời Gian Thực",
    category: "web-app",
    categoryLabel: "Giao diện Web",
    summary: "Ứng dụng cộng tác nhóm hỗ trợ kéo thả thẻ tác vụ mượt mà, phân loại công việc theo sprint và đồng bộ đa người dùng tức thì.",
    fullDescription: "FlowSync là ứng dụng quản lý dự án linh hoạt (Agile Kanban) với giao diện tối giản, hiển thị luồng công việc rõ ràng, hỗ trợ gắn nhãn màu sắc, đính kèm tệp và chat trao đổi trực tiếp trong từng đầu việc.",
    challenges: "Xử lý xung đột dữ liệu khi nhiều thành viên cùng kéo thả thẻ vào một cột tại cùng một mili-giây.",
    solution: "Ứng dụng kiến trúc Optimistic UI với hàng đợi sự kiện (event queue) và đồng bộ qua WebSocket hai chiều.",
    coverGradient: "from-teal-500 via-blue-700 to-slate-900",
    accentColor: "#0ea5e9",
    badgeIcon: "Kanban",
    tags: ["Kanban", "Drag & Drop", "Realtime WebSockets", "Productivity", "Teams"],
    features: [
      { title: "Kéo thả trực quan", description: "Hỗ trợ kéo thả mượt mà trên cả chuột máy tính và màn hình cảm ứng điện thoại." },
      { title: "Đồng bộ tức thời", description: "Mọi thay đổi trạng thái được phản ánh ngay lập tức tới tất cả đồng đội." },
      { title: "Bộ lọc nâng cao", description: "Lọc theo người phụ trách, độ ưu tiên, hạn chót và nhãn công việc." },
      { title: "Chế độ tập trung", description: "Ẩn các yếu tố gây xao nhãng để lập trình viên tập trung giải quyết task chính." },
    ],
    techStack: {
      frontend: ["React", "Tailwind CSS", "HTML5 Drag and Drop API"],
      backend: ["Node.js", "WebSocket / Socket.io"],
      database: ["MongoDB", "Redis"],
      tooling: ["Docker", "Vite"],
    },
    metrics: [
      { label: "Tác vụ hoàn thành", value: "65k+" },
      { label: "Độ trễ đồng bộ", value: "< 25ms" },
      { label: "Đội ngũ hoạt động", value: "320+" },
      { label: "Khả năng mở rộng", value: "10k CCU" },
    ],
    liveDemoUrl: "https://flowsync.demo.local",
    githubUrl: "https://github.com/khoidev/flowsync-kanban",
    releaseDate: "10/2025",
    version: "v2.1.0",
    clientOrScope: "Sản phẩm SaaS năng suất",
    demoType: "metric",
  },
];
