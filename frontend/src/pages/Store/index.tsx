import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import { useEffect, useState } from "react";
import { allStore } from "../../services/nest";
import StoreMode from "./StoreMode";

const Store: React.FC<any> = () => {
  const [allStoreList, setAllStoreList] = useState<any>([]);
  const [showStoreModeModal, setShowStoreModeModal] = useState<boolean>(false);

  const handleGetAllList = async () => {
    const res = await allStore();
    console.log(res);
    const { data, status } = res?.data;
    if (status === 0) {
      setAllStoreList(data);
    }
  };

  useEffect(() => {
    handleGetAllList();
  }, []);

  const handleShowMod = () => {
    setShowStoreModeModal(true);
  };

  return (
    <div className="flex flex-col justify-center mt-5 mb-12 h-[calc(100svh-165px)] md:h-[calc(100vh-95px)] lg:h-[calc(100vh-65px)]">
      {allStoreList?.map((store: any) => (
        <div
          onClick={handleShowMod}
          key={store?.id}
          className="bg-white border rounded-lg p-4 m-4 shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer hover:bg-gray-100"
        >
          <div className="mt-2 flex justify-between items-center">
            <div className="text-gray-800 text-lg flex justify-between font-semibold">
              <span>{store?.name}</span>
            </div>
            <ConfirmationNumberIcon className="font25  text-green-dark" />
          </div>
          <p className="bg-orange-ghost text-gray-800 flex p-2">{store?.des}</p>
          <div className="text-gray-900">${store?.price}</div>
        </div>
      ))}
      {showStoreModeModal && (
        <StoreMode
          showStoreModeModal={showStoreModeModal}
          setShowStoreModeModal={setShowStoreModeModal}
        />
      )}
    </div>
  );
};

export default Store;
