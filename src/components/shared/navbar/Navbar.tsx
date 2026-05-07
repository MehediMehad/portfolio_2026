// Navbar.tsx

import NavbarClient from "./NavbarClient";
import NavInfoCart from "./NavInfoCart";

export async function Navbar() {
  return <NavbarClient navInfo={<NavInfoCart />} />;
}
