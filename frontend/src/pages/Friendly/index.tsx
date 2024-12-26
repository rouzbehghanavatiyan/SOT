import React, { useState } from "react";
import { Button } from "../../components/Button";
import Input from "../../components/Input";
import SearchIcon from '@mui/icons-material/Search';

const Friendly = () => {
  const [searchingLoby, setSearchingLoby] = useState("")

  return (
    <>
      <Button className="" label="Create" variant={"secondary"} />
      <div className="flex w-dvw" >
        <div className="m-auto p-auto h-full w-1/2 border-dotted p-4  border-2">
          <div className="grid gap-5 w-72" >
            <div className="my-4 flex justify-between">
              <span className="p-4 bg-orange-hover text-white " >
                User 1
              </span  >
              <span className="p-4 bg-orange-hover text-white">
                User 2
              </span>
            </div>
            <div className="mt-4 flex justify-between" >
              <span className="p-4 bg-orange-hover text-white" >
                User 3
              </span  >
              <span className="p-4 bg-orange-hover text-white">
                User 4
              </span>
            </div>
          </div>
        </div>
        <div className="w-1/2">
          <div className="ms-4 mb-2 items-center" >
            <Input
              className="col-span-1"
              value={searchingLoby}
              onChange={(e: any) => setSearchingLoby(e.target.value)}
              placeholder="Search . . ."
            />
            <span>
              <SearchIcon className="text-gray-800 ms-2 " />
            </span>
          </div>
          <div className=" mx-5 w-96" >
            <div className=" justify-between bg-gray-100 p-4">
              <div className="border-b my-2 p-2 grid gap-3 grid-cols-2" >
                <span className=" " >
                  1. bad_room
                </span>
                <span className="text-gray-900 flex justify-end">
                  4 player
                </span>
              </div>
              <div className="border-b my-2 p-2 grid gap-3 grid-cols-2" >
                <span className=" " >
                  2. bad_room
                </span>
                <span className="text-gray-900 flex justify-end">
                  6 player
                </span>
              </div>
              <div className="border-b my-2 p-2 grid gap-3 grid-cols-2" >
                <span className=" " >
                  3. bad_room
                </span>
                <span className="text-gray-900 flex justify-end">
                  3 player
                </span>
              </div>
              <div className="border-b my-2 p-2 grid gap-3 grid-cols-2" >
                <span className=" " >
                  4. bad_room
                </span>
                <span className="text-gray-900 flex justify-end">
                  2 player
                </span>
              </div>
              <div className="border-b my-2 p-2 grid gap-3 grid-cols-2" >
                <span className=" " >
                  5. bad_room
                </span>
                <span className="text-gray-900 flex justify-end">
                  2 player
                </span>
              </div>
            </div>
          </div>
        </div>
      </div >
    </>

  );
};

export default Friendly;
