const categories = [
  { id: 1, name: "closet", image: "/images/closet.png" },
  { id: 2, name: "sofa", image: "/images/sofa.png" },
  { id: 3, name: "chair", image: "/images/chair.png" },
  // Add more categories here
];

const ProductCategories = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-8">Browse The Range</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white p-4 rounded shadow-lg text-center"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-48 object-cover mb-4"
              />
              <h3 className="text-xl font-semibold capitalize">
                {category.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
