import React from "react";
import { useNavigate } from "react-router-dom";
import { Trophy, UserPlus, Calendar, FileText, Users } from "lucide-react";

const CTA = () => {
  const navigate = useNavigate();

  const links = [
    { name: "LeaderBoard", path: "/board", icon: Trophy },
    { name: "Register", path: "/register", icon: UserPlus },
    { name: "Fixtures", path: "/fixtures/b68329a5-9e1b-4e1f-a239-488a3672b521", icon: Calendar },
    { name: "Terms", path: "/terms", icon: FileText },
    { name: "AboutUs", path: "/aboutus", icon: Users },
  ];

  return (
    <footer className="relative bg-slate-950 border-t border-slate-800">
      {/* Subtle Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-fuchsia-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-12">
        
        {/* Simple Navigation */}
        <div className="flex flex-wrap justify-center gap-8 mb-10">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <button
                key={link.name}
                onClick={() => navigate(link.path)}
                className="group flex items-center gap-2 text-slate-400 hover:text-indigo-300 transition-colors duration-200"
              >
                <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="font-medium">{link.name}</span>
              </button>
            );
          })}
        </div>

        {/* Brand & Copyright */}
        <div className="text-center">
          <h3 className="text-xl font-bold text-white mb-2">Predictive Play</h3>
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Predictive Play. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default CTA;