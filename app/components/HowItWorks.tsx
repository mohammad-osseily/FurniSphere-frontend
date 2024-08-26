const HowItWorks = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-8 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <img
              src="/images/step1.png"
              alt="Step 1"
              className="w-full h-48 object-cover mb-4"
            />
            <h3 className="text-lg font-semibold">Purchase Securely</h3>
            <p className="text-gray-700">
              Lorem ipsum dolor sit amet, consectetur.
            </p>
          </div>
          <div>
            <img
              src="/images/step2.png"
              alt="Step 2"
              className="w-full h-48 object-cover mb-4"
            />
            <h3 className="text-lg font-semibold">Ship From Warehouse</h3>
            <p className="text-gray-700">
              Lorem ipsum dolor sit amet, consectetur.
            </p>
          </div>
          <div>
            <img
              src="/images/step3.png"
              alt="Step 3"
              className="w-full h-48 object-cover mb-4"
            />
            <h3 className="text-lg font-semibold">Style Your Room</h3>
            <p className="text-gray-700">
              Lorem ipsum dolor sit amet, consectetur.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
