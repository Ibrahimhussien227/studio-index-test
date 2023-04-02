import React, { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";

import { http } from "../app/services/adsApi";
import {
  HorizontalAdsCard,
  AdsSkeleton,
  VerticalAdsCard,
  Navbar,
} from "../components";
import { useStateContext } from "../contexts/ContextProvider";
import { ReactComponent as ArrowUp } from "../assets/arrowUp.svg";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [ads, setAds] = useState([]);
  const [totalPages, setTotalPages] = useState();
  const [error, setError] = useState(false);
  const [backToTheTopButton, setBackToTheTopButton] = useState(false);
  const { shape } = useStateContext();

  useEffect(() => {
    http
      .get(`/items?page=${page}`)
      .then((res) => {
        setLoading(false);
        setAds(ads.concat(res.data.items));

        setTotalPages(res.data.pages);
      })
      .catch((error) => setError(true));

    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setBackToTheTopButton(true);
      } else {
        setBackToTheTopButton(false);
      }
    });
  }, [page]);

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const loadMore = () => {
    setLoading(true);
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  return ads.length ? (
    <>
      <Navbar />
      <div className="flex flex-col gap-10 items-center sm:px-0 px-5 pb-5">
        <div
          className={`${
            shape === "horizontal"
              ? "grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4"
              : "grid grid-cols-1 lg:grid-cols-2"
          } gap-5`}
        >
          {ads.map(({ id, price, title, address, createdAt, seen }) =>
            shape === "horizontal" ? (
              <HorizontalAdsCard
                key={id + price}
                id={id}
                price={price}
                title={title}
                address={address}
                createdAt={createdAt}
                seen={seen}
              />
            ) : (
              <VerticalAdsCard
                key={id + price}
                id={id}
                price={price}
                title={title}
                address={address}
                createdAt={createdAt}
                seen={seen}
              />
            )
          )}
        </div>
        {loading ? (
          <CircularProgress />
        ) : (
          page !== totalPages && (
            <>
              {error && <p>Ошибка при загрузке</p>}
              <button
                type="button"
                className="p-10 text-[#00A0AB]"
                onClick={loadMore}
              >
                Показать еще
              </button>
            </>
          )
        )}
      </div>
      {backToTheTopButton && (
        <button
          type="button"
          className="fixed z-40 justify-center items-center gap-5 bottom-2 sm:bottom-10 right-2 lg:right-10 md:right-2 py-2 px-2 lg:py-4 lg:px-10 md:py-1 md:px-5 bg-white text-gray-500 rounded-[30px] shadow"
          onClick={scrollUp}
        >
          <div className="flex flex-row items-center gap-5">
            <ArrowUp className="" />
            <p className="md:flex hidden">Вверх</p>
          </div>
        </button>
      )}
    </>
  ) : ads.length === 0 && !loading ? (
    <div className="flex h-screen">
      <div className="m-auto flex flex-col w-64">
        <h1 className="text-[#00A0AB] text-lg">ОБЪЯВЛЕНИЙ НЕ НАЙДЕНО</h1>
        <p className="text-gray-500 text-base">
          Простите, по вашему запросу товаров сейчас нет. Задайте запрос
          по-другому или измените характеристики
        </p>
      </div>
    </div>
  ) : (
    <AdsSkeleton cards={20} />
  );
};

export default Home;
