import CommunityNote from "@/components/CommunityNote";
import TopicList from "@/components/Discussion/TopicList";
import ProjectSection from "@/components/Projects/ProjectSection";

export default function DashboardPage() {
    return (
      <div>
        <CommunityNote />
        <ProjectSection />
        <TopicList />
      </div>
    );
  }