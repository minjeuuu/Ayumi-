import { Outlet } from 'react-router';
import { SonnerProvider } from '../components/SonnerProvider';
import Navigation from '../components/Navigation';
import { WalkingAnimation } from '../components/Animations';

export default function Root() {
  return (
    <SonnerProvider>
      <div className="min-h-screen bg-white">
        <Navigation />
        <WalkingAnimation />
        <Outlet />
      </div>
    </SonnerProvider>
  );
}