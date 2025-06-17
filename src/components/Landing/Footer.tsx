import { FaInstagram, FaTwitter, FaReddit, FaEnvelope } from 'react-icons/fa';
import Image from 'next/image';


const Footer = () => {
  return (
    <div className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center space-y-6">
          <Image src="/images/logo.png" alt="Logo" width={48} height={48} className="h-12" />
          <div className="flex space-x-6">
            <a
              href="https://www.instagram.com/aryavartai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition duration-300"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://x.com/ShivaSa65237301"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition duration-300"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="https://www.reddit.com/r/TheIndianASI"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition duration-300"
            >
              <FaReddit size={24} />
            </a>
            <a
              href="contact@webxro.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition duration-300"
            >
              <FaEnvelope size={24} />
            </a>
          </div>
          <div className="flex space-x-6">
            <a
              href="/terms-and-conditions"
              className="text-gray-400 hover:text-white transition duration-300"
            >
              Terms and Conditions
            </a>
            <a
              href="/privacy-policy"
              className="text-gray-400 hover:text-white transition duration-300"
            >
              Privacy Policy
            </a>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-800 pt-8 text-center text-gray-400">
          &copy; {new Date().getFullYear()} The Indian ASI. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;