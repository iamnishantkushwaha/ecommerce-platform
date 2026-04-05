import React from "react";
import { CiDeliveryTruck } from "react-icons/ci";
import { GoShieldCheck } from "react-icons/go";
import { IoMdTrendingUp } from "react-icons/io";
const Servicecard = () => {
  const cards = [
    {
      logo: CiDeliveryTruck,
      heading: "Free Shipping",
      paragraph: "On orders over ₹50",
    },
    {
      logo: GoShieldCheck,
      heading: "Secure Payments",
      paragraph: "256-bit SSL encryption",
    },
    {
      logo: IoMdTrendingUp,
      heading: "Best Prices",
      paragraph: "Competitive marketplace pricing",
    },
  ];
  return (
    <section className="w-full px-4 md:px-10 lg:px-16">
      <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
        {cards.map((card, idx) => {
          const Icon = card.logo;
          return (
            <div
              key={idx}
              className="group flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div>
                <div className="w-fit rounded-xl bg-slate-900/95 p-2.5 text-white shadow-md transition group-hover:bg-blue-500">
                  {<Icon className="text-3xl font-semibold text-white" />}
                </div>
              </div>
              <div>
                <h2 className="font-semibold text-slate-900">{card.heading}</h2>
                <p className="text-sm text-slate-500">{card.paragraph}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Servicecard;
