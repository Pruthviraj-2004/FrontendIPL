import React from "react";
import { MdArrowDownward } from "react-icons/md";
import { animateScroll as scroll } from "react-scroll";

const ScrollDownArrow = ({ targetRef }) => {
  const scrollToNextSection = () => {
    if (targetRef.current) {
      const yOffset = -47; // Adjust this value if needed to offset the scroll position
      const targetOffset =
        targetRef.current.getBoundingClientRect().top +
        window.pageYOffset +
        yOffset;
      scroll.scrollTo(targetOffset, {
        duration: 800,
        smooth: "easeInOutQuad",
      });
    }
  };

  return (
    <div
      className="fixed bottom-5 left-1/2 transform -translate-x-1/2 cursor-pointer"
      onClick={scrollToNextSection}
    >
      <MdArrowDownward size={32} color="#000000" />
    </div>
  );
};

export default ScrollDownArrow;