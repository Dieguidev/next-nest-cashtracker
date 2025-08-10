'use client'

import { confirmAccountAction } from "@/actions"
import { PinInput, PinInputField } from "@chakra-ui/pin-input"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "react-toastify"
// import { toast } from "sonner"

export const ConfirmAccountForm = () => {

  const router = useRouter();

  const [token, setToken] = useState("")

  const handleChange = (token: string) => {
    setToken(token);
  }

  const handleComplete = async (token: string) => {
    const res = await confirmAccountAction({ token });
    if (res.success) {
      toast.success(res.message, {
        onClose: () => {
          router.push("/auth/login");
        }
      });
      setToken("");
    } else {
      toast.error(res.message);
      setToken("");
    }
  }

  return (
    <div className="flex justify-center gap-5 my-10">
      <PinInput
        value={token}
        onChange={handleChange}
        onComplete={handleComplete}
      >
        <PinInputField
          className="h-10 w-10 border border-gray-300 shadow rounded-lg text-center placeholder-white "
        />
        <PinInputField
          className="h-10 w-10 border border-gray-300 shadow rounded-lg text-center placeholder-white "
        />
        <PinInputField
          className="h-10 w-10 border border-gray-300 shadow rounded-lg text-center placeholder-white "
        />
        <PinInputField
          className="h-10 w-10 border border-gray-300 shadow rounded-lg text-center placeholder-white "
        />
        <PinInputField
          className="h-10 w-10 border border-gray-300 shadow rounded-lg text-center placeholder-white "
        />
        <PinInputField
          className="h-10 w-10 border border-gray-300 shadow rounded-lg text-center placeholder-white "
        />
      </PinInput>
    </div>
  )
}
