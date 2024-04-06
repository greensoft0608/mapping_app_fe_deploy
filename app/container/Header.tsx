'use client';

import React from 'react';
import useAuth from '@/hooks/useAuth';

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from '@nextui-org/react';

export default function Header() {
  const { state, logout } = useAuth();

  return (
    <Navbar className="h-24 bg-black/10" maxWidth="xl" isBordered>
      <NavbarBrand>
        <Link href="/">
          <div className="text-4xl font-bold text-white">SiRoMeIs</div>
        </Link>
      </NavbarBrand>

      <NavbarContent as="div" justify="end">
        {state && state.isAuthenticated ? (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                as="button"
                className="transition-transform"
                color="default"
                name="Jason Hughes"
                size="sm"
                fallback={<div className="text-lg font-semibold">{state.user.email.substring(0, 1).toUpperCase()}</div>}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat" className="text-zinc-100">
              <DropdownItem key="profile" className="h-8 gap-2">
                <p className="font-semibold">{state.user.email}</p>
              </DropdownItem>

              <DropdownItem key="logout" color="danger" onClick={logout}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <Link href="/auth" className="text-white">
            Log In
          </Link>
        )}
      </NavbarContent>
    </Navbar>
  );
}
