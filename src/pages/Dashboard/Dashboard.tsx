import React from 'react';
import { Link } from 'react-router-dom';
import BarChart from './BarChart.tsx';
import PieChart from './PieChart.tsx';
import Sidebar from './Sidebar.tsx';
import Slider from './Slider.tsx';

export default function Dashboard() {
  return (
    <div className="container">
      <div className="lg:grid-cols-[221px_auto] xl:grid-cols-[221px_auto_302px] grid gap-10">
        <Sidebar />
        <div className="flex flex-grow flex-col gap-10 xl:pb-10">
          <div className="">
            <h4 className="text-[#323232] mb-4 font-raleway font-bold text-31xl">LOREM IPSEM</h4>
            <div className="bg-white shadow-11xl rounded-2xl py-3 md:py-5 px-3 md:px-6">
              <div className="my-5">
                <div className="sm:pr-[90px] gap-4 pl-1 sm:grid sm:grid-cols-[290px_auto]">
                  <div className="flex justify-between">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="text-14xl flex-1 text-center text-[#1C1F37] flex-grow flex justify-center"
                      >
                        Lorem
                      </div>
                    ))}
                  </div>
                  <div className="text-14xl hidden sm:block flex-1 text-center text-[#1C1F37]">
                    Lorem
                  </div>
                </div>
                <div className="flex sm:flex-row flex-col sm:items-center gap-4 mt-4 ">
                  <div className="bg-white shadow-8xl p-2 grid md:grid-cols-[290px_auto] gap-4 flex-grow items-center">
                    <div className="flex gap-4 justify-between">
                      {[...Array(4)].map((_, i) => (
                        <input
                          key={i}
                          type="text"
                          className="bg-[#FFF2D7] rounded-full border border-[#00000021] py-1 px-1 placeholder:text-[#8695A0] text-[10px] w-[60px] text-center"
                          placeholder="Input"
                        />
                      ))}
                    </div>
                    <div className="max-w-[300px]">
                      <Slider />
                    </div>
                  </div>
                  <div className="sm:block hidden">
                    <button
                      type="button"
                      className="bg-[#FFCC66] rounded-full px-8 py-2 font-medium text-[#725095] text-[11px] whitespace-nowrap"
                    >
                      ➕
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-4">
                <div className="sm:hidden">
                  <button
                    type="button"
                    className="bg-[#FFCC66] rounded-full px-8 py-2 font-medium text-[#725095] text-[11px] whitespace-nowrap"
                  >
                    ➕
                  </button>
                </div>
                <button
                  type="button"
                  className="bg-[#FFCC66] rounded-full px-12 py-2 font-medium text-[#725095] text-[11px]"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
          <div className="bg-[#FFE3AC61] shadow-10xl rounded-md">
            <div className="flex justify-between py-4 px-5">
              <div className="flex gap-4 items-center">
                <img src="/images/Group 136.svg" className="w-7 h-7" alt="" />
                <span className="font-semibold text-[20px] text-[#1C1F37]">Lorem</span>
              </div>
              <Link to="/" className="flex gap-2 items-center hover:no-underline">
                <span className="text-[16px] text-[#1C1F37]">See Detail</span>
                <img src="/images/bx_bxs-chevron-right.svg" className="w-5 h-5" alt="" />
              </Link>
            </div>
            <hr className="border-[#DADADA]" />
            <div className="grid md:grid-cols-12 p-5 gap-12 items-center">
              <div className="md:col-span-5">
                <PieChart />
              </div>
              <div className="bg-[#FAFAFA] rounded-xl py-6 px-4 md:col-span-7">
                <div>
                  <h4 className="text-[#1C1F37] text-[16px] mb-1">Lorem</h4>
                  <div className="flex h-2 mb-4">
                    <div
                      className="border border-white h-full bg-[#F9DDA8] last:rounded-r-full first:rounded-l-full"
                      style={{ width: '15%' }}
                    />
                    <div
                      className="border border-white h-full bg-[#FFCC66] last:rounded-r-full first:rounded-l-full"
                      style={{ width: '35%' }}
                    />
                    <div
                      className="border border-white h-full bg-[#725095] last:rounded-r-full first:rounded-l-full"
                      style={{ width: '30%' }}
                    />
                    <div
                      className="border border-white h-full bg-[#F9DDA8] last:rounded-r-full first:rounded-l-full"
                      style={{ width: '20%' }}
                    />
                  </div>
                  <div>
                    <ul className="flex flex-col gap-3">
                      {[...Array(4)].map((_, i) => (
                        <li key={i} className="flex justify-between">
                          <div className="flex gap-3 items-center flex-grow">
                            <div className="rounded-full bg-[#FFE3AC] w-3 h-3" />
                            <span className="text-[#1C1F37] text-[14px]">Lorem Ipsem</span>
                          </div>
                          <div className="flex-grow justify-between items-center flex">
                            <span className="text-[#1C1F37] text-[14px]">21K</span>
                            <div className="text-[#725095] flex items-center justify-center text-[10px] bg-[#FFE3AC] w-[25px] h-[25px] rounded-full pt-[2px]">
                              27%
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <div className="mb-5">
              <div className="flex gap-2 md:gap-4 justify-between mb-4 px-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="text-14xl text-center text-[#1C1F37] flex-1">
                    Lorem
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white p-2 grid grid-cols-2 lg:grid-cols-4 justify-between gap-2 md:gap-4"
                  >
                    {[...Array(4)].map((_, i) => (
                      <input
                        key={i}
                        type="text"
                        className="bg-[#FFF2D7] rounded-full border border-[#00000021] py-2 px-3 placeholder:text-[#8695A0] text-[10px] w-auto max-w-none min-w-0 text-center"
                        placeholder="Input"
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex lg:col-start-2 xl:col-start-auto flex-col gap-6 xl:pb-0 pb-10">
          <div className="bg-white shadow-9xl rounded-2xl px-4 py-10">
            <h4 className="uppercase font-semibold text-27xl text-[#323232] mb-8 px-4">BADGES</h4>
            <div className="flex justify-between gap-4">
              <div className="bg-[#FFCC66] cursor-pointer w-20 h-20 rounded-full" />
              <div className="bg-[#F9DDA7] cursor-pointer w-20 h-20 rounded-full" />
              <div className="bg-[#725095] cursor-pointer w-20 h-20 rounded-full" />
            </div>
          </div>
          <div className="bg-white shadow-9xl rounded-2xl px-4 py-10">
            <h4 className="uppercase font-semibold text-27xl text-[#323232] mb-8 px-4">GOAL</h4>
            <div className="px-4 mb-8">
              <div className="bg-[#EBEBEB] rounded-[18px] h-[14px]">
                <div className="bg-[#FFCC66] h-full rounded-[18px]" style={{ width: '45%' }} />
              </div>
            </div>
            <div className="flex text-[#323232] text-27xl font-semibold justify-between px-4">
              <span>100</span>
              <span>100</span>
              <span>100</span>
            </div>
          </div>
          <div className="bg-white shadow-9xl rounded-2xl px-4 py-10">
            <div className="flex justify-between px-4 gap-4 mb-8 items-center">
              <h4 className="uppercase font-semibold text-27xl text-[#323232]">LOREM</h4>
              <button type="button">
                <img src="/images/icon-dots.svg" alt="" />
              </button>
            </div>
            <BarChart />
          </div>
        </div>
      </div>
    </div>
  );
}
