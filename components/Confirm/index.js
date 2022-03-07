import RideSelector from '../RideSelector'
import { useContext } from 'react'
import { UberContext } from '../../context/uberContext'

const style = {
  wrapper: `flex-1 h-full flex flex-col justify-between`,
  rideSelectorContainer: `h-full flex flex-col overflow-auto`,
  confirmButtonContainer: ` border-t-2 cursor-pointer z-10`,
  confirmButton: `bg-black text-white m-4 py-4 text-center text-xl`,
}

const Confirm = () => {
  const {
    pickup,
    dropOff,
    selectedRide,
    pickupCoordinates,
    dropOffCoordinates,
  } = useContext(UberContext)

  const storeTripDetails = async (pickup, dropOff) => {
    try {
    } catch (error) {
      console.error(error)
    }
  }

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
            Confirm {selectedRide.service || 'UberX'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Confirm