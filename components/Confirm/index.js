import RideSelector from "../RideSelector";
import { useContext } from "react";
import { UberContext } from "../../contexts/uberContext";
import { ethers } from "ethers";

const style = {
  wrapper: `flex-1 h-full flex flex-col justify-between`,
  rideSelectorContainer: `h-full flex flex-col overflow-auto`,
  confirmButtonContainer: ` border-t-2 cursor-pointer z-10`,
  confirmButton: `bg-black text-white m-4 py-4 text-center text-xl`,
};

const Confirm = () => {
  const {
    currentAccount,
    pickup,
    dropOff,
    price,
    selectedRide,
    pickupCoordinates,
    dropOffCoordinates,
    metamask,
  } = useContext(UberContext);

  const storeTripDetails = async (pickup, dropOff) => {
    try {
      await fetch("/api/db/saveTrips", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pickupLocation: pickup,
          dropoffLocation: dropOff,
          userWalletAddress: currentAccount,
          price: price,
          selectedRide: selectedRide,
        }),
      });

      await metamask.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: currentAccount,
            to: process.env.NEXT_PUBLIC_UBER_ADDRESS,
            gas: "0x7EF40", // 520000 Gwei
            value: ethers.utils.parseEther(price)._hex,
          },
        ],
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={style.wrapper}>
      <div className={style.rideSelectorContainer}>
        {pickupCoordinates && dropOffCoordinates && <RideSelector />}
      </div>
      <div className={style.confirmButtonContainer}>
        <div className={style.confirmButtonContainer}>
          <div
            className={style.confirmButton}
            onClick={() => storeTripDetails(pickup, dropOff)}
          >
            Confirm {selectedRide.service || "UberX"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
