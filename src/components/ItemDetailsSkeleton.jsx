import { Skeleton } from "@mui/material";
import React from "react";
import { slides } from "../constants";

const ItemDetailsSkeleton = () => (
  <>
    <Skeleton width="3%" height="30px" />
    <div className="flex flex-col sm:flex-row gap-10 mt-10">
      <div className="flex flex-col">
        <div className="w-full sm:w-96 sm:h-96">
          <Skeleton
            height={384}
            variant="rectangular"
            className="rounded-2xl"
          />
        </div>
        <div className="flex gap-3 mt-5 items-center justify-center px-2">
          {slides?.map((item, i) => (
            <Skeleton key={i} className="rounded-[8px] w-20" height={96} />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-14 w-full">
        <Skeleton width="20%" height={40} />
        <Skeleton width="80%" height={150} />
        <div className="flex flex-row justify-between h-12">
          <Skeleton width="90%" />
          <Skeleton width="5%" />
        </div>
        <div className="flex flex-row justify-between pb-2 h-10">
          <Skeleton width="60%" />
          <Skeleton width="35%" />
        </div>
      </div>
    </div>
  </>
);

export default ItemDetailsSkeleton;
