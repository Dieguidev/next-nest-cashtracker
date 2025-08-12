'use client'

import { validateTokenAction } from "@/actions";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";

import { toast } from "react-toastify";

interface ValidateTokenFormProps {
  setIsValidToken: React.Dispatch<React.SetStateAction<boolean>>;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  token: string;
}


export const ValidateTokenForm = ({ setIsValidToken, setToken, token }: ValidateTokenFormProps) => {


  const handleChange = (token: string) => {

    setToken(token);
  }

  const handleComplete = async (token: string) => {

    const res = await validateTokenAction({ token });
    if (res.success) {
      toast.success(res.message);
      setIsValidToken(true);
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
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
      </PinInput>
    </div>
  )
}
