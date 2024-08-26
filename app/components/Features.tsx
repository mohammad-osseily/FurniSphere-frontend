const Features = () => {
  return (
    <section className="bg-white py-8">
      <div className="container mx-auto flex justify-between items-center text-center">
        <div>
          <i className="fas fa-truck text-4xl text-blue-500"></i>
          <h3 className="text-lg font-semibold">Free Delivery</h3>
          <p className="text-gray-600">Lorem ipsum dolor sit amet.</p>
        </div>
        <div>
          <i className="fas fa-headset text-4xl text-blue-500"></i>
          <h3 className="text-lg font-semibold">Support 24/7</h3>
          <p className="text-gray-600">Lorem ipsum dolor sit amet.</p>
        </div>
        <div>
          <i className="fas fa-shield-alt text-4xl text-blue-500"></i>
          <h3 className="text-lg font-semibold">100% Authentic</h3>
          <p className="text-gray-600">Lorem ipsum dolor sit amet.</p>
        </div>
      </div>
    </section>
  );
};

export default Features;
