import { Typography, Container } from "@mui/material";
import ProjectCard from "./ProjectCard";

type Project = {
  id: number;
  title: string;
  description: string;
  link: string;
};

const projects: Project[] = [
  {
    id: 1,
    title: "Project 1",
    description: "Description of Project 1",
    link: "www.github.com/worldofaryavart",
  },
  {
    id: 2, // Changed to a unique id
    title: "Project 2",
    description: "Description of Project 2",
    link: "www.github.com/worldofaryavart",
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
