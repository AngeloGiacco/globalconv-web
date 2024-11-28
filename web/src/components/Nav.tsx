import { FC, ReactNode } from 'react';
import Link from 'next/link'; // Import Link from next/link
import { Button } from '../components/ui/button'; 

interface NavLinkProps {
  href: string;
  children: ReactNode;
}

const NavLink: FC<NavLinkProps> = ({ href, children }) => (
  <Link href={href}>
    <span className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors duration-300 relative group cursor-pointer">
      {children}
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
    </span>
  </Link>
);

const Nav: FC = () => (
  <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[95%] max-w-7xl z-50">
    <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg shadow-black/[0.03] border border-white/20 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/">
            <img src="/logo.png" alt="Logo" className="h-8 cursor-pointer" />
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <NavLink href="/pricing">Pricing</NavLink>
            <NavLink href="/docs">Docs</NavLink>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost" className="rounded-xl">Sign in</Button>
          </Link>
          <Link href="/pricing">
            <Button className="bg-black text-white hover:bg-black/80 rounded-xl px-6">
              Start Free
            </Button>
          </Link>
        </div>
      </div>
    </div>
  </nav>
);

export default Nav;