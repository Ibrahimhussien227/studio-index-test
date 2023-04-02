import React, { useState } from "react";

import { ReactComponent as Dot } from "../assets/dot.svg";

const ImageSlider = ({ slides, className }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <>
      <img src={slides[currentIndex].url} className={className} />
      <div className="flex absolute z-10 gap-1 bottom-2 left-1/2 transform -translate-x-1/2">
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className="text-2xl cursor-pointer fill-black"
          >
            <Dot
              fill={`${currentIndex === slideIndex ? "#00A0AB" : "#C7C7C7"}`}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default ImageSlider;
