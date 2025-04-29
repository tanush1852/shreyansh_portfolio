"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { fadeIn, fadeUp, stagger } from "@/lib/animations";
import { AnimatedText } from "@/components/animated-text";

interface Skill {
  name: string;
  proficiency: number;
  category: string;
  icon?: string;
}

interface Education {
  institution: string;
  degree: string;
  field: string;
  duration: string;
  description: string;
}

export default function SkillsPage() {
  const [selectedTab, setSelectedTab] = useState<string>("technical");

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center mb-16">
            <Badge className="mb-4" variant="outline">Expertise</Badge>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
              <AnimatedText text="Skills & Qualifications" />
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              My technical expertise, educational background, and professional experience.
            </p>
          </div>

          <Tabs defaultValue="technical" value={selectedTab} onValueChange={setSelectedTab} className="mb-16">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="technical">Technical Skills</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="certifications">Certifications</TabsTrigger>
            </TabsList>
            
            <TabsContent value="technical">
              <SkillsGrid skills={skills} />
            </TabsContent>
            
            <TabsContent value="education">
              <motion.div 
                className="grid gap-6"
                initial="hidden"
                animate="visible"
                variants={stagger}
              >
                {education.map((edu, index) => (
                  <motion.div key={index} variants={fadeUp}>
                    <EducationCard education={edu} />
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
            
            <TabsContent value="certifications">
              <motion.div 
                className="grid md:grid-cols-2 gap-6"
                initial="hidden"
                animate="visible"
                variants={stagger}
              >
                {certifications.map((cert, index) => (
                  <motion.div key={index} variants={fadeUp}>
                    <CertificationCard 
                      title={cert.title}
                      issuer={cert.issuer}
                      date={cert.date}
                      description={cert.description}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          </Tabs>

          <motion.div 
            className="rounded-xl border border-border bg-card p-8 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-2xl font-bold tracking-tighter mb-4">Want to work together?</h2>
            <p className="text-muted-foreground mb-6">
              I&apos;m always open to discussing new projects, opportunities, and collaborations. 
              Feel free to reach out if you&apos;re looking for a developer with my skill set.
            </p>
            <div className="text-center">
              <motion.button 
                className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/contact'}
              >
                Contact Me
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function SkillsGrid({ skills }: { skills: Skill[] }) {
  const categories = Array.from(new Set(skills.map(skill => skill.category)));

  return (
    <motion.div 
      className="space-y-10"
      initial="hidden"
      animate="visible"
      variants={stagger}
    >
      {categories.map((category) => (
        <motion.div key={category} variants={fadeUp} className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tighter text-center">
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {skills
              .filter(skill => skill.category === category)
              .map((skill, index) => (
                <SkillCard key={index} skill={skill} />
              ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

function SkillCard({ skill }: { skill: Skill }) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium">{skill.name}</h3>
          <span className="text-sm text-muted-foreground">{skill.proficiency}%</span>
        </div>
        <Progress value={skill.proficiency} className="h-2" />
      </CardContent>
    </Card>
  );
}

function EducationCard({ education }: { education: Education }) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6 text-center">
        <div className="mb-2">
          <h3 className="text-xl font-bold">{education.institution}</h3>
          <p className="text-muted-foreground">{education.duration}</p>
        </div>
        <div className="mb-4">
          <h4 className="font-medium">{education.degree}</h4>
          <p className="text-sm text-muted-foreground">{education.field}</p>
        </div>
        <p className="text-sm">{education.description}</p>
      </CardContent>
    </Card>
  );
}

function CertificationCard({ 
  title, 
  issuer, 
  date, 
  description 
}: { 
  title: string, 
  issuer: string, 
  date: string, 
  description: string 
}) {
  return (
    <Card>
      <CardContent className="p-6 text-center">
        <h3 className="font-bold mb-1">{title}</h3>
        <div className="flex justify-center items-center gap-2 mb-3">
          <p className="text-sm font-medium">{issuer}</p>
          <Badge variant="outline">{date}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

const skills: Skill[] = [
  // Frontend
  { name: "HTML/CSS", proficiency: 95, category: "frontend" },
  { name: "JavaScript", proficiency: 90, category: "frontend" },
  { name: "TypeScript", proficiency: 85, category: "frontend" },
  { name: "React", proficiency: 90, category: "frontend" },
  { name: "Next.js", proficiency: 85, category: "frontend" },
  { name: "Tailwind CSS", proficiency: 90, category: "frontend" },
  { name: "Vue.js", proficiency: 75, category: "frontend" },
  
  // Backend
  { name: "Node.js", proficiency: 85, category: "backend" },
  { name: "Express", proficiency: 80, category: "backend" },
  { name: "MongoDB", proficiency: 75, category: "backend" },
  { name: "PostgreSQL", proficiency: 70, category: "backend" },
  { name: "Firebase", proficiency: 80, category: "backend" },
  { name: "GraphQL", proficiency: 65, category: "backend" },
  
  // Tools & Others
  { name: "Git", proficiency: 85, category: "tools" },
  { name: "Docker", proficiency: 65, category: "tools" },
  { name: "AWS", proficiency: 60, category: "tools" },
  { name: "Figma", proficiency: 75, category: "tools" },
  { name: "Agile/Scrum", proficiency: 80, category: "tools" },
  { name: "Testing (Jest)", proficiency: 70, category: "tools" },
];

const education: Education[] = [
  {
    institution: "Sardar Patel Institute of Technology",
    degree: "Bachelor of Technology",
    field: "Computer Engineering",
    duration: "2021 - Present",
    description: "Currently pursuing computer engineering with focus on web development, data structures, algorithms, and software engineering principles. Active member of the college's technical club and participant in various hackathons."
  },
  {
    institution: "St. Xavier's High School",
    degree: "Higher Secondary Education",
    field: "Science",
    duration: "2019 - 2021",
    description: "Completed higher secondary education with specialization in Physics, Chemistry, and Mathematics. Participated in various science competitions and served as a class representative."
  }
];

const certifications = [
  {
    title: "Full Stack Web Development",
    issuer: "Udemy",
    date: "May 2023",
    description: "Comprehensive course covering modern web development practices including MERN stack, authentication, and deployment strategies."
  },
  {
    title: "React - The Complete Guide",
    issuer: "Academind",
    date: "January 2023",
    description: "In-depth course on React.js covering hooks, context API, Redux, and best practices for building scalable applications."
  },
  {
    title: "JavaScript Algorithms and Data Structures",
    issuer: "freeCodeCamp",
    date: "October 2022",
    description: "Certification covering fundamental programming concepts, algorithm design, and data structures implementation in JavaScript."
  },
  {
    title: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "August 2023",
    description: "Foundational certification validating understanding of AWS Cloud, services, basic architecture, security, and compliance."
  }
];