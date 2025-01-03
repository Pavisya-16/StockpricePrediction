import React, { useEffect, useState } from "react";
import StockSearch from "./StockSearch";
import StockWebSocket from "./StockWebSocket";
// import { fetchUserProfile } from "@/api/auth";
import { fetchUserProfile } from '@/services/auth.service';

import HomeNavBar from "@/components/HomeNavBar";

export default function SearchMain() {


  return (
    <div className="">
      <HomeNavBar />
      <div className="container mx-auto py-4 px-4 sm:px-6 mt-5 md:px-8 lg:px-12">
        <StockSearch />
      </div>
      <div className="grid grid-cols-subgrid gap-4 col-span-3">
        <StockWebSocket />
      </div>
    </div>
  );
}
