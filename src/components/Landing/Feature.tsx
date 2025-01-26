import NeuralNetwork from "./NeuralNetwork";

const Feature = () => {
    return (
        <section className="relative py-16 overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10 [background-image:linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
            
            {/* Animated gradient elements */}
            <div className="absolute top-0 left-10 w-32 h-32 bg-indigo-100 rounded-full opacity-20 blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-10 w-40 h-40 bg-indigo-200 rounded-full opacity-20 blur-3xl animate-pulse delay-1000"></div>

            <NeuralNetwork/>
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-indigo-100 to-purple-200 animate-slide-up">
                    Why Join Our Community?
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                    {[
                        {
                            title: "Networking",
                            description: "Connect with AI professionals and enthusiasts across India",
                            icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
                            ariaLabel: "Networking icon"
                        },
                        {
                            title: "Resources",
                            description: "Access exclusive AI learning materials and workshops",
                            icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
                            ariaLabel: "Resources icon"
                        },
                        {
                            title: "Opportunities",
                            description: "Find AI jobs, internships, and collaboration opportunities",
                            icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
                            ariaLabel: "Opportunities icon"
                        }
                    ].map((feature, index) => (
                        <div 
                            key={feature.title}
                            className="group relative text-center p-8 bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                        >
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                            <div className="relative">
                                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg group-hover:rotate-[15deg] transition-transform duration-300">
                                    <svg 
                                        className="w-10 h-10 text-white"
                                        fill="none" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24"
                                        aria-label={feature.ariaLabel}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d={feature.icon}
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-white-800">
                                    {feature.title}
                                </h3>
                                <p className="text-white-600 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Feature;