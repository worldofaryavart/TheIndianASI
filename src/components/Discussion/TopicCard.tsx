"use client";

import Image from 'next/image';

type Topic = {
  title: string;
  description: string;
  date: string;
  user_image: string;
  user_name: string;
  participants: number;
  likes: number;
  messages: number;
};

type TopicCardProps = {
  topic: Topic;
  onClick: () => void;
};

const TopicCard = ({ topic, onClick }: TopicCardProps) => {
  return (
    <div
      className="max-w-2xl mx-auto p-6 bg-gray-800 rounded-lg shadow-lg border border-gray-600 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center space-x-4 mb-4">
        {/* You can add user image or other elements here */}
      </div>
      <h1 className="text-3xl font-bold mb-4 text-gray-100">{topic.title}</h1>
      <p className="text-gray-300 mb-6">{topic.description}</p>
      <div className="flex space-x-2 mb-6">
        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded border border-blue-200">Artificial Intelligence</span>
        <span className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded border border-green-200">India</span>
        <span className="bg-purple-100 text-purple-800 text-sm font-medium px-2.5 py-0.5 rounded border border-purple-200">LLM</span>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-400">Date: {topic.date}</p>
        <div className="flex items-center space-x-2">
          <p className="text-sm text-gray-400">Created by:</p>
          <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-gray-500">
            <Image
              src={topic.user_image}
              alt="User Avatar"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <p className="text-lg font-semibold text-gray-100">{topic.user_name}</p>
        </div>
      </div>
      <div className="flex items-center space-x-4 mt-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-400">Participants:</span>
          <span className="text-sm text-gray-100">{topic.participants}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-400">Likes:</span>
          <span className="text-sm text-gray-100">{topic.likes}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-400">Messages:</span>
          <span className="text-sm text-gray-100">{topic.messages}</span>
        </div>
      </div>
    </div>
  );
};

export default TopicCard;