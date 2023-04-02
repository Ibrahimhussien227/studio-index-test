import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import moment from "moment";

import { ReactComponent as IconLike } from "../assets/IconLike.svg";
import BackArrow from "../assets/backArrow.png";
import { http } from "../app/services/adsApi";
import { slides } from "../constants";
import { ItemDetailsSkeleton } from "../components";

const ItemDetails = () => {
  const [index, setIndex] = useState(0);
  const [itemData, setItemData] = useState();
  const [favoriteItems, setFavoriteItems] = useState(() =>
    JSON.parse(localStorage.getItem("favourites") || "[]")
  );

  const { id } = useParams();

  useEffect(() => {
    http
      .get(`/items/${id}`)
      .then((res) => {
        setItemData(res.data);
      })
      .catch((error) => console.error(error));
  }, [id]);

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
    <div className="flex flex-col mt-14 m-2 sm:m-10 text-[#324d67]">
      {itemData ? (
        <>
          <Link to="/">
            <img src={BackArrow} />
          </Link>
          <div className="flex flex-col sm:flex-row gap-10 mt-10">
            <div className="flex flex-col">
              <div className="w-full sm:w-96 sm:h-96 relative">
                <img
                  src={slides && slides[index].url}
                  className="rounded-2xl w-full h-full"
                />
                {itemData.seen && (
                  <div className="absolute bg-white z-10 top-3 left-1/2 transform -translate-x-1/2 text-xs rounded-lg py-1 px-2">
                    <p>Просмотрено</p>
                  </div>
                )}
              </div>
              <div className="flex gap-3 mt-5 items-center justify-center px-2">
                {slides?.map((item, i) => (
                  <img
                    key={item.url}
                    src={item.url}
                    className="rounded-[8px] w-20 sm:w-24 h-24 cursor-pointer"
                    onMouseEnter={() => setIndex(i)}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-14">
              <h1>{itemData.title}</h1>
              <div>
                <h4>About: </h4>
                <p>{itemData.about}</p>
              </div>
              <div className="flex flex-row justify-between items-center px-2">
                <p className="mt-8 font-bold text-base">${itemData.price}</p>
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
              <div className="flex flex-row justify-between text-gray-500 text-xs pb-3 px-2 mt-10">
                <p>{itemData.address}</p>
                <p className="quantity-desc">
                  {moment(itemData?.createdAt?.replace(" -05:00", "Z")).format(
                    "DD:MM:YYYY, h:mm"
                  )}
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <ItemDetailsSkeleton />
      )}
    </div>
  );
};

export default ItemDetails;
