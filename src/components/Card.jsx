import React from "react";
import { useState } from "react";
import { HeartIcon, StarIcon } from "lucide-react";

const Card = ({ title, author, rating, img, hours, category }) => {
  const [mouseOver, setMouseOver] = useState(false);
  const [inCart, setInCart] = useState(false);

  return (
    <div
      className="flex flex-col justify-between p-3 bg-white shadow-md rounded-md hover:-translate-y-1 duration-300 w-full gap-2 hover:cursor-pointer text-black"
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
    >
      <div className="relative overflow-hidden rounded-sm">
        <img src={img} alt="" className=" h-52 w-full object-cover" />
        <span
          className={`absolute bg-white p-2 rounded-full top-1 right-1 ${
            mouseOver ? "flex" : "hidden"
          } items-center justify-center inset-shadow-sm inset-shadow-red-700`}
        >
          <HeartIcon
            width={18}
            height={18}
            className=" text-black"
            fill="red"
          />
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <span className="py-1 px-2 text-xs bg-white/30 rounded-full text-black border-1 border-black">
            {category}
          </span>
          <div className="flex items-center gap-1">
            <StarIcon fill="yellow" className="outline-none" width={17} />
            <span className="text-sm">{rating}</span>
          </div>
        </div>
        <p className="font-bold">{title}</p>
        <div className="flex gap-2 items-center justify-between">
          <span>{author}</span>
          <span>{hours} hrs</span>
        </div>
        <div>
          <button
            className="bg-blue-500 text-white py-1 px-2 rounded-sm text-sm hover:cursor-pointer"
            onClick={() => setInCart(!inCart)}
          >
            {inCart ? "Remove from cart" : "Add to cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
