const Stats = () => {
    return (
        <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-4xl font-bold text-indigo-600 mb-2">50K+</h3>
              <p className="text-gray-600">Community Members</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-4xl font-bold text-indigo-600 mb-2">1000+</h3>
              <p className="text-gray-600">AI Projects</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-4xl font-bold text-indigo-600 mb-2">100+</h3>
              <p className="text-gray-600">Monthly Events</p>
            </div>
          </div>
        </div>
      </section>
    );
}

export default Stats;