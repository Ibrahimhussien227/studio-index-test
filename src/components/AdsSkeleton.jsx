import React from "react";
import { Skeleton } from "@mui/material";

import { useStateContext } from "../contexts/ContextProvider";

const AdsSkeleton = ({ cards }) => {
  const { shape } = useStateContext();
  return (
    <>
      <div className="flex sm:justify-between justify-center py-10">
        <div />
        <div className="flex flex-row sm:mr-10 gap-5">
          <Skeleton width={84} height={60} className="rounded-lg" />
        </div>
      </div>
      <div className="flex flex-col gap-10 items-center pb-5 sm:px-0 px-5">
        <div
          className={`${
            shape === "horizontal"
              ? "grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4"
              : "grid grid-cols-1 lg:grid-cols-2"
          } gap-5`}
        >
          {Array(cards)
            .fill(0)
            .map((item, i) =>
              shape === "horizontal" ? (
                <div
                  className="flex flex-col w-full sm:w-56 h-[364px] border rounded-xl justify-between"
                  key={i}
                >
                  <div className="relative">
                    <Skeleton
                      variant="rectangular"
                      className="rounded-t-xl z-0 w-64 sm:w-full"
                      height={260}
                    />
                    <div className="absolute bg-white w-14 h-2 z-10 bottom-4 left-1/2 transform -translate-x-1/2 rounded-[3px]" />
                  </div>

                  <div className="flex flex-row justify-between px-2 h-[34px]">
                    <Skeleton width="80%" />
                    <Skeleton width="15%" />
                  </div>
                  <div className="px-2">
                    <Skeleton />
                  </div>

                  <div className="pb-3 px-2">
                    <Skeleton width="100%" />
                  </div>
                </div>
              ) : (
                <div
                  className="flex flex-row w-full sm:w-[472px] h-[134px] border rounded-xl justify-between"
                  key={i}
                >
                  <div className="flex relative">
                    <Skeleton
                      variant="rectangular"
                      className="rounded-tl-xl rounded-bl-xl z-0 w-40"
                      height={134}
                    />
                    <div className="absolute bg-white w-14 h-2 z-10 bottom-4 left-1/2 transform -translate-x-1/2   rounded-[3px]" />
                  </div>

                  <div className="flex flex-col justify-between sm:w-full w-96 py-2 px-4">
                    <div className="flex flex-row justify-between h-10">
                      <Skeleton width="85%" />
                      <Skeleton width="10%" />
                    </div>
                    <Skeleton />
                    <Skeleton width="40%" />
                    <div className="flex flex-row justify-between pb-2 h-10">
                      <Skeleton width="60%" />
                      <Skeleton width="35%" />
                    </div>
                  </div>
                </div>
              )
            )}
        </div>
        <Skeleton width={125} height={40} sx={{ borderRadius: 45 }} />
      </div>
    </>
  );
};
export default AdsSkeleton;
