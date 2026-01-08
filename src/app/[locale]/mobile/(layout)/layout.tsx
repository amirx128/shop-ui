import TopHeader from '@/components/features/topHeader';
import Header from '@/components/features/header';
import Navbar from '@/components/features/navbar';

const MobileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <TopHeader />
      <Header />
      <main>{children}</main>
      <Navbar />
    </div>
  );
};

export default MobileLayout;
