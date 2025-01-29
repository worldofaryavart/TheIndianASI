import { FaGithub } from "react-icons/fa";

type Project = {
    id: number;
    title: string;
    description: string;
    link: string;
};

const ProjectCard = ({ project }: { project: Project }) => {
    return (
        <div className="project-card bg-transparent border border-gray-400 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-semibold mb-2 text-white">{project.title}</h3>
            <p className="text-gray-300 mb-4">{project.description}</p>
            <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-200"
            >
                <FaGithub className="mr-2" />
                <span>View on GitHub</span>
            </a>
        </div>
    );
};

export default ProjectCard;