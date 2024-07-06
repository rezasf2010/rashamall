"use client";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import ProductSearchForm from "./ProductSearchForm";
import Image from "next/image";
import heroImg1 from "@/assets/images/heroImg1.jpg";
import heroImg2 from "@/assets/images/heroImg2.jpg";
import heroImg3 from "@/assets/images/heroImg3.jpg";
import { FaGreaterThan, FaLessThan } from "react-icons/fa";
import Link from "next/link";

const Hero = () => {
  const images = [heroImg1, heroImg2, heroImg3];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    appendDots: (dots) => (
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        style={{
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          background: "#fff",
        }}
      />
    ),
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <section className="bg-blue-200 mb-4 w-full flex flex-col items-center">
      <div className="w-full lg:w-11/12 flex flex-col items-center">
        <Slider {...settings} className="w-full">
          {images.map((image, index) => (
            <div key={index} className="w-full">
              <Image
                className="w-full bg-blue-200"
                src={image}
                alt={`Hero ${index + 1}`}
                priority={true}
              />
            </div>
          ))}
        </Slider>
        <ProductSearchForm />
      </div>
    </section>
  );
};

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <FaGreaterThan
      className={className}
      style={{
        ...style,
        color: "#9d9e9f",
        opacity: "70%",
        display: "block",
        right: "10px",
        zIndex: "1",
      }}
      onClick={onClick}
    />
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <FaLessThan
      className={className}
      style={{
        ...style,
        color: "#9d9e9f",
        opacity: "70%",
        display: "block",
        left: "10px",
        zIndex: "1",
      }}
      onClick={onClick}
    />
  );
};

export default Hero;
