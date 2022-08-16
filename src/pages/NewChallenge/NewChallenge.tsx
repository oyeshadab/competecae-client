import React, { useEffect, useState } from "react";
import SelectField, {
  SelectItemProps,
} from "../../components/common/SelectField.tsx";

import types from "./types.json";
import categories from "./categories.json";
import Fitness from "./Fitness.json";
import Finance from "./Finance.json";
import Habits from "./Habits.json";
import Learning from "./Learning.json";

import LinkButton from "../../components/common/LinkButton.tsx";

// const Fitness = [
//   {
//     id: 0,
//     name: "Excercise",
//     thumb: ["/images/Group 148.svg", "/images/Group 149.svg"],
//   },
//   {
//     id: 1,
//     name: "Weight",
//     thumb: ["/images/Group 148.svg", "/images/Group 149.svg"],
//   },
//   {
//     id: 2,
//     name: "Mental",
//     thumb: ["/images/Group 148.svg", "/images/Group 149.svg"],
//   },
//   {
//     id: 3,
//     name: "Physique",
//     thumb: ["/images/Group 148.svg", "/images/Group 149.svg"],
//   },
// ];

// const Finance = [
//   {
//     id: 0,
//     name: "Financial Habits",
//     thumb: ["/images/Group 148.svg", "/images/Group 149.svg"],
//   },
//   {
//     id: 1,
//     name: "Debt",
//     thumb: ["/images/Group 148.svg", "/images/Group 149.svg"],
//   },
//   {
//     id: 3,
//     name: "Charity",
//     thumb: ["/images/Group 148.svg", "/images/Group 149.svg"],
//   },
//   {
//     id: 4,
//     name: "Stocks",
//     thumb: ["/images/Group 148.svg", "/images/Group 149.svg"],
//   },
// ];

// const Habits = [
//   {
//     id: 0,
//     name: "Reduce Bad Habits",

//   },
//   {
//     id: 1,
//     name: "Create Good Habits",
//   },
// ];

// const Learning = [
//   {
//     id: 0,
//     name: "Books",
//   },
// ];

export default function NewChallenge() {
  useEffect(() => {
    setSubcategory(0);
  }, []);

  const defaultState = [
    types.items[0],
    categories.items[0],
    {
      id: 0,
      name: "Excercise",
      thumb: ["/images/Group 148.svg", "/images/Group 149.svg"],
    },
  ];
  const [items, setItems] = useState(Finance);
  const [subcategories, setsubcategories] = useState(Fitness);

  const [selected, setSelected] = useState<SelectItemProps[]>(defaultState);
  const [typesValue, setTypesValue] = useState<number>(0);
  const changeTypes = (index: number, item: SelectItemProps) => {
    console.log("index", index);
    console.log("item", item);

    setTypesValue(index);
    setSelected((v) => {
      const demo = v;
      demo[0] = item;
      return demo;
    });
    selected[0] = item;
  };
  const [category, setCategory] = useState<number>(0);
  const changeCategory = (index: number, item: SelectItemProps) => {
    console.log("index", index);
    console.log("item", item);
    if (item.name == "Fitness") {
      setsubcategories(Fitness);
    }
    if (item.name == "Finance") {
      setsubcategories(Finance);
    }
    if (item.name == "Habits") {
      setsubcategories(Habits);
    }
    if (item.name == "Learning") {
      setsubcategories(Learning);
    }
    setCategory(index);
    setSelected((v) => {
      const demo = v;
      demo[1] = item;
      return demo;
    });
  };
  const [subcategory, setSubcategory] = useState<number>(0);
  const changeSubcategory = (index: number, item: SelectItemProps) => {
    console.log("index", index);
    console.log("item", item);
    setSubcategory(index);
    setSelected((v) => {
      console.log(v);
      const demo = v;
      demo[2] = item;
      return demo;
    });
  };

  return (
    <main className="md:mt-28 mt-10 shadow-1xl bg-red rounded-lg py-3.5 px-6 container mb-5">
      <h2 className="font-bold text-32xl text-center mt-3">
        Create Competition
      </h2>
      <div>
        <div className="hidden lg:block">
          <SelectField
            value={typesValue}
            onChange={changeTypes}
            variant="medium"
            {...types}
          />
        </div>
        <div className="block lg:hidden">
          <SelectField
            value={typesValue}
            onChange={changeTypes}
            variant="small"
            {...types}
          />
        </div>

        <div className="lg:flex">
          <div className="lg:w-1/2 lg:pr-7">
            <SelectField
              value={category}
              onChange={changeCategory}
              variant="small"
              {...categories}
            />
          </div>
          <div className="lg:w-1/2 lg:pl-7">
            <SelectField
              value={subcategory}
              onChange={changeSubcategory}
              variant="small"
              {...subcategories}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end mb-4">
        <LinkButton
          url="/confirm-details"
          state={{ selectedItems: selected.filter((v) => v !== undefined) }}
          text="Next"
          endIcon="/images/Arrow 1 (1).svg"
        />
      </div>
    </main>
  );
}
