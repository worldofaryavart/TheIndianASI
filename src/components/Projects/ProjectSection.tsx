"use client";

import { Typography, Container } from "@mui/material";
import ProjectCard from "./ProjectCard";

type Project = {
  id: number;
  title: string;
  description: string;
  stack: string[];
  link: string;
};

const projects: Project[] = [
  {
    id: 1,
    title: "India's AI Community",
    description: "We’re building a global AI & deep tech hub—by India, for the world. No matter your background, you have an equal opportunity to collaborate, innovate, and shape the future.No owners, only builders. Join us now!",
    stack: ["Nextjs", "React", "TypeScript", "Python"],
    link: "https://github.com/worldofaryavart/IndiaAI",
  },
  {
    id: 2,
    title: "LLMForIndia - Open Source AI for Bharat",
    description: "LLMForIndia is a community-driven initiative to build an open-source language model tailored for Indian languages and knowledge. Our goal is to develop AI that understands and represents India's diverse linguistic and cultural heritage.",
    stack: ["LLM", "Python", "Open Source"],
    link: "https://github.com/worldofaryavart/AI-for-India",
  },
];

const ProjectSection = () => {
  return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <div className="text-center">
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontWeight: 400,
              textAlign: "left",
              mb: 2,
            }}
          >
            Projects
          </Typography>
          <hr className="border-t border-gray-400 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 px-4">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </Container>
  );
};

export default ProjectSection;
