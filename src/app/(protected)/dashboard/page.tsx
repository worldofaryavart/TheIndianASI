import TopicList from "@/components/Discussion/TopicList";
import ProjectSection from "@/components/Projects/ProjectSection";

export default function DashboardPage() {
    return (
      <div>
        <ProjectSection />
        <TopicList />
      </div>
    );
  }