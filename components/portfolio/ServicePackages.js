import React from "react";

const packages = [
  {
    name: "Basic",
    price: "$299",
    description: "Perfect for single games or practices",
    features: [
      "2-hour coverage",
      "Basic editing",
      "1 highlight reel (2-3 min)",
      "Digital delivery",
      "1 revision included",
    ],
    button: {
      text: "Choose Basic",
      href: "https://app--court-vision-4ab6850b.base44.app/Contact",
      style: "bg-gray-800 text-white hover:bg-gray-700",
    },
    highlight: false,
  },
  {
    name: "Premium",
    price: "$599",
    description: "Comprehensive game coverage",
    features: [
      "4-hour coverage",
      "Advanced editing",
      "2 highlight reels",
      "Individual player clips",
      "Social media versions",
      "Digital delivery",
      "3 revisions included",
    ],
    button: {
      text: "Choose Premium",
      href: "https://app--court-vision-4ab6850b.base44.app/Contact",
      style: "bg-white text-black hover:bg-gray-100 font-semibold",
    },
    highlight: true,
  },
  {
    name: "Ultimate",
    price: "$999",
    description: "Full production experience",
    features: [
      "Full day coverage",
      "Cinematic editing",
      "Multiple highlight reels",
      "Individual player packages",
      "Behind-the-scenes content",
      "Social media package",
      "Physical media delivery",
      "Unlimited revisions",
    ],
    button: {
      text: "Choose Ultimate",
      href: "https://app--court-vision-4ab6850b.base44.app/Contact",
      style: "bg-gray-800 text-white hover:bg-gray-700",
    },
    highlight: false,
  },
];

export default function ServicePackages() {
  return (
    <section className="py-20 bg-gray-950">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            <span className="text-white">Service Packages</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Choose the perfect package for your basketball videography needs
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg, i) => (
            <div
              key={pkg.name}
              className={`rounded-lg border text-card-foreground shadow-sm relative bg-gray-900 border-gray-800 h-full hover:border-gray-700 transition-all duration-300 ${
                pkg.highlight
                  ? "border-red-500 shadow-2xl scale-105"
                  : ""
              }`}
            >
              {pkg.highlight && (
                <div className="inline-flex items-center rounded-full border text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-primary/80 absolute -top-3 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-4 py-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" className="lucide lucide-star w-4 h-4 mr-1"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path></svg>
                  Most Popular
                </div>
              )}
              <div className="flex flex-col space-y-1.5 p-6 text-center pb-4">
                <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                <div className="text-4xl font-bold text-white mb-2">{pkg.price}</div>
                <p className="text-gray-400">{pkg.description}</p>
              </div>
              <div className="p-6 pt-0">
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" className="lucide lucide-check w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0"><path d="M20 6 9 17l-5-5"></path></svg>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <a href={pkg.button.href}>
                  <button
                    className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 px-4 py-2 w-full transition-all duration-300 ${pkg.button.style}`}
                  >
                    {pkg.button.text}
                  </button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}