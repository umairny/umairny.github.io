import { FaPython, FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaJs, FaDatabase, FaPaintBrush, FaVideo, FaCode, FaRocket } from 'react-icons/fa';
import { SiDjango, SiMongodb, SiExpress, SiAdobeillustrator, SiAdobephotoshop, SiAdobepremierepro, SiDocker, SiFigma, SiAdobeindesign, SiCoreldraw, SiCanva, SiD3Dotjs } from 'react-icons/si';

export const ASSET_BASE = import.meta.env.DEV ? '/' : '/portfolio2026/';
export const ROUTER_BASE = import.meta.env.DEV ? '/' : '/portfolio2026';

export const navLinks = [
  { id: 'home', title: 'Home' },
  { id: 'about', title: 'About' },
  { id: 'projects', title: 'Projects' },
  { id: 'contact', title: 'Contact' },
];

export const heroData = {
  name: "Umair Ahmad",
  roles: ["Graphic Designer", "Web Developer"],
  tagline: "I transform ideas into visual reality & functional code."
};

export const aboutData = {
  bio: "I am a passionate creative who loves what I do. With over a decade of experience as a Graphic Designer, I have honed my eye for aesthetics and user experience. Recently, I discovered a new passion for Computer Science, expanding my skillset to include Full Stack Web Development. I now blend my design background with technical expertise to build beautiful, functional web applications.",
  skills: [
    {
      category: "Development",
      items: [
        { name: "HTML", icon: FaHtml5, color: "#FF5733" },
        { name: "CSS", icon: FaCss3Alt, color: "#FF5733" },
        { name: "JavaScript", icon: FaJs, color: "#339933" },
        { name: "React", icon: FaReact, color: "#61DAFB" },
        { name: "Django", icon: SiDjango, color: "#092E20" },
        { name: "Python", icon: FaPython, color: "#3776AB" },
        { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
        { name: "SQL", icon: FaDatabase, color: "#003B57" },
      ]
    },
    {
      category: "Design",
      items: [
        { name: "Illustrator", icon: SiAdobeillustrator, color: "#FF9A00" },
        { name: "Photoshop", icon: SiAdobephotoshop, color: "#31A8FF" },
        { name: "Indesign", icon: SiAdobeindesign, color: "#FF9A00" },
        { name: "Premiere Pro", icon: SiAdobepremierepro, color: "#9999FF" },
        { name: "CorelDRAW", icon: SiCoreldraw, color: "#FF9A00" },
        { name: "3d Max", icon: "icons/3ds.svg", color: "#FF9A00" },
        { name: "Figma", icon: SiFigma, color: "#FF5733" },
        { name: "UI/UX", icon: FaPaintBrush, color: "#FF5733" },
      ]
    }
  ]
};

export const projectsData = [
  {
    id: 1,
    title: "MMBud App",
    category: "Mobile App",
    type: "design & development",
    description: "MMBud is a mobile app that helps users to manage their budget and expenses.",
    stack: ["Expo", "React Native", "SQLite"],
    image: "images/phoneview.png",
    images: [
      "images/phoneview1.png",
      "images/phoneview2.png",
      "images/phoneview3.png",
    ],
    links: {
      demo: "https://play.google.com/store/apps/details?id=com.umairny.MMBud&pcampaignid=web_share",
      youtube: "https://youtu.be/2Hja2bXLmOE?si=Pprx7Va3JYq9y7fX",
      github: "#"
    }
  },
  {
    id: 2,
    title: "Restaurant App",
    category: "MERN Stack",
    type: "development",
    description: "Full-stack restaurant application allowing users to view dishes, favorite items, and leave comments.",
    stack: ["React", "Node.js"],
    image: "images/restaurant01.png",
    images: [
      "images/restaurant01.png",
      "images/restaurant.png",
      "images/restaurant02.png",
      "images/restaurant03.png",
    ],
    links: {
      demo: "https://umairny.github.io/newRestaurant/",
      github: "#",
      youtube: "https://www.youtube.com/watch?v=2951AHT8vmA"
    }
  },
  {
    id: 3,
    title: "Auction App",
    category: "Django",
    type: "development",
    description: "eBay-style auction site where users can list items, bid, and manage watchlists.",
    stack: ["Python", "Django", "SQL"],
    image: "images/auction.png",
    images: [
      "images/auction01.png",
      "images/auction02.png",
      "images/auction03.png"
    ],
    links: {
      youtube: "https://www.youtube.com/watch?v=uiIx6cprAaE",
      demo: "https://umairny.pythonanywhere.com/auctions/",
      github: "https://github.com/umairny/django_py_any_where/tree/main/auctions"
    }
  },
  {
    id: 4,
    title: "Social Network",
    category: "Django",
    type: "development",
    description: "Twitter-like social platform with posting, liking, following, and profile editing features.",
    stack: ["Python", "Django", "JavaScript"],
    image: "images/socialmedia.png",
    images: [
      "images/socialmedia.png",
      "images/socialmedia.png"
    ],
    links: {
      youtube: "https://youtu.be/YGODEgPwSGY?si=NbuE3yx9LvyiJRuO",
      demo: "https://umairny.pythonanywhere.com/network/",
      github: "https://github.com/umairny/django_py_any_where/tree/main/network"
    }
  },
  {
    id: 5,
    title: "E-mail App",
    category: "SPA",
    type: "development",
    description: "Single Page Application simulating an email client (compose, reply, archive) using Django API.",
    stack: ["Django", "JavaScript", "API"],
    image: "images/email.png",
    images: [
      "images/email.png",
      "images/email.png"
    ],
    links: {
      demo: "https://umairny.pythonanywhere.com/mail/",
      github: "https://github.com/umairny/django_py_any_where/tree/main/mail"
    }
  },
  {
    id: 6,
    title: "Modern Brand Identity",
    category: "Branding",
    type: "design",
    description: "Complete visual identity redesign for a tech startup, including logo, color palette, and typography.",
    stack: ["Illustrator", "Photoshop", "Brand Strategy"],
    image: "images/ModernBrandKit.png",
    images: [
      "images/ModernBrandKit.png",
      "images/ModernBrandKit.png",
      "images/ModernBrandKit.png"
    ],
    links: {
      demo: "#", // Link to Behance/Dribbble
      github: "#" // Optional or hidden for design
    }
  },
  {
    id: 7,
    title: "Eco-Friendly App UI",
    category: "UI/UX Design",
    type: "design",
    description: "Mobile application interface design focused on sustainability tracking with clean, green aesthetics.",
    stack: ["Figma", "Prototyping", "User Research"],
    image: "images/ecofredinlyUI.png",
    images: [
      "images/ecofredinlyUI.png",
      "images/ecofredinlyUI.png"
    ],
    links: {
      demo: "#",
      github: "#"
    }
  },
  {
    id: 8,
    title: "Social Media Kit",
    category: "Marketing Design",
    type: "design",
    description: "Set of cohesive social media templates and assets for a lifestyle brand campaign.",
    stack: ["Photoshop", "Canva", "Content Strategy"],
    image: "images/socailmediaKit.png",
    images: [
      "images/socailmediaKit.png",
      "images/socailmediaKit.png"
    ],
    links: {
      demo: "#",
      github: "#"
    }
  }
];

export const contactData = {
  email: "umairny1@gmail.com",
  location: "Queens, NYC, USA",
  social: [
    { name: "Github", url: "https://github.com/umairny" },
    { name: "LinkedIn", url: "#" } // Add if available
  ]
};
