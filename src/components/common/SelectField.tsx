import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export interface SelectItemProps {
  id: number;
  name: string;
  describe: string;
  thumb: string[];
}

export interface SelectFieldProps {
  title?: string;
  value?: number;
  readonly?: boolean;
  variant: "medium" | "small";
  onChange?: (index: number, item: SelectItemProps) => void;
  items: SelectItemProps[];
}

export default function SelectField(props: SelectFieldProps) {
  const { onChange, value, variant, items, title, readonly } = props;

  const chnageValue = (index: number) => {
    onChange?.(index, items[index]);
  };

  const vrnt = {
    medium: {
      gap: "gap-8",
      subgap: "gap-3.5",
      unselect: {
        maxWidth: "",
        width: 142,
        height: 140,
        title: "text-20xl",
        describe: "text-11xl",
        card: "m-0 bg-white rounded-lg",
      },
      select: {
        maxWidth: "",
        card: `${readonly ? "rounded-lg" : "-m-6"} bg-yellow-700`,
        width: 168,
        height: 165,
        title: "text-26xl",
        describe: "text-17xl",
      },
    },
    small: {
      gap: "gap-4",
      subgap: "gap-2",
      unselect: {
        maxWidth: readonly ? `max-w-[216px]` : "",
        card: "m-0 bg-white rounded-lg",
        width: 91,
        height: 90,
        title: "text-4xl",
        describe: "text-lg",
      },
      select: {
        maxWidth: readonly ? `max-w-[216px]` : "",
        card: `${readonly ? "rounded-lg" : "-m-2"} bg-yellow-700`,
        width: 108,
        height: 106,
        title: "text-8xl",
        describe: "text-2xl",
      },
    },
  };

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1300 },
      items: variant === "medium" ? 4 : variant === "small" ? 2.5 : 2,
      slidesToSlide: 1,
    },
    laptop: {
      breakpoint: { max: 1300, min: 1024 },
      items: variant === "medium" ? 3 : variant === "small" ? 1.75 : 2,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 992 },
      items: variant === "medium" ? 3 : variant === "small" ? 3 : 2,
      slidesToSlide: 1,
    },
    semimobile: {
      breakpoint: { max: 992, min: 600 },
      items: 2.5,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 600, min: 0 },
      items: variant === "medium" ? 1 : variant === "small" ? 1.2 : 2,
    },
  };

  return (
    <div className={title ? "px-6 py-5 mb-2" : ""}>
      {title && (
        <h4 className="font-medium text-30xl mb-4 text-center lg:text-left">
          {title}
        </h4>
      )}

      <Carousel responsive={responsive}>
        {items.map(({ id, name, describe, thumb }, index) => {
          const getVrnt =
            vrnt[variant][index === value || readonly ? "select" : "unselect"];

          return (
            <div className={readonly ? "mx-2" : "mx-6"}>
              <div
                className={`inline-flex drop-shadow-1xl shadow-2xl p-1 cursor-pointer duration-150 ${getVrnt.maxWidth} ${getVrnt.card} ${vrnt[variant].subgap}`}
                key={id}
                onClick={readonly ? undefined : () => chnageValue(index)}
              >
                <div className="flex flex-col p-2.5 min-w-[63px]">
                  <h5
                    className={`text-black font-bold font-montserrat ${getVrnt.title}`}
                  >
                    {name}
                  </h5>
                  <p
                    className={`font-roboto text-gray-200 ${getVrnt.describe}`}
                  >
                    {describe}
                  </p>
                </div>
                <div
                  className="duration-300"
                  style={{
                    width: getVrnt.width,
                    height: getVrnt.height,
                  }}
                >
                  <div
                    className="duration-300 w-full h-full"
                    style={{
                      width: getVrnt.width,
                      height: getVrnt.height,
                    }}
                  >
                    <img
                      className="duration-300 w-full h-full"
                      src={thumb[value === index || readonly ? 1 : 0]}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}
