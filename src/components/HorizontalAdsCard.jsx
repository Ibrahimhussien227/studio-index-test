import React, { useState } from "react";
import moment from "moment";

import { Link } from "react-router-dom";
import { ReactComponent as IconLike } from "../assets/IconLike.svg";
import ImageSlider from "./ImageSlider";
import { slides } from "../constants";

const HorizontalAdsCard = ({ id, price, title, address, createdAt, seen }) => {
  const [favoriteItems, setFavoriteItems] = useState(() =>
    JSON.parse(localStorage.getItem("favourites") || "[]")
  );

  const isFavourited = favoriteItems.includes(id);

  const handleToggleFavourite = () => {
    if (!isFavourited) {
      const newStorageItem = [...favoriteItems, id];
      setFavoriteItems(newStorageItem);
      localStorage.setItem("favourites", JSON.stringify(newStorageItem));
    } else {
      const newStorageItem = favoriteItems.filter((savedId) => savedId !== id);
      setFavoriteItems(newStorageItem);
      localStorage.setItem("favourites", JSON.stringify(newStorageItem));
    }
  };

  return (
    <div className="flex flex-col w-full sm:w-56 h-[364px] border rounded-xl justify-between">
      <div className="flex relative">
        <ImageSlider
          slides={slides}
          className="rounded-t-xl h-[260px] z-0 w-full"
        />

        {seen && (
          <div className="absolute bg-white z-10 top-3 left-1/2 transform -translate-x-1/2 text-xs rounded-lg py-1 px-2">
            <p>Просмотрено</p>
          </div>
        )}
      </div>

      <div className="flex flex-row justify-between bg-white px-2">
        <p className="font-bold text-base">{price} ₽</p>
        <div onClick={handleToggleFavourite} className="cursor-pointer">
          <IconLike
            className={`${
              isFavourited
                ? "fill-red-500"
                : "fill-[#C7C7C7] hover:fill-gray-400"
            }`}
          />
        </div>
      </div>
      <Link to={`/${id}`} className="font-bold text-sm px-2">
        {title}
      </Link>
      <div className="flex flex-row justify-between text-gray-500 text-xs pb-3 px-2">
        <p>{address}</p>
        <p>
          {moment(createdAt.replace(" -05:00", "Z")).format("DD:MM:YYYY, h:mm")}
        </p>
      </div>
    </div>
  );
};

export default HorizontalAdsCard;
