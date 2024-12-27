import React from "react";
import { Button } from "../../components/Button";

const Cup = () => {
  const silverCup =
    "https://cdn11.bigcommerce.com/s-sdgfxtua0r/images/stencil/800x1194/products/3166/19609/4043-rank-crystal-trophy-black-base-ay__29919.1647547807.jpg?c=2";

  const num1 = "https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/7d2a57d4-23ee-4ccf-b34c-bd6ddbb1f4a8/width=1200/7d2a57d4-23ee-4ccf-b34c-bd6ddbb1f4a8.jpeg"
  const num2 = "https://static.wixstatic.com/media/7d5b6a_af75de865a2a4f87a12e9db4a4b977a0~mv2.jpg/v1/fill/w_640,h_682,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/7d5b6a_af75de865a2a4f87a12e9db4a4b977a0~mv2.jpg"
  const num3 = "https://alexkaplanphoto.com/wp-content/uploads/2024/01/Female-Headshot-1-595xh.webp"
  const num4 = "https://alexkaplanphoto.com/wp-content/uploads/2024/01/Corporate-headshot-of-a-man-indorrs-plan-background.webp"
  const num5 = "https://alexkaplanphoto.com/wp-content/uploads/2024/01/alexkaplanphoto_Professional_Headshots_and_Corporate_Portraits_37e36607-24a0-420f-b04a-9102c5e22eca-copy.webp"
  return (
    <div className="flex justify-center">
      <div className="flex " >
        <Button variant={"white"} label="Inside" />
      </div>
      <div className="">
        <div className=" flex flex-col justify-center" >
          <img src={silverCup} width={300} className="m-5" height={300} />
          <span className=" flex font-bold text-2xl justify-center" > cup city </span>
        </div>
        <div className=" flex gap-20 justify-between" >
          <div className="flex  " >
            <span className="m-2 p-2">
              <img src={num2} width={50} className="my-2 rounded-full" height={50} />
              <span className="flex items-center justify-center bg-orange-ghost" >
                elena53
              </span>
            </span>
            <span className="mt-8" >
              {"__"}
            </span>
            <span className="m-2  p-2">
              <img src={num3} width={50} className="my-2 rounded-full" height={50} />
              <span className="flex items-center justify-center bg-orange-ghost" >
                rose_52
              </span>
            </span>
          </div>
          <div className="flex" >
            <span className="m-2  p-2">
              <img src={num4} width={50} className="my-2 rounded-full" height={50} />
              <span className="flex items-center justify-center bg-orange-ghost">
                jack152
              </span>
            </span>
            <span className="mt-8" >
              {"__"}
            </span>
            <span className="m-2  p-2">
              <img src={num5} width={50} className="my-2 rounded-full" height={50} />
              <span className="flex items-center justify-center bg-orange-ghost">
                biiin
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cup;



















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