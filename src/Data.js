import { FaPython, FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaJs, FaDatabase, FaPaintBrush, FaVideo, FaCode, FaRocket } from 'react-icons/fa';
import { SiDjango, SiMongodb, SiExpress, SiAdobeillustrator, SiAdobephotoshop, SiAdobepremierepro, SiDocker, SiFigma, SiAdobeindesign, SiCoreldraw, SiCanva, SiD3Dotjs } from 'react-icons/si';

// Base paths for production (GitHub Pages subpath)
export const ASSET_BASE = import.meta.env.DEV ? '/' : '/';
export const ROUTER_BASE = import.meta.env.DEV ? '/' : '/';

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


export const contactData = {
  email: "umairny1@gmail.com",
  location: "Queens, NYC, USA",
  social: [
    { name: "Github", url: "https://github.com/umairny" },
    { name: "LinkedIn", url: "#" } // Add if available
  ]
};
