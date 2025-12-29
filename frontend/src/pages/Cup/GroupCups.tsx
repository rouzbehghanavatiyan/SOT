import React from "react";
import { Button } from "../../components/Button";
import gymM1 from "../../assets/img/menGym1.png";
import MainTitle from "../../components/MainTitle";

const GroupCup = () => {
  const silverCup =
    "https://cdn11.bigcommerce.com/s-sdgfxtua0r/images/stencil/800x1194/products/3166/19609/4043-rank-crystal-trophy-black-base-ay__29919.1647547807.jpg?c=2";

  const num1 =
    "https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/7d2a57d4-23ee-4ccf-b34c-bd6ddbb1f4a8/width=1200/7d2a57d4-23ee-4ccf-b34c-bd6ddbb1f4a8.jpeg";
  const num3 =
    "https://alexkaplanphoto.com/wp-content/uploads/2024/01/Female-Headshot-1-595xh.webp";
  const num4 =
    "https://alexkaplanphoto.com/wp-content/uploads/2024/01/Corporate-headshot-of-a-man-indorrs-plan-background.webp";
  const num5 =
    "https://alexkaplanphoto.com/wp-content/uploads/2024/01/alexkaplanphoto_Professional_Headshots_and_Corporate_Portraits_37e36607-24a0-420f-b04a-9102c5e22eca-copy.webp";

  const participants = [
    { id: 1, img: gymM1, username: "elena53" },
    { id: 2, img: num3, username: "rose_52" },
    { id: 3, img: num4, username: "jack152" },
    { id: 4, img: num5, username: "biin" },
  ];

  return (
    <div className="w-full bg-white mb-5 h-[calc(100svh-120px)] md:h-[calc(100vh-95px)] lg:h-[calc(100vh-65px)]">
      <div className="max-w-6xl mx-auto">
        {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="flex flex-col items-center order-1 lg:order-2">
            <div className="relative">
              <img
                src={silverCup}
                alt="Silver Cup"
                className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute -bottom-2 left-0 right-0 bg-gradient-to-r from-orange to-orange-600 text-white text-center py-2 px-4 rounded-full  "></div>
              <span className="flex justify-center font-bold text-lg text-gray-600 md:text-xl">
                Cup city
              </span>
            </div>
          </div>
        </div> */}
        <MainTitle title="Group A" />
        <div className="lg:hidden mt-8">
          <div className="flex justify-between items-center px-8">
            <div className="flex bg-white border-gray-300 border p-5 rounded-2xl flex-col items-center space-y-4">
              {participants.slice(0, 2).map((participant, index) => (
                <React.Fragment key={participant.id}>
                  <div className="text-center">
                    <img
                      src={participant.img}
                      alt={participant.username}
                      className="w-12 h-12 rounded-full object-cover  shadow mx-auto"
                    />
                    <span className="text-xs text-gray-600 px-2 py-1 rounded-full mt-1 inline-block">
                      {participant.username}
                    </span>
                  </div>
                  {index === 0 && <div className="h-6 w-0.5 bg-gray-600"></div>}
                </React.Fragment>
              ))}
            </div>
            <div className="w-[90px] h-[1px] bg-gray-600 mx-auto"></div>
            <div className="flex bg-white border-gray-300 border p-5 rounded-2xl flex-col items-center space-y-4">
              {participants.slice(2).map((participant, index) => (
                <React.Fragment key={participant.id}>
                  <div className="text-center">
                    <img
                      src={participant.img}
                      alt={participant.username}
                      className="w-12 h-12 rounded-full object-cover  shadow mx-auto"
                    />
                    <span className="text-xs text-gray-600 px-2 py-1 rounded-full mt-1 inline-block">
                      {participant.username}
                    </span>
                  </div>
                  {index === 0 && <div className="h-6 w-0.5 bg-gray-600"></div>}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:hidden mt-8">
          <div className="flex justify-between items-center px-8">
            <div className="flex bg-white border-gray-300 border p-5 rounded-2xl flex-col items-center space-y-4">
              {participants.slice(0, 2).map((participant, index) => (
                <React.Fragment key={participant.id}>
                  <div className="text-center">
                    <img
                      src={participant.img}
                      alt={participant.username}
                      className="w-12 h-12 rounded-full object-cover  shadow mx-auto"
                    />
                    <span className="text-xs text-gray-600 px-2 py-1 rounded-full mt-1 inline-block">
                      {participant.username}
                    </span>
                  </div>
                  {index === 0 && <div className="h-6 w-0.5 bg-gray-600"></div>}
                </React.Fragment>
              ))}
            </div>
            <div className="w-[90px] h-[1px] bg-gray-600 mx-auto"></div>
            <div className="flex bg-white border-gray-300 border p-5 rounded-2xl flex-col items-center space-y-4">
              {participants.slice(2).map((participant, index) => (
                <React.Fragment key={participant.id}>
                  <div className="text-center">
                    <img
                      src={participant.img}
                      alt={participant.username}
                      className="w-12 h-12 rounded-full object-cover  shadow mx-auto"
                    />
                    <span className="text-xs text-gray-600 px-2 py-1 rounded-full mt-1 inline-block">
                      {participant.username}
                    </span>
                  </div>
                  {index === 0 && <div className="h-6 w-0.5 bg-gray-600"></div>}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:hidden mt-8">
          <div className="flex justify-between items-center px-8">
            <div className="flex bg-white border-gray-300 border p-5 rounded-2xl flex-col items-center space-y-4">
              {participants.slice(0, 2).map((participant, index) => (
                <React.Fragment key={participant.id}>
                  <div className="text-center">
                    <img
                      src={participant.img}
                      alt={participant.username}
                      className="w-12 h-12 rounded-full object-cover  shadow mx-auto"
                    />
                    <span className="text-xs text-gray-600 px-2 py-1 rounded-full mt-1 inline-block">
                      {participant.username}
                    </span>
                  </div>
                  {index === 0 && <div className="h-6 w-0.5 bg-gray-600"></div>}
                </React.Fragment>
              ))}
            </div>
            <div className="w-[90px] h-[1px] bg-gray-600 mx-auto"></div>
            <div className="flex bg-white border-gray-300 border p-5 rounded-2xl flex-col items-center space-y-4">
              {participants.slice(2).map((participant, index) => (
                <React.Fragment key={participant.id}>
                  <div className="text-center">
                    <img
                      src={participant.img}
                      alt={participant.username}
                      className="w-12 h-12 rounded-full object-cover  shadow mx-auto"
                    />
                    <span className="text-xs text-gray-600 px-2 py-1 rounded-full mt-1 inline-block">
                      {participant.username}
                    </span>
                  </div>
                  {index === 0 && <div className="h-6 w-0.5 bg-gray-600"></div>}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupCup;
// return (
//   <div className="flex justify-center">
//     <div className="flex " >
//       <Button variant={"white"} label="Inside" />
//     </div>
//     <div className="">
//       <div className=" flex flex-col justify-center" >
//         <img src={silverCup} width={300} className="m-5" height={300} />
//         <span className=" flex font-bold text-2xl justify-center" > cup city </span>
//       </div>
//       <div className=" flex gap-20  justify-between" >
//         <div className="flex flex-col" >
//           <div className="flex justify-center " >
//             <PersonIcon className="font50 border rounded-full p-1" />
//           </div>
//           <div className="flex" >
//             <span className="m-2 p-2">
//               <img src={num2} width={50} className="my-2 rounded-full" height={50} />
//               <span className="flex items-center justify-center bg-orange-ghost" >
//                 elena53
//               </span>
//             </span>
//             <span className="mt-8" >
//               {"__"}
//             </span>
//             <span className="m-2  p-2">
//               <img src={num3} width={50} className="my-2 rounded-full" height={50} />
//               <span className="flex items-center justify-center bg-orange-ghost" >
//                 rose_52
//               </span>
//             </span>
//           </div>
//         </div>
//         <div className="flex flex-col" >
//           <div className="flex justify-center " >
//             <PersonIcon className="font50 border rounded-full p-1" />
//           </div>
//           <div className="flex" >
//             <span className="m-2  p-2">
//               <img src={num4} width={50} className="my-2 rounded-full" height={50} />
//               <span className="flex items-center justify-center bg-orange-ghost">
//                 jack152
//               </span>
//             </span>
//             <span className="mt-8" >
//               {"__"}
//             </span>
//             <span className="m-2  p-2">
//               <img src={num5} width={50} className="my-2 rounded-full" height={50} />
//               <span className="flex items-center justify-center bg-orange-ghost">
//                 biiin
//               </span>
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div >
// );
