import DecorativeCircle from "../components/DecorativeCircle";
import WavyBackground from "../components/WavyBackground";
import { Ticket, Clock, CheckCircle } from "lucide-react";

const features = [
  {
    icon: Ticket,
    title: "Easy Ticket Creation",
    desc: "Create and organize tickets in seconds with our intuitive interface",
  },
  {
    icon: Clock,
    title: "Real-time Tracking",
    desc: "Monitor ticket status and progress with live updates",
  },
  {
    icon: CheckCircle,
    title: "Quick Resolution",
    desc: "Resolve issues faster with streamlined workflows",
  },
];

const LandingPage = ({ onNavigate }) => (
  <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
    <section className="relative overflow-hidden py-20 md:py-32">
      <DecorativeCircle
        size="400px"
        top="-100px"
        right="-100px"
        opacity={0.15}
      />
      <DecorativeCircle size="300px" bottom="50px" left="-50px" opacity={0.1} />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Manage Your Tickets{" "}
            <span className="text-indigo-600">Effortlessly</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            Streamline your workflow with our powerful ticket management system.
            Create, track, and resolve tickets with ease.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate("signup")}
              className="px-8 py-4 bg-indigo-600 text-white rounded-lg text-lg font-semibold hover:bg-indigo-700 transition shadow-lg"
            >
              Get Started Free
            </button>
            <button
              onClick={() => onNavigate("login")}
              className="px-8 py-4 bg-white text-indigo-600 rounded-lg text-lg font-semibold hover:bg-gray-50 transition shadow"
            >
              Login
            </button>
          </div>
        </div>
      </div>
      <WavyBackground />
    </section>

    <section className="py-20 bg-white relative">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          Why Choose TicketFlow?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition border border-gray-100"
            >
              <f.icon className="text-indigo-600 mb-4" size={40} />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {f.title}
              </h3>
              <p className="text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p>{`© ${new Date().getFullYear()} TicketFlow. All rights reserved.`}</p>
      </div>
    </footer>
  </div>
);

export default LandingPage;
