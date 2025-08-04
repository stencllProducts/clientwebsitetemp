import React from "react";

const ChooseYourPlan = () => {
  const plans = [
    {
      name: "Starter",
      description: "A great place to start with essential features.",
      price: "9.99",
      features: [
        "✓ Basic website template",
        "✓ Email support",
        "✓ Access to community forum",
      ],
    },
    {
      name: "Core",
      description: "This isn’t your first rodeo; you know what you’re doing.",
      price: "29.99",
      features: [
        "✓ Everything in Starter plan, plus",
        "✓ 1 Add-on template customization",
        "✓ Password protection (optional)",
        "✓ Stripe Add-on",
      ],
    },
    {
      name: "Enterprise",
      description:
        "All the core features + 5 white label sites, and user permissions.",
      price: "99.99",
      features: [
        "✓ Everything in Core plan, plus",
        "✓ Domain purchase",
        "✓ 90-days story version history",
        "✓ Up to 20,000 contacts",
        "✓ User permissions",
      ],
    },
  ];
  return (
    <section className="w-full mt-9">
      <h2 className="text-[2.2rem] font-bold text-center ">Choose Your Plan</h2>
      <div className="w-full flex-col md:flex-row mt-6 flex justify-between gap-6 px-4 md:px-[8%] ">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="rounded-[16px] h-fit md:hover:-translate-y-4 ease-in-out duration-300"
            style={{
              boxShadow: "0px 4px 2px 4px rgba(153, 153, 153, 0.1)",
              backgroundColor: index === 2 ? "#212529" : "#fff",
              color: index === 2 ? "#fff" : "inherit",
            }}
          >
            <div className="flex flex-col items-center justify-center p-6">
              <h3 className="text-[1.8rem] font-bold">{plan.name}</h3>
              <p
                className="text-center pb-[2rem] text-[#6c757d] text-[0.9rem] mt-2"
                style={{ borderBottom: "1px solid #e6e6e7" }}
              >
                {plan.description}
              </p>
              <p className="text-[1.5rem] font-bold mt-4">
                ${plan.price} <span className="text-[#6c757d]">/ month</span>
              </p>
              <button className="bg-[#007bff] hover:bg-[#0068d8] duration-300 ease-in-out  w-full text-white rounded-lg px-4 py-2 mt-4">
                Choose Plan
              </button>
              <ul
                className="mt-4 py-4 w-full"
                style={{ borderTop: "1px solid #e6e6e7" }}
              >
                {plan.features.map((feature, index) => (
                  <li key={index} className="text-[1rem] font-light">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ChooseYourPlan;
