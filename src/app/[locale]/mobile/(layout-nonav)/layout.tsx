import TopHeader from '@/components/features/topHeader';

const CheckoutLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <TopHeader />
      <main>{children}</main>
    </div>
  );
};

export default CheckoutLayout;
