import Image from 'next/image';

interface Message {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isDark?: boolean;
}

const messages: Message[] = [
  {
    id: '1',
    author: {
      name: 'Anita Sharma',
      avatar: '/images/user.png',
    },
    content: 'Hey everyone! Really excited to discuss building LLMs in India. The tech ecosystem here is growing rapidly.',
  },
  {
    id: '2',
    author: {
      name: 'Raj Kumar',
      avatar: '/images/user.png',
    },
    content: 'I agree! We have the talent and resources. Just need better infrastructure and funding.',
    isDark: true,
  },
  {
    id: '3',
    author: {
      name: 'Priya Patel',
      avatar: '/images/user.png',
    },
    content: 'The biggest challenge I see is getting enough high-quality training data in Indian languages.',
  },
  {
    id: '4',
    author: {
      name: 'Arun Verma',
      avatar: '/images/user.png',
    },
    content: 'We could start with a focused approach - maybe build domain-specific models first?',
    isDark: true,
  },
  {
    id: '5',
    author: {
      name: 'Maya Gupta',
      avatar: '/images/user.png',
    },
    content: 'Good point! Healthcare and education could be great starting points.',
  },
  {
    id: '6',
    author: {
      name: 'Vikram Singh',
      avatar: '/images/user.png',
    },
    content: 'We should also focus on making these models computationally efficient given our constraints.',
    isDark: true,
  },
];

const MessageBubble = ({ message }: { message: Message }) => {
  return (
    <div className="flex gap-3 items-start">
      <Image
        src={message.author.avatar}
        alt={` avatar`}
        width={40}
        height={40}
        className="rounded-full"
      />
      <div className="flex flex-col">
        <span className="font-semibold">{message.author.name}</span>
        <div
          className={`border border-gray-400 rounded-lg p-3 mt-1 ${
            message.isDark ? 'bg-gray-900 text-white' : ''
          }`}
        >
          {message.content}
        </div>
      </div>
    </div>
  );
};

const Messages = () => {
  return (
    <div className="flex flex-col gap-4 p-6">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
    </div>
  );
};
export default Messages;
