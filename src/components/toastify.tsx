import Image from 'next/image'
import { BsCheckLg } from 'react-icons/bs'
import { toast } from 'react-toastify'

export const toastSuccess = (message: string) => {
  return toast.success(
    <div>
      <div className="relative overflow-hidden py-4 flex flex-col justify-center items-start pl-20 rounded-4xl pr-5 text-white">
        <span className="text-lg">Well done!</span>
        <p className="text-sm">{message}</p>
        <div className="absolute left-0 bottom-0">
          <Image src="/toastify/green_bubbles.svg" alt="Success" width={50} height={50} objectFit="contain" />
        </div>
      </div>
      <div className="absolute flex justify-center items-center box-chat-success w-14 h-14  -top-7 left-5 rounded-full bg-success-toasttify-box">
        <BsCheckLg color="white" size={26} className="z-10" strokeWidth={1} />
      </div>
    </div>
  )
}

export const toastError = (message: string) => {
  return toast.error(
    <div>
      <div className="relative overflow-hidden py-4 flex flex-col justify-center items-start pl-20 rounded-4xl pr-5 text-white">
        <span className="text-lg">Oh snap!</span>
        <p className="text-sm">{message}</p>
        <div className="absolute left-0 bottom-0">
          <Image src="/toastify/red_bubbles.svg" alt="Error" width={70} height={70} objectFit="contain" />
        </div>
      </div>
      <div className="absolute flex justify-center items-center box-chat-error w-14 h-14  -top-7 left-5 rounded-full bg-error-toasttify-box">
        <BsCheckLg color="white" size={26} className="z-10" strokeWidth={1} />
      </div>
    </div>
  )
}
export const toastWarning = (message: string) => {
  return toast.warning(
    <div>
      <div className="relative overflow-hidden py-4 flex flex-col justify-center items-start pl-20 rounded-4xl pr-5 text-black">
        <span className="text-lg">Warning!</span>
        <p className="text-sm">{message}</p>
        <div className="absolute left-0 bottom-0">
          <Image src="/toastify/yellow_bubbles.svg" alt="Warning" width={80} height={80} objectFit="contain" />
        </div>
      </div>
      <div className="absolute flex justify-center items-center box-chat-warning w-14 h-14  -top-7 left-5 rounded-full bg-warning-toasttify-box">
        <BsCheckLg color="white" size={26} className="z-10" strokeWidth={1} />
      </div>
    </div>
  )
}
export const toastInfo = (message: string) => {
  return toast.info(
    <div>
      <div className="relative overflow-hidden py-4 flex flex-col justify-center items-start pl-20 rounded-4xl pr-5 text-black">
        <span className="text-lg">Info</span>
        <p className="text-sm">{message}</p>
        <div className="absolute left-0 bottom-0">
          <Image src="/toastify/blue_bubbles.svg" alt="Info" width={100} height={100} objectFit="contain" />
        </div>
      </div>
      <div className="absolute flex justify-center items-center box-chat-info w-14 h-14 -top-7 left-5 rounded-full bg-info-toasttify-box">
        <BsCheckLg color="white" size={26} className="z-10" strokeWidth={1} />
      </div>
    </div>
  )
}
