import Image from "next/image";

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

const Intro = ({topic}: {topic: Topic}) => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-gray-900 rounded-lg shadow-lg border border-gray-400 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h1 className="text-3xl font-bold text-gray-50 mb-4">{topic.title}</h1>
              <p className="text-gray-400 text-lg">{topic.description}</p>
            </div>
    
            <div className="p-6 bg-gray-800">
              <div className="flex items-center space-x-4 mb-6">
                <div className="relative h-12 w-12 rounded-full overflow-hidden">
                  <Image
                    src={topic.user_image}
                    alt={topic.user_name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium text-gray-50">Posted by: {topic.user_name}</p>
                  <p className="text-sm text-gray-100">{new Date(topic.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</p>
                </div>
              </div>
    
              <div className="flex space-x-6">
                <div className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                  <span className="text-gray-200">{topic.participants} Participants</span>
                </div>
    
                <div className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                  </svg>
                  <span className="text-gray-200">{topic.likes} Likes</span>
                </div>
    
                <div className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-200">{topic.messages} Messages</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
}

export default Intro;