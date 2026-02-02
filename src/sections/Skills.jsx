import { useEffect, useRef, useState } from "react";
const skills = [
  { name: "React", icon: "https://simpleicons.org/icons/react.svg", percent: 80, category: "frontend" },
  { name: "TypeScript", icon: "https://simpleicons.org/icons/typescript.svg", percent: 50, category: "frontend" },
  { name: "Node.js", icon: "https://simpleicons.org/icons/nodedotjs.svg", percent: 60, category: "backend" },
  { name: "Java", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/openjdk.svg", percent: 80, category: "backend" },
  { name: "Spring Boot", icon: "https://simpleicons.org/icons/springboot.svg", percent: 80, category: "backend" },
  { name: "PHP", icon: "https://simpleicons.org/icons/php.svg", percent: 65, category: "backend" },
  { name: "PostgreSQL", icon: "https://simpleicons.org/icons/postgresql.svg", percent: 80, category: "backend" },
  { name: "MongoDB", icon: "https://simpleicons.org/icons/mongodb.svg", percent: 75, category: "backend" },
  { name: "Docker", icon: "https://simpleicons.org/icons/docker.svg", percent: 60, category: "tools" },
  { name: "AWS", icon: "https://simpleicons.org/icons/amazon.svg", percent: 50, category: "tools" },
];

const useInView = (threshold = 0.2) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
};

const SkillCard = ({ skill, index }) => {
  const [ref, visible] = useInView();

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${index * 50}ms` }}
      className={`relative group glass rounded-2xl p-6 border border-white/10 
        transition-all duration-700 ease-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}
      `}
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Kept your exact img tag - now using CDN paths for the icons */}
      <img
        src={skill.icon}
        alt={skill.name}
        className="w-12 h-12 mx-auto mb-4 animate-float relative z-10 invert brightness-200"
      />

      <div className="relative z-10">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-white">{skill.name}</span>
          <span className="text-xs text-cyan-400 font-mono">{skill.percent}%</span>
        </div>
        
        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-cyan-500 transition-all duration-1000 ease-out"
            style={{ 
              width: visible ? `${skill.percent}%` : "0%",
              transitionDelay: `${(index * 100) + 500}ms`,
            }}
          />
        </div>
        <p className="text-[10px] uppercase tracking-tighter text-gray-500 mt-2">
          {skill.category}
        </p>
      </div>
    </div>
  );
};

export const Skills = () => {
  const [filter, setFilter] = useState("all");

  const filteredSkills = skills.filter(s => 
    filter === "all" ? true : s.category === filter
  );

  return (
    <section className="relative py-32 overflow-hidden bg-[#0b0f14]">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .glass { background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(10px); }
      `}</style>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full h-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <p className="text-cyan-400 uppercase tracking-widest text-sm mb-4">Tech Stack</p>
            <h2 className="text-4xl md:text-6xl font-bold text-white">
              Experience that <span className="italic text-cyan-400">speaks</span>
            </h2>
          </div>

          <div className="flex gap-2 bg-white/5 p-1 rounded-xl border border-white/10 self-start">
            {["all", "frontend", "backend", "tools"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all uppercase tracking-wider
                  ${filter === cat ? "bg-cyan-500 text-black" : "text-gray-400 hover:text-white"}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {filteredSkills.map((skill, idx) => (
            <SkillCard key={skill.name} skill={skill} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};