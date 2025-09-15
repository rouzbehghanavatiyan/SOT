import React, { useState } from "react";
import { Button } from "../../components/Button";
import Input from "../../components/Input";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Friendly = () => {
  const [searchingLoby, setSearchingLoby] = useState("");

  return (
    <>
      <div className="flex mt-8">
        <div className="w-1/2">
          <Button className="" label="Create" variant={"green"} />
          <div className="m-auto p-auto rounded-xl shadow-card mt-6 border-dotted border-2">
            <div className="bg-white p-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="flex gap-1 bg-gray-800 text-white rounded-lg py-2 px-5 items-center">
                  <span>
                    <AccountCircleIcon className="font50" />
                  </span>
                  <span className=" font-bold ">User 2</span>
                </div>
                <div className="flex gap-1 bg-gray-800 text-white rounded-lg py-2 px-5 items-center">
                  <span>
                    <AccountCircleIcon className="font50" />
                  </span>
                  <span className=" font-bold ">User 3</span>
                </div>
                <div className="flex gap-1 bg-gray-800 text-white rounded-lg py-2 px-5 items-center">
                  <span>
                    <AccountCircleIcon className="font50" />
                  </span>
                  <span className=" font-bold ">User 4</span>
                </div>
                <div className="flex gap-1 bg-gray-800 text-white rounded-lg py-2 px-5 items-center">
                  <span>
                    <AccountCircleIcon className="font50" />
                  </span>
                  <span className=" font-bold ">User 5</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/2">
          <div className="flex  ms-4 mb-2 items-center">
            <Input
              className="rounded-xl"
              value={searchingLoby}
              onChange={(e: any) => setSearchingLoby(e.target.value)}
              placeholder="Search . . ."
            />
            <span className="">
              <SearchIcon className="text-gray-800 ms-2 font30 cursor-pointer " />
            </span>
          </div>
          <div className="bg-red mx-5 w-96">
            <div className="overflow-scroll min-h-10 max-h-96 justify-between bg-gray-100 p-4">
              <div className="border-b my-2 p-2 grid gap-3 grid-cols-2">
                <span className=" ">1. bad_room</span>
                <span className="text-gray-900 flex justify-end">4 User</span>
              </div>
              <div className="border-b my-2 p-2 grid gap-3 grid-cols-2">
                <span className=" ">2. bad_room</span>
                <span className="text-gray-900 flex justify-end">6 User</span>
              </div>
              <div className="border-b my-2 p-2 grid gap-3 grid-cols-2">
                <span className=" ">3. bad_room</span>
                <span className="text-gray-900 flex justify-end">3 User</span>
              </div>
              <div className="border-b my-2 p-2 grid gap-3 grid-cols-2">
                <span className=" ">3. bad_room</span>
                <span className="text-gray-900 flex justify-end">3 User</span>
              </div>
              <div className="border-b my-2 p-2 grid gap-3 grid-cols-2">
                <span className=" ">3. bad_room</span>
                <span className="text-gray-900 flex justify-end">3 User</span>
              </div>
              <div className="border-b my-2 p-2 grid gap-3 grid-cols-2">
                <span className=" ">3. bad_room</span>
                <span className="text-gray-900 flex justify-end">3 User</span>
              </div>
              <div className="border-b my-2 p-2 grid gap-3 grid-cols-2">
                <span className=" ">4. bad_room</span>
                <span className="text-gray-900 flex justify-end">2 User</span>
              </div>
              <div className="border-b my-2 p-2 grid gap-3 grid-cols-2">
                <span className=" ">5. bad_room</span>
                <span className="text-gray-900 flex justify-end">2 User</span>
              </div>
              <div className="border-b my-2 p-2 grid gap-3 grid-cols-2">
                <span className=" ">1. bad_room</span>
                <span className="text-gray-900 flex justify-end">4 User</span>
              </div>
              <div className="border-b my-2 p-2 grid gap-3 grid-cols-2">
                <span className=" ">2. bad_room</span>
                <span className="text-gray-900 flex justify-end">6 User</span>
              </div>
              <div className="border-b my-2 p-2 grid gap-3 grid-cols-2">
                <span className=" ">3. bad_room</span>
                <span className="text-gray-900 flex justify-end">3 User</span>
              </div>
              <div className="border-b my-2 p-2 grid gap-3 grid-cols-2">
                <span className=" ">3. bad_room</span>
                <span className="text-gray-900 flex justify-end">3 User</span>
              </div>
              <div className="border-b my-2 p-2 grid gap-3 grid-cols-2">
                <span className=" ">3. bad_room</span>
                <span className="text-gray-900 flex justify-end">3 User</span>
              </div>
              <div className="border-b my-2 p-2 grid gap-3 grid-cols-2">
                <span className=" ">3. bad_room</span>
                <span className="text-gray-900 flex justify-end">3 User</span>
              </div>
              <div className="border-b my-2 p-2 grid gap-3 grid-cols-2">
                <span className=" ">4. bad_room</span>
                <span className="text-gray-900 flex justify-end">2 User</span>
              </div>
              <div className="border-b my-2 p-2 grid gap-3 grid-cols-2">
                <span className=" ">5. bad_room</span>
                <span className="text-gray-900 flex justify-end">2 User</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Friendly;
