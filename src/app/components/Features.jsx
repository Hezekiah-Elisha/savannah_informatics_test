import { Rocket, Shield, Users } from "lucide-react";

const features = [
  {
    icon: <Rocket className="h-8 w-8 text-primary" />,
    title: "Lightning Fast Images",
    description:
      "Experience blazing-fast performance with our optimized image delivery.",
  },
  {
    icon: <Shield className="h-8 w-8 text-primary" />,
    title: "Enterprise Security",
    description:
      "Bank-grade security to keep your images safe and compliant to your standards.",
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: "Accommodative Visibility",
    description: "Easily manage and share images with your team and clients.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-monserrat">
          Why Choose Us?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-lg border hover:shadow-lg transition-shadow animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 font-monserrat">{feature.title}</h3>
              <p className="text-gray-600 font-poppins">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
