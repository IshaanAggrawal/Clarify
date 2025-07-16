import { motion } from "framer-motion";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { LocomotiveScrollProvider } from "react-locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const Home = () => {
  const { authUser } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  const features = [
    {
      icon: "🎯",
      title: "Focus Tools",
      description: "Use Pomodoro timers, set daily and weekly goals, and take smart breaks with AI-based recommendations to maintain optimal focus.",
      color: "from-blue-500 to-purple-600",
      bgColor: "bg-gradient-to-br from-blue-50 to-purple-50",
      borderColor: "border-blue-200",
    },
    {
      icon: "👥",
      title: "Study Rooms",
      description: "Join themed public rooms or private invite-only spaces to co-study via text, audio, or camera-free ambient presence.",
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-gradient-to-br from-green-50 to-emerald-50",
      borderColor: "border-green-200",
    },
    {
      icon: "📈",
      title: "Progress Tracking",
      description: "Get weekly and monthly reports, visualize your trends, and export logs for accountability or reflection.",
      color: "from-indigo-500 to-blue-600",
      bgColor: "bg-gradient-to-br from-indigo-50 to-blue-50",
      borderColor: "border-indigo-200",
    },
    {
      icon: "📚",
      title: "Expert Help",
      description: "Connect with tutors instantly, ask questions during study sessions, or join mentor AMAs weekly.",
      color: "from-purple-500 to-pink-600",
      bgColor: "bg-gradient-to-br from-purple-50 to-pink-50",
      borderColor: "border-purple-200",
    },
    {
      icon: "🛠️",
      title: "Custom Dashboard",
      description: "Fully customize your layout with widgets for timers, tasks, mood tracking, themes, and playlists.",
      color: "from-teal-500 to-cyan-600",
      bgColor: "bg-gradient-to-br from-teal-50 to-cyan-50",
      borderColor: "border-teal-200",
    },
    {
      icon: "🔒",
      title: "Privacy & Control",
      description: "Set focus rules, block distractions, control room access, and toggle presence for quiet productivity.",
      color: "from-gray-600 to-gray-800",
      bgColor: "bg-gradient-to-br from-gray-50 to-slate-50",
      borderColor: "border-gray-200",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Computer Science Student",
      avatar: "👩‍💻",
      text: "Clarify transformed my study habits. The community feature keeps me motivated even during tough coding sessions.",
    },
    {
      name: "Marcus Johnson",
      role: "Medical Student",
      avatar: "👨‍⚕️",
      text: "The progress tracking helped me identify my peak study hours. My retention improved by 40%!",
    },
    {
      name: "Elena Rodriguez",
      role: "Language Learner",
      avatar: "🌍",
      text: "Study rooms with native speakers made language practice so much more engaging and effective.",
    },
  ];

  const stats = [
    { number: "50K+", label: "Active Students" },
    { number: "2M+", label: "Study Hours" },
    { number: "95%", label: "Success Rate" },
    { number: "24/7", label: "Support" },
  ];

  return (
    <>
      <Navbar />
      <LocomotiveScrollProvider
        options={{ smooth: true }}
        watch={[authUser]}
        onLocationChange={(scroll) =>
          scroll.scrollTo(0, { duration: 0, disableLerp: true })
        }
      >
        <div data-scroll-container className="text-gray-900 font-sans pt-24">
        {/* Hero Section */}
        <section className="text-center py-24 bg-gradient-to-b h-auto from-blue-900 to-blue-700 text-white">
          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-4"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Welcome to <span className="text-yellow-300">Clarify</span>
          </motion.h1>
          <motion.p
            className="text-2xl md:text-3xl max-w-2xl mx-auto py-8"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Where Focus Meets Community – Study Smarter, Stay Motivated.
          </motion.p>
          <motion.div
            className="mt-8"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {!authUser ? (
            <a
              onClick={() => navigate("/signup")}
              className="bg-yellow-300 text-blue-900 px-6 py-3 rounded-xl shadow-md hover:bg-yellow-400 transition"
            >
              Get Started Free
            </a>):(
            <a
              onClick={() => navigate("/")}
              className="bg-yellow-300 text-blue-900 px-6 py-3 rounded-xl shadow-md hover:bg-yellow-400 transition"
            >
              Welcome
            </a>
            )}
          </motion.div>
        </section>

        {/* Enhanced Features Section */}
        <section id="features" className="py-20 px-4 md:px-12 bg-gradient-to-br from--100 to-white">
          <motion.div
            className="text-center mb-20"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              What Clarify Offers
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover powerful tools and features designed to transform your study experience and boost your productivity.
            </p>
          </motion.div>

          <motion.div
            className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className={`group relative overflow-hidden rounded-3xl ${feature.bgColor} ${feature.borderColor} border-2 hover:border-opacity-50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10`}
                variants={cardVariants}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3 }
                }}
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                {/* Card content */}
                <div className="relative p-8 h-full">
                  {/* Icon with animated background */}
                  <div className="relative mb-6">
                    <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} rounded-full blur-lg opacity-20 group-hover:opacity-30 transition-opacity duration-300`} />
                    <div className="relative text-4xl bg-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                      {feature.icon}
                    </div>
                  </div>

                  {/* Title with gradient */}
                  <h3 className={`text-2xl font-bold mb-4 bg-gradient-to-r ${feature.color} bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300`}>
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                    {feature.description}
                  </p>

                  {/* Hover indicator */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${feature.color}`} />
                  </div>
                </div>

                {/* Subtle pattern overlay */}
                  <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300"
                      style={{
                        backgroundImage: `radial-gradient(circle at 20px 20px, rgba(0,0,0,0.1) 1px, transparent 1px)`,
                        backgroundSize: '40px 40px'
                      }} />
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            className="text-center mt-20"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span className="text-lg font-semibold">Explore All Features</span>
              <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </motion.div>
        </section>

                <section className="py-10 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-20"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold mb-6 text-gray-900">What Our Users Say</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Real stories from students who transformed their learning with Clarify.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-2xl mr-4">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-gray-600 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">"{testimonial.text}"</p>
                  <div className="flex text-yellow-400 mt-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>


        {/* CTA Section */}
        <section className="h-300 text-center py-10 bg-blue-900 text-white">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">
              Ready to Elevate Your Study Game?
            </h2>
            <p className="text-xl mb-6">
              Thousands of learners trust Clarify every day. Join them now.
            </p>
            <a
                onClick={() => {
                authUser ? navigate("/join-room") : navigate("/login");
              }}
              className="bg-yellow-300 text-blue-900 px-8 py-4 rounded-xl shadow-lg hover:bg-yellow-400 transition inline-block"
            >
              Start Now
            </a>
          </motion.div>
        </section>
        <Footer/>
      </div>
      </LocomotiveScrollProvider>
    </>
  );
};

export default Home;