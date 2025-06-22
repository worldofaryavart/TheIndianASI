"use client";

import React, { useState } from 'react';
import { 
  Home, 
  TrendingUp, 
  Users, 
  BookOpen, 
  Settings, 
  Heart,
  MessageCircle,
  Code,
  Lightbulb,
  Trophy,
  Calendar,
  ChevronRight
} from 'lucide-react';

interface SidebarPanelProps {
  className?: string;
}

const SidebarPanel: React.FC<SidebarPanelProps> = ({ className }) => {
  const [activeItem, setActiveItem] = useState('Home');

  const menuItems = [
    { icon: Home, label: 'Home', badge: null },
    { icon: TrendingUp, label: 'Trending', badge: 'Hot' },
    { icon: Users, label: 'Community', badge: '2.1k' },
    { icon: BookOpen, label: 'Blogs', badge: null },
    { icon: Code, label: 'Projects', badge: 'New' },
    { icon: Lightbulb, label: 'Ideas', badge: null },
    { icon: Trophy, label: 'Challenges', badge: '3' },
    { icon: Calendar, label: 'Events', badge: null },
  ];

  const quickStats = [
    { label: 'Active Members', value: '2,147', trend: '+12%' },
    { label: 'Today\'s Posts', value: '89', trend: '+8%' },
    { label: 'Online Now', value: '342', trend: '' },
  ];

  return (
    <div className={`${className} bg-gradient-to-b from-slate-900 to-slate-800 border-r border-purple-500/20 w-72 h-screen overflow-y-auto`}>
      {/* Navigation Menu */}
      <div className="p-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.label}
            onClick={() => setActiveItem(item.label)}
            className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 group ${
              activeItem === item.label
                ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-white shadow-lg'
                : 'text-gray-300 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <div className="flex items-center space-x-3">
              <item.icon className={`w-5 h-5 ${
                activeItem === item.label ? 'text-purple-400' : 'group-hover:text-purple-400'
              } transition-colors`} />
              <span className="font-medium">{item.label}</span>
            </div>
            <div className="flex items-center space-x-2">
              {item.badge && (
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  item.badge === 'Hot' ? 'bg-red-500/20 text-red-400' :
                  item.badge === 'New' ? 'bg-green-500/20 text-green-400' :
                  'bg-purple-500/20 text-purple-400'
                }`}>
                  {item.badge}
                </span>
              )}
              <ChevronRight className={`w-4 h-4 transition-transform ${
                activeItem === item.label ? 'rotate-90 text-purple-400' : 'text-gray-500'
              }`} />
            </div>
          </button>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="mx-4 mt-6 p-4 bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-xl border border-purple-500/20">
        <h3 className="text-sm font-semibold text-purple-300 mb-3 flex items-center">
          <TrendingUp className="w-4 h-4 mr-2" />
          Community Stats
        </h3>
        <div className="space-y-3">
          {quickStats.map((stat, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-xs text-gray-400">{stat.label}</span>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-bold text-white">{stat.value}</span>
                {stat.trend && (
                  <span className="text-xs text-green-400 font-medium">{stat.trend}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Topics */}
      <div className="mx-4 mt-4 p-4 bg-slate-800/30 rounded-xl border border-slate-700/50">
        <h3 className="text-sm font-semibold text-gray-300 mb-3">Trending Topics</h3>
        <div className="space-y-2">
          {['Machine Learning', 'Web Development', 'Data Science', 'AI Ethics'].map((topic, index) => (
            <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-700/30 cursor-pointer transition-colors">
              <span className="text-sm text-gray-300">#{topic}</span>
              <div className="flex items-center space-x-1">
                <Heart className="w-3 h-3 text-red-400" />
                <span className="text-xs text-gray-500">{Math.floor(Math.random() * 100) + 20}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mx-4 mt-4 mb-4 p-4 bg-slate-800/30 rounded-xl border border-slate-700/50">
        <h3 className="text-sm font-semibold text-gray-300 mb-3">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
              <MessageCircle className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-300">New discussion in AI Ethics</p>
              <p className="text-xs text-gray-500 mt-1">2 mins ago</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-400 rounded-full flex items-center justify-center">
              <Code className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-300">Project showcase updated</p>
              <p className="text-xs text-gray-500 mt-1">5 mins ago</p>
            </div>
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="p-4 border-t border-slate-700/50">
        <button className="w-full flex items-center space-x-3 p-3 text-gray-300 hover:text-white hover:bg-slate-800/50 rounded-xl transition-all duration-200">
          <Settings className="w-5 h-5" />
          <span className="font-medium">Settings</span>
        </button>
      </div>
    </div>
  );
};

export default SidebarPanel;