import { useNavigate } from "react-router-dom";
import MainTitle from "../../components/MainTitle";

const MainCup = () => {
  const navigate = useNavigate();
  const silverCup =
    "https://cdn11.bigcommerce.com/s-sdgfxtua0r/images/stencil/800x1194/products/3166/19609/4043-rank-crystal-trophy-black-base-ay__29919.1647547807.jpg?c=2";

  const handleClientGroup = () => {
    navigate("/cup/group");
  };

  return (
    <div className="w-full bg-white my-5">
      <MainTitle title="Cup city" />
      <div className="max-w-6xl mx-auto">
        <div className="relative ">
          <span className=" relative grid grid-cols-6">
            <div className="col-span-2 lg:hidden mt-8">
              <div className="flex relative  flex-col justify-between items-center px-8">
                <div className="flex shadow-lg bg-gray-200 text-white border-gray-300 border p-5 rounded-2xl flex-col items-center space-y-4">
                  Group A
                </div>
                <div className="w-[1px] h-[20px] bg-gray-600 mx-auto"></div>
                <div className="w-[56px] h-[1px] bg-gray-600 absolute top-1/2 left-1/2"></div>
                <div className="flex shadow-lg bg-gray-200 text-white border-gray-300 border p-5 rounded-2xl flex-col items-center space-y-4">
                  Group B
                </div>
              </div>
            </div>
            <div className="col-span-1 mt-10 me-16 flex justify-center items-center">
              <span className="bg-gray-200 p-4 px-5 rounded-full text-white">
                ?
              </span>
            </div>
            <div className="col-span-1 mt-10 ms-14 flex justify-center items-center">
              <span className="bg-gray-200 ms-2 p-4 px-5 rounded-full text-white">
                ?
              </span>
            </div>
            <div className="col-span-2 lg:hidden mt-8">
              <div className="flex relative flex-col justify-between items-center px-8">
                <div className="flex shadow-lg bg-gray-200 text-white border-gray-300 border p-5 rounded-2xl flex-col items-center space-y-4">
                  Group C
                </div>
                <div className="w-[1px] h-[20px] bg-gray-600 mx-auto"></div>
                <div className="w-[56px] h-[1px] bg-gray-600 absolute top-1/2 right-1/2"></div>

                <div
                  onClick={handleClientGroup}
                  className="flex shadow-lg bg-white text-gray-800 border-gray-300 border p-5 rounded-2xl flex-col items-center space-y-4"
                >
                  Group D
                </div>
              </div>
            </div>
            <div className="absolute left-44 top-1/2 w-24 h-16">
              <div className="w-[20vw] h-[1px] bg-gray-600 absolute top-5  left-1"></div>
            </div>
            <div className="absolute w-[1px] h-[90px] bg-gray-600 bottom-0 left-56" />
          </span>
          <div className="grid  grid-cols-1 lg:grid-cols-3 items-center">
            <div className="flex flex-col items-center order-1 lg:order-2">
              <div className="relative z-10">
                <img
                  src={silverCup}
                  alt="Silver Cup"
                  className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
          </div>
          <span className="relative grid grid-cols-6">
            <div className="col-span-2 lg:hidden mt-8">
              <div className="flex relative  flex-col justify-between items-center px-8">
                <div className="flex shadow-lg bg-gray-200 text-white border-gray-300 border p-5 rounded-2xl flex-col items-center space-y-4">
                  Group A
                </div>
                <div className="w-[1px] h-[20px] bg-gray-600 mx-auto"></div>
                <div className="w-[56px] h-[1px] bg-gray-600 absolute top-1/2 left-1/2"></div>
                <div className="flex shadow-lg bg-gray-200 text-white border-gray-300 border p-5 rounded-2xl flex-col items-center space-y-4">
                  Group B
                </div>
              </div>
            </div>
            <div className="col-span-1 mt-10 me-16 flex justify-center items-center">
              <span className="bg-gray-200 p-4 px-5 rounded-full text-white">
                ?
              </span>
            </div>
            <div className="col-span-1 mt-10 ms-14 flex justify-center items-center">
              <span className="bg-gray-200 ms-2 p-4 px-5 rounded-full text-white">
                ?
              </span>
            </div>
            <div className="col-span-2 lg:hidden mt-8">
              <div className="flex relative flex-col justify-between items-center px-8">
                <div className="flex shadow-lg bg-gray-200 text-white border-gray-300 border p-5 rounded-2xl flex-col items-center space-y-4">
                  Group C
                </div>
                <div className="w-[1px] h-[20px] bg-gray-600 mx-auto"></div>
                <div className="w-[56px] h-[1px] bg-gray-600 absolute top-1/2 right-1/2"></div>

                <div className="flex shadow-lg bg-gray-200 text-white border-gray-300 border p-5 rounded-2xl flex-col items-center space-y-4">
                  Group D
                </div>
              </div>
            </div>
            <div className="absolute left-44 top-1/2 w-24 h-16">
              <div className="w-[20vw] h-[1px] bg-gray-600 absolute top-5  left-1"></div>
            </div>
            <div className="absolute w-[1px] h-[130px] bg-gray-600 top-0 left-56" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default MainCup;
