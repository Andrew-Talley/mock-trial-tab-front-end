import { NextPage } from "next";
import { Navbar, NavbarBrand, NavItem, Nav, NavLink } from "reactstrap";
import { useRouter } from "next/router";
import Link from "next/link";
import React from "react";

const pointer = { cursor: "pointer" };

export const HeaderBar: NextPage = () => {
  const { tournament } = useRouter().query;

  return (
    <Navbar light expand="lg" className="bg-light mb-4">
      <Link href="/">
        <NavbarBrand style={{ cursor: "pointer" }} tag="a">
          Mock Trial Tab
        </NavbarBrand>
      </Link>
      <Nav>
        {tournament && (
          <React.Fragment>
            <NavItem>
              <Link
                href="/tournament/[tournament]/schools"
                as={`/tournament/${tournament}/schools`}
              >
                <NavLink style={pointer}>Schools</NavLink>
              </Link>
            </NavItem>
            <NavItem>
              <Link
                href="/tournament/[tournament]/teams"
                as={`/tournament/${tournament}/teams`}
              >
                <NavLink style={pointer}>Teams</NavLink>
              </Link>
            </NavItem>
            <NavItem>
              <Link
                href="/tournament/[tournament]/judges"
                as={`/tournament/${tournament}/judges`}
              >
                <NavLink style={pointer}>Judges</NavLink>
              </Link>
            </NavItem>
            <NavItem>
              <Link
                href="/tournament/[tournament]/rounds"
                as={`/tournament/${tournament}/rounds`}
              >
                <NavLink style={pointer}>Rounds</NavLink>
              </Link>
            </NavItem>
          </React.Fragment>
        )}
      </Nav>
    </Navbar>
  );
};
