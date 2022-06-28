import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { PhoneIcon, MailIcon } from '@heroicons/react/outline';
import { Container } from "./Container";

interface NavLinkProps {
  href: string,
  children: ReactNode
}

const NavLink = ({href, children}: NavLinkProps) => {
  const router = useRouter();
  return (
    <Link href={href}>
      <a className={`${router.asPath === href ? "bg-green-600 text-white" : ""} text-md px-3 py-5 uppercase hover:bg-green-600 hover:text-white block`}>{children}</a>
    </Link>
  )
}

const Header = () => {
  return (
    <header className="flex flex-col">
      <Container>
        <div id="top" className="flex flex-row justify-end py-1 text-xs font-sans">
          <Link href="tel:+48123456789"><a><PhoneIcon className="h-4 w-3 mx-2"/></a></Link>
          <Link href="mailto:contact@gmail.com"><a><MailIcon className="h-4 w-3 mx-2"/></a></Link>
        </div>
      </Container>
      <div className="bg-gray-300">
        <Container>
          <nav className="uppercase flex flex-row justify-end font-sans">
            <NavLink href="/">Główna</NavLink>
            <NavLink href="/products/ssg/1">Produkty ssg</NavLink>
            <NavLink href="/products/csr">Produkty csr</NavLink>
            <NavLink href="/about">O nas</NavLink>
            <NavLink href="/contact">Kontakt</NavLink>
          </nav>
        </Container>
      </div>
    </header>
  )
}

export default Header;