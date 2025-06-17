const BlogSection = () => {
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Latest Blog Posts</h2>
            <ul className="space-y-4">
                <li className="border-b border-gray-200 dark:border-gray-700 pb-4">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Understanding React Hooks</h3>
                    <p className="text-gray-600 dark:text-gray-400">A deep dive into the world of React Hooks and how they can simplify your code.</p>
                </li>
                <li className="border-b border-gray-200 dark:border-gray-700 pb-4">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Building Scalable Applications</h3>
                    <p className="text-gray-600 dark:text-gray-400">Tips and strategies for building applications that scale effectively.</p>
                </li>
                <li className="pb-4">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">The Future of Web Development</h3>
                    <p className="text-gray-600 dark:text-gray-400">Exploring the trends and technologies shaping the future of web development.</p>
                </li>
            </ul>
        </div>
    );
}

export default BlogSection;