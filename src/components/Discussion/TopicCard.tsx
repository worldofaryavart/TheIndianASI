import Image from 'next/image';

const TopicCard = () => {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-800 rounded-lg shadow-lg border border-gray-600">
      <div className="flex items-center space-x-4 mb-4">
        <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-gray-500">
          <Image
            src="/images/user.png"
            alt="User Avatar"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <p className="text-lg font-semibold text-gray-100">John Doe</p>
      </div>
      <h1 className="text-3xl font-bold mb-4 text-gray-100">Topic</h1>
      <p className="text-gray-300 mb-6">This is a detailed description of the topic. It provides an overview and key points related to the subject matter.</p>
      <div className="flex space-x-2 mb-6">
        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded border border-blue-200">Artificial Intelligence</span>
        <span className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded border border-green-200">India</span>
        <span className="bg-purple-100 text-purple-800 text-sm font-medium px-2.5 py-0.5 rounded border border-purple-200">LLM</span>
      </div>
      <p className="text-sm text-gray-400">Date: 28-01-2025</p>
    </div>
  );
};

export default TopicCard;