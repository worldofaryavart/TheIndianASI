const CTA = () => {
  return (
    <section className="relative bg-gradient-to-r from-slate-200 to-teal-100 text-white py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/cloud-pattern.png')] bg-cover bg-center opacity-20"></div>
      <div className="container mx-auto px-6 py-24 text-center relative z-10">
        <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
          Ready to Join India&apos;s AI Revolution?
        </h2>
        <div className="w-80 h-1 mx-auto bg-gradient-to-r from-blue-400 to-teal-600 rounded-full mb-6" />
        <p className="text-3xl mb-12 text-slate-700">
          Be part of the community that&apos;s shaping the future of AI in India
        </p>
        <button className="bg-teal-600 text-white px-10 py-4 rounded-full font-semibold hover:bg-teal-700 transition-all duration-300 transform hover:scale-105">
          Get Started Now
        </button>
      </div>
    </section>
  );
};

export default CTA;