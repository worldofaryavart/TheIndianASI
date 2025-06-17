"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Intro from "@/components/Discussion/Topic/Intro";
import Messages from "@/components/Discussion/Topic/Messages";

interface Topic {
  title: string;
  description: string;
  date: string;
  user_image: string;
  user_name: string;
  participants: number;
  likes: number;
  messages: number;
}

export default function TopicPage() {
  const searchParams = useSearchParams();
  const [topic, setTopic] = useState<Topic | null>(null);

  // console.log("params", params);

  useEffect(() => {
    const searchParamsArray = Array.from(searchParams.entries());
    const topicDataEntry = searchParamsArray.find(([key]) => key === "?data");

    if (topicDataEntry && topicDataEntry[1]) {
      try {
        const parsedTopic = JSON.parse(topicDataEntry[1]);
        setTopic(parsedTopic);
      } catch (error) {
        console.error("Error parsing topic data:", error);
      }
    }
  }, [searchParams]);

  if (!topic) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center max-w-2xl p-6">
          {/* Spinner */}
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 mb-4 mx-auto"></div>

          {/* Heading */}
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">
            Note: This Section is a Work in Progress
          </h1>

          {/* Description */}
          <p className="text-gray-600 mb-6">
            We are developing this section as a full Discussion Forum where you
            can interact with community members, share insights, and ask
            questions. You will be able to share research, projects, and ideas.
          </p>
        </div>
      </div>
      <Intro topic={topic} />
      <Messages />
    </>
  );
}
