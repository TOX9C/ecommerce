"use client";

interface FilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  categories?: string[];
}

const Filter = ({ activeCategory, onCategoryChange, categories = ["All"] }: FilterProps) => {
  // Use passed categories, ensuring "All" is always first if not present (simple logic handled in parent usually, but good fallback)
  const displayCategories = categories.includes("All") ? categories : ["All", ...categories];

  return (
    <div className="flex self-center gap-3 flex-wrap justify-center select-none">
      {displayCategories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-6 py-2.5 rounded-full text-lg font-medium transition-all duration-300 cursor-pointer ${activeCategory === category
            ? "bg-black text-white shadow-lg"
            : "bg-white text-black hover:bg-[#e8e8ed]"
            }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};
export default Filter;
