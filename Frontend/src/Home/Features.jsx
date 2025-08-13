import exchange from "../Img/exchange.png"
import returnOK from "../Img/returnOK.png"
import customerSupport from "../Img/customerSupport.png"

const Features = () => {
  const features = [
    {
      icon: <img src={exchange} alt="exchange" />,
      title: "Easy Exchange Policy",
      description: "We offer hassle free exchange policy",
    },
    {
      icon: <img src={returnOK} alt="returnOK" />,
      title: "7 Days Return Policy",
      description: "We provide 7 days free return policy",
    },
    {
      icon: <img src={customerSupport} alt="customerSupport" />,
      title: "Best Customer Support",
      description: "We provide 24/7 customer support",
    },
  ];

  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {features.map((feature, idx) => (
          <div key={idx} className="space-y-4">
            <div className="flex justify-center">{feature.icon}</div>
            <h3 className="text-lg font-semibold">{feature.title}</h3>
            <p className="text-gray-500">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
