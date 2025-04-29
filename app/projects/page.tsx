"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fadeUp, stagger } from "@/lib/animations";
import { AnimatedText } from "@/components/animated-text";

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  category: string;
  demoLink?: string;
  sourceLink?: string;
}

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredProjects = selectedCategory === "all"
    ? projects
    : projects.filter(project => project.category === selectedCategory);

  const categories = ["all", ...Array.from(new Set(projects.map(p => p.category)))];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center mb-16">
            <Badge className="mb-4" variant="outline">My Work</Badge>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
              <AnimatedText text="Projects Portfolio" />
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              A showcase of my development projects, highlighting my skills and experiences.
            </p>
          </div>

          <div className="mb-10 flex justify-end">
            <Select 
              value={selectedCategory} 
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <motion.div 
            className="grid md:grid-cols-2 gap-8"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            {filteredProjects.map((project, index) => (
              <motion.div key={project.id} variants={fadeUp}>
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="overflow-hidden h-full hover:shadow-lg transition-all">
      <div className="relative aspect-video">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold">{project.title}</h3>
          <Badge>{project.category}</Badge>
        </div>
        <p className="text-muted-foreground mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag, i) => (
            <Badge key={i} variant="secondary">{tag}</Badge>
          ))}
        </div>
        <p className="text-sm text-muted-foreground mb-6">
          {project.longDescription}
        </p>
        <div className="flex gap-3">
          {project.demoLink && (
            <Button asChild variant="default" size="sm">
              <Link href={project.demoLink} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Live Demo
              </Link>
            </Button>
          )}
          {project.sourceLink && (
            <Button asChild variant="outline" size="sm">
              <Link href={project.sourceLink} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                Source Code
              </Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

const projects: Project[] = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description: "A full-featured online shopping platform",
    longDescription: "Built a comprehensive e-commerce solution with product catalog, cart functionality, secure checkout, and user account management. Implemented responsive design for all device sizes.",
    image: "https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tags: ["Next.js", "TypeScript", "Stripe", "Tailwind CSS"],
    category: "fullstack",
    demoLink: "https://ecommerce-demo.com",
    sourceLink: "https://github.com/shreyanshsalvi/ecommerce",
  },
  {
    id: "2",
    title: "Task Management App",
    description: "Productivity application for managing tasks",
    longDescription: "Developed a task management application with drag-and-drop functionality, team collaboration features, task assignment, deadline tracking, and notification system.",
    image: "https://images.pexels.com/photos/8391656/pexels-photo-8391656.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tags: ["React", "Redux", "Firebase", "Material UI"],
    category: "frontend",
    demoLink: "https://task-manager-demo.com",
    sourceLink: "https://github.com/shreyanshsalvi/task-manager",
  },
  {
    id: "3",
    title: "Financial Dashboard",
    description: "Data visualization for financial metrics",
    longDescription: "Created an interactive dashboard for visualizing financial data with real-time updates, customizable charts, data filtering options, and export functionality.",
    image: "https://images.pexels.com/photos/7376/startup-photos.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tags: ["Vue.js", "D3.js", "Express", "MongoDB"],
    category: "data",
    demoLink: "https://finance-dashboard-demo.com",
    sourceLink: "https://github.com/shreyanshsalvi/finance-dashboard",
  },
  {
    id: "4",
    title: "Social Media API",
    description: "Backend for a social networking platform",
    longDescription: "Designed and implemented a scalable API for a social media platform with features for user authentication, content posting, commenting, following users, and analytics.",
    image: "https://images.pexels.com/photos/2882566/pexels-photo-2882566.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tags: ["Node.js", "Express", "MongoDB", "JWT"],
    category: "backend",
    sourceLink: "https://github.com/shreyanshsalvi/social-api",
  },
  {
    id: "5",
    title: "Weather Application",
    description: "Real-time weather forecasting app",
    longDescription: "Built a weather application that provides current conditions and forecasts for any location, featuring interactive maps, hourly predictions, and severe weather alerts.",
    image: "https://images.pexels.com/photos/1275413/pexels-photo-1275413.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tags: ["React Native", "OpenWeatherMap API", "Geolocation"],
    category: "mobile",
    demoLink: "https://weather-app-demo.com",
    sourceLink: "https://github.com/shreyanshsalvi/weather-app",
  },
  {
    id: "6",
    title: "Portfolio Website",
    description: "Professional developer portfolio",
    longDescription: "Designed and developed a professional portfolio website showcasing skills, projects, and contact information with a focus on performance, accessibility, and responsive design.",
    image: "https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    category: "frontend",
    demoLink: "https://shreyansh-portfolio.com",
    sourceLink: "https://github.com/shreyanshsalvi/portfolio",
  },
];