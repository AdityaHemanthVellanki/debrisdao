"use client";

import dynamic from 'next/dynamic';

// Dynamically import client components
const Navbar = dynamic(() => import('./Navbar'), { ssr: false });
const Footer = dynamic(() => import('./Footer'), { ssr: false });

interface ClientContainerProps {
  children: React.ReactNode;
}

const ClientContainer = ({ children }: ClientContainerProps) => {
  return (
    <>
      <Navbar />
      <main>
        {children}
      </main>
      <Footer />
    </>
  );
};

export default ClientContainer;
