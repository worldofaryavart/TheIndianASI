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
      <Intro topic={topic} />
      <Messages />
    </>
  );
}
