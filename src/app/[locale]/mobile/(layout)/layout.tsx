import TopHeader from '@/components/features/topHeader';
import Navbar from '@/components/features/navbar';

const MobileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <TopHeader />
      <main>{children}</main>
      <Navbar />
    </div>
  );
};

export default MobileLayout;
