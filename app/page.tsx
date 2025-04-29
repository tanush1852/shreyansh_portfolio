"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimatedText } from "@/components/animated-text";
import { fadeIn, fadeUp, stagger } from "@/lib/animations";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-28 md:pt-36 pb-16 md:pb-24">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background -z-10" />
        <div className="container px-4 md:px-6">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="mb-6">
              <Badge className="mb-4" variant="outline">
                Computer Engineering Student
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-4 text-center">
                <span className="block">Hi, I&apos;m</span>
                <AnimatedText 
                  text="Shreyansh Salvi" 
                  className="text-primary text-center md:ml-44"
                />
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground">
                Web Developer & Student at Sardar Patel Institute of Technology
              </p>
            </motion.div>
            
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button asChild size="lg">
                <Link href="/contact">
                  Get in Touch
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </Button>
            </motion.div>

            <motion.div variants={fadeUp} className="flex justify-center gap-5 mb-12">
              <Link 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="rounded-full p-3 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              >
                <Github className="h-6 w-6" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="rounded-full p-3 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              >
                <Linkedin className="h-6 w-6" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link 
                href="mailto:shreyansh.salvi@example.com" 
                className="rounded-full p-3 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              >
                <Mail className="h-6 w-6" />
                <span className="sr-only">Email</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container px-4 md:px-6">
          <motion.div 
            className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
          >
            <motion.div 
              variants={fadeIn}
              className="relative aspect-square rounded-xl overflow-hidden border border-border"
            >
              <Image 
                src="https://images.pexels.com/photos/5926382/pexels-photo-5926382.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Shreyansh Salvi" 
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </motion.div>
            <motion.div variants={fadeUp}>
              <h2 className="text-3xl font-bold tracking-tighter mb-4">About Me</h2>
              <p className="text-muted-foreground mb-6">
                I&apos;m a third-year Computer Engineering student at Sardar Patel Institute of Technology with a passion for creating beautiful, functional websites. I specialize in modern web technologies and am constantly expanding my skill set.
              </p>
              <p className="text-muted-foreground mb-6">
                With a strong foundation in both frontend and backend development, I enjoy building complete web applications that deliver exceptional user experiences. I&apos;m currently seeking internship opportunities to apply my skills in a professional environment.
              </p>
              <Button asChild variant="outline">
                <Link href="/skills">
                  Explore My Skills
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <motion.div 
            className="max-w-5xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter mb-4">Featured Projects</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Here are some of my recent projects showcasing my skills and experiences in web development.
              </p>
            </motion.div>

            <motion.div variants={stagger} className="grid md:grid-cols-2 gap-6">
              {featuredProjects.map((project, index) => (
                <motion.div key={index} variants={fadeUp}>
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div variants={fadeUp} className="text-center mt-10">
              <Button asChild>
                <Link href="/projects">
                  View All Projects
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="overflow-hidden h-full transition-all hover:shadow-lg">
      <div className="relative aspect-video">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-muted-foreground mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, i) => (
            <Badge key={i} variant="secondary">{tag}</Badge>
          ))}
        </div>
        <Button asChild variant="outline" size="sm">
          <Link href={project.link}>View Project</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

const featuredProjects: Project[] = [
  {
    title: "E-Commerce Platform",
    description: "A full-featured e-commerce platform with user authentication, product catalog, and payment processing.",
    image: "https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tags: ["Next.js", "TypeScript", "Stripe", "Tailwind CSS"],
    link: "/projects/ecommerce",
  },
  {
    title: "Task Management App",
    description: "A productivity application for managing tasks, with drag-and-drop functionality and team collaboration features.",
    image: "https://images.pexels.com/photos/8391656/pexels-photo-8391656.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tags: ["React", "Redux", "Firebase", "Material UI"],
    link: "/projects/task-manager",
  },
];