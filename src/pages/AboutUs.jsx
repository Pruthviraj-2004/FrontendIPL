import React from 'react';
import { images } from '../constants';
import { IoLogoLinkedin } from "react-icons/io5";
import { FaGithub } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { Sparkles, Code, Palette } from "lucide-react";
import MainLayout from '../Components/MainLayout';

const AboutUs = () => {
  const team = [
    {
      name: "Pruthviraj M Savanur",
      role: "Backend Developer",
      image: images.imgpru,
      bio: "Building robust systems that power seamless predictions. Passionate about scalable architecture and clean code.",
      socials: {
        instagram: "https://www.instagram.com/pruthvirajmsavanur",
        linkedin: "https://www.linkedin.com/in/pruthviraj-m-savanur-286294260/",
        github: "https://github.com/Pruthviraj-2004"
      },
      icon: Code
    },
    {
      name: "Sunitha B",
      role: "Web Developer",
      image: images.imgsunitha,
      bio: "Crafting beautiful interfaces and smooth user experiences. Bringing designs to life with modern web technologies.",
      socials: {
        instagram: "https://www.instagram.com/_.sunitha_/",
        linkedin: "https://www.linkedin.com/in/sunitha-b-1a0960230/",
        github: "https://github.com/Sssunithaaa"
      },
      icon: Palette
    }
  ];

  return (
    <MainLayout>
      <section className="relative min-h-screen bg-slate-950 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-violet-600/20 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-fuchsia-600/15 rounded-full blur-[100px] animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 py-10 lg:py-18">
          {/* Header Section */}
          <div className="text-center mb-10 lg:mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-slate-800 mb-6">
              <Sparkles className="w-4 h-4 text-violet-400" />
              <span className="text-sm font-medium text-slate-300">Meet the creators</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
              The Team Behind <br />
              <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                Predictive Play
              </span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Two passionate developers building a prediction platform for sports enthusiasts.
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {team.map((member, index) => {
              const Icon = member.icon;
              return (
                <div
                  key={member.name}
                  className="group relative bg-slate-900/40 backdrop-blur-xl rounded-3xl border border-slate-800 overflow-hidden hover:border-violet-500/30 transition-all duration-500"
                >
                  {/* Card Background Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-600/0 to-fuchsia-600/0 group-hover:from-violet-600/10 group-hover:to-fuchsia-600/10 transition-all duration-500" />
                  
                  <div className="relative p-6 lg:p-8">
                    <div className="flex flex-col lg:flex-row gap-6 items-center lg:items-start">
                      {/* Image Container */}
                      <div className="relative shrink-0">
                        <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-2xl overflow-hidden ring-2 ring-slate-700 group-hover:ring-violet-500/50 transition-all duration-300">
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        {/* Role Badge */}
                        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-slate-800 rounded-full border border-slate-700 flex items-center gap-1.5">
                          <Icon className="w-3 h-3 text-violet-400" />
                          <span className="text-xs font-medium text-slate-300 whitespace-nowrap">
                            {member.role}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 text-center lg:text-left">
                        <h3 className="text-xl lg:text-2xl font-bold text-white mb-2 group-hover:text-violet-300 transition-colors">
                          {member.name}
                        </h3>
                        <p className="text-slate-400 text-sm leading-relaxed mb-6">
                          {member.bio}
                        </p>

                        {/* Social Links */}
                        <div className="flex justify-center lg:justify-start gap-3">
                          {[
                            { icon: FaInstagramSquare, href: member.socials.instagram, label: "Instagram" },
                            { icon: IoLogoLinkedin, href: member.socials.linkedin, label: "LinkedIn" },
                            { icon: FaGithub, href: member.socials.github, label: "GitHub" }
                          ].map(({ icon: SocialIcon, href, label }) => (
                            <a
                              key={label}
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2.5 rounded-xl bg-slate-800 text-slate-400 hover:bg-violet-500/20 hover:text-violet-400 hover:scale-110 transition-all duration-200"
                              aria-label={label}
                            >
                              <SocialIcon size={20} />
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Fun Footer Note */}
          <div className="mt-10 text-center">
            <p className="text-slate-500 text-sm">
              Built with passion for sports fans everywhere 🏆
            </p>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default AboutUs;