"use client";
import { images } from "@/assets";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";
import { MenuButton } from "./MenuButton";

const NavBar = () => {
  const navItems = [
    { name: "About", path: "/" },
    { name: "Services", path: "/" },
    { name: "Plans", path: "/" },
    { name: "Contact", path: "#contact-us" },
  ];

  const [isOpen, setOpen] = useState(false);
  return (
    <div>
      <StyledNav className="bg-black-primary z-10 fixed top-0 left-0 flex w-full justify-between items-center px-4 py-4 md:py-4 md:px-[8%]">
        <Image src={images.logo} alt="JTL logo" priority />

        <ul className=" hidden md:flex items-center justify-end gap-4">
          {navItems.map((item, i) => (
            <li key={i}>
              <Link href={item.path}>{item.name}</Link>
            </li>
          ))}
        </ul>
        <div className="block md:hidden">
          <MenuButton
            isOpen={isOpen}
            onClick={() => setOpen(!isOpen)}
            className="burger-icon"
            color={"#fff"}
          />
        </div>
      </StyledNav>
      <ul
        className={`${
          isOpen ? "flex top-[3.2rem]" : "top-[-100%]"
        } fixed transition-all ease-in-out duration-500 top-0 p-4 left-0 w-full bg-black-primary z-9 flex-col justify-center gap-4`}
      >
        {navItems.map((item, i) => (
          <Link href={item.path} key={i}>
            <li onClick={() => setOpen(false)} className="text-grey-primary">
              {item.name}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

const StyledNav = styled.nav`
  ul {
    li {
      transition: all 0.3s ease-in-out;
      color: var(--color-grey-primary);
      &:hover {
        color: #fff;
      }
    }
  }
`;

export default NavBar;