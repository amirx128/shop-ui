import { ToastContainer } from 'react-toastify';

export default function ToastifyProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <ToastContainer
        position="bottom-center"
        style={{
          width: '100%',
          fontFamily: 'Yekan, Inter, Roboto, Helvetica, Arial, sans-serif',
        }}
        toastStyle={{
          borderRadius: '8px',
          fontSize: '14px',
          fontFamily: 'Yekan, Inter, Roboto, Helvetica, Arial, sans-serif',
        }}
      />
    </>
  );
}
