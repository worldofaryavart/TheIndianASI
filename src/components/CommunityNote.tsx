import { Container } from "@mui/material";
import {
  FaHardHat,
  FaQuestionCircle,
  FaHandsHelping,
  FaReddit,
} from "react-icons/fa";

const CommunityNote = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <div className="community-note bg-gray-800 border border-gray-700 rounded-lg p-6 mx-auto">
        {/* Header with Icon */}
        <div className="flex items-center mb-4">
          <FaHardHat className="text-yellow-400 text-2xl mr-2" />
          <h1 className="text-xl font-semibold text-white">
            <span className="text-yellow-400">Community Note:</span> Work In
            Progress
          </h1>
        </div>

        {/* Main Content */}
        <p className="text-gray-300 mb-4">
          This page is currently under construction. We are working hard to
          bring you the best experience possible. Stay tuned for updates!
          Collaborate to make this page and overall experience better.
        </p>

        {/* Additional Information */}
        <div className="flex items-start mb-4">
          <FaQuestionCircle className="text-blue-400 text-xl mr-2 flex-shrink-0" />
          <p className="text-gray-300">
            If you have any questions or need assistance, please feel free to
            reach out to us. We appreciate your patience and support.
          </p>
        </div>

        {/* Disclaimer */}
        <div className="flex items-start">
          <FaHandsHelping className="text-green-400 text-xl mr-2 flex-shrink-0" />
          <p className="text-gray-300">
            Some of the data and components, like topics, participant numbers
            and messages, are not correct and are for demonstration purposes
            only.
          </p>
        </div>

        {/* Call-to-Action Button */}
        <div className="flex mx-2 gap-2">
          <div className="mt-6">
            <a
              href="https://github.com/worldofaryavart/IndiaAI" // Replace with the actual link or action
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <FaHandsHelping className="mr-2" />
              <span>Collaborate with Us</span>
            </a>
          </div>

          <div className="mt-6">
            <a // Replace with the actual link or action
              href="https://www.reddit.com/r/TheIndianASI/" // Replace with the actual link or action
              className="inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors duration-200"
            >
              <FaReddit className="mr-2" />
              <span>Join Us on Reddit</span>
            </a>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CommunityNote;
