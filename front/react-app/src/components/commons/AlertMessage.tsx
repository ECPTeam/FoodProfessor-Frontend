type AlertMessageProps = {
  open: boolean
  message: string
}

const AlertMessage = ({ open, message }: AlertMessageProps) => {
  return (
    <>
      {open ? (
        <div className="my-6 mx-auto max-w-3xl text-center px-12 py-4 bg-alertColor border-alertBorderColor text-alertTextColor font-bold rounded-md">
          {message}
        </div>
      ) : (
        <></>
      )}
    </>
  )
}

export default AlertMessage
