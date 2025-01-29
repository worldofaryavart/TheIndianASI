import ProjectCard from "./ProjectCard";

type Project = {
    id: number;
    title: string;
    description: string;
    link: string;
}

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
    }
]

const ProjectSection = () => {
    return (
        <section id="projects" className="py-10 text-white">
            <div className="text-center">
                <h1 className="text-3xl font-bold mb-8">Projects</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
                    {projects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProjectSection;