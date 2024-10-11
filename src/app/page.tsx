"use client";
import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Board from "../Board";

export default function Home() {
  return (
    <div className="w-screen h-screen relative">
      <Sidebar />
      <Navbar />
      <div className="md:pl-[250px] pl-[60px] pr-[20px] pt-[70px] w-full h-full overflow-y-auto">
        <Outlet />
        <Board></Board>
      </div>
    </div>
  );
}
