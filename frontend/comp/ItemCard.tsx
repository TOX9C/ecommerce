import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

interface ItemsCardProps {
  id: number;
  name: string;
  price: number;
  category: string;
  ProductImages?: { url: string }[];
}

const ItemsCard = ({
  id,
  name,
  price,
  category,
  ProductImages,
}: ItemsCardProps) => {
  const { addToCart } = useCart();
  const imageUrl = ProductImages?.[0]?.url || "/placeholder.jpg";

  return (
    <div className="group bg-white rounded-[28px] transition-all duration-300 p-8 hover:shadow-xl hover:scale-[1.01] cursor-pointer flex flex-col h-full">
      <div className="w-full flex justify-center bg-[#f5f5f7] rounded-[20px] h-full aspect-square relative overflow-hidden">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-contain mix-blend-multiply opacity-90 group-hover:opacity-100 transition-all duration-500"
          sizes="(max-width: 768px) 100vw, 400px"
        />
      </div>
      <div className="flex flex-col mt-8">
        <p className="font-medium text-sm text-[#86868b]">{category}</p>
        <p className="font-semibold text-xl text-[#1d1d1f] select-text">{name}</p>
        <p className="select-text">${price}</p>
      </div>
      <div className="flex justify-between items-center duration-300 opacity-0 group-hover:opacity-100 mt-8">
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addToCart(id, 1);
          }}
          className="bg-[#0071e3] hover:bg-[#0077ed] text-white rounded-full text-[17px] px-6 py-2.5 font-medium transition-all cursor-pointer shadow-md hover:shadow-lg active:scale-95"
        >
          Add to cart
        </button>
        <Link
          href={`/product/${id}`}
          className="font-medium cursor-pointer text-[#0071e3] text-[17px] hover:underline"
        >
          Details
        </Link>
      </div>
    </div>
  );
};
export default ItemsCard;
