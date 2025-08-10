
interface ErrorMessageProps {
  message?: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <p className='bg-red-50 text-red-600 p-3 uppercase text-sm font-bold text-center'>{message || "ErrorMessage"}</p>
  )
}
