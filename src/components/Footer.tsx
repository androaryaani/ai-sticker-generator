import React from 'react';
import { Heart, Linkedin, Github, ExternalLink, Briefcase } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* App Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Arul-Ai
              </h3>
            </div>
            <p className="text-gray-300 leading-relaxed max-w-md">
              Transform your photos into adorable chibi-style cartoon stickers using advanced AI technology. 
              Create personalized stickers with multiple style options and download them instantly.
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-400 fill-current" />
              <span>for creative expression</span>
            </div>
          </div>

          {/* Creator Info */}
          <div className="space-y-6">
            <div className="text-center md:text-right">
              <h4 className="text-xl font-semibold text-white mb-2">Aryan Saini</h4>
              <div className="space-y-2">
                <p className="text-purple-300 font-medium">CEO & Founder of Legalyze-India</p>
                <a
                  href="https://legalyzeindia.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <Briefcase className="w-4 h-4" />
                  <span>Legalyze-India</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex justify-center md:justify-end space-x-4">
              <a
                href="https://www.linkedin.com/in/aryan-saini067?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-105 hover:shadow-lg"
                title="LinkedIn"
              >
                <Linkedin className="w-6 h-6 text-white" />
              </a>
              <a
                href="https://github.com/androaryaani"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-105 hover:shadow-lg"
                title="GitHub"
              >
                <Github className="w-6 h-6 text-white" />
              </a>
              <a
                href="https://verdant-jelly-904ae2.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-105 hover:shadow-lg"
                title="Portfolio"
              >
                <ExternalLink className="w-6 h-6 text-white" />
              </a>
              <a
                href="https://legalyzeindia.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-green-600 hover:bg-green-700 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-105 hover:shadow-lg"
                title="Legalyze-India"
              >
                <Briefcase className="w-6 h-6 text-white" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 Arul-Ai. All rights reserved. | Powered by AI Technology
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;