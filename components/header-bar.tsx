import { NextPage } from "next";
import {
  Navbar,
  NavbarBrand,
  NavItem,
  Nav,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { useRouter } from "next/router";
import { signIn, signOut } from "next-auth/client";
import Link from "next/link";
import React, { useContext } from "react";
import { AuthContext } from "helpers/auth";

const pointer = { cursor: "pointer" };

export const HeaderBar: NextPage = () => {
  const { tournament } = useRouter().query;

  const { name, teamNumber, tournament: teamTourney } = useContext(AuthContext);

  const signedIn = name === null;

  return (
    <Navbar light expand="lg" className="bg-light mb-4">
      <Link href="/">
        <NavbarBrand style={{ cursor: "pointer" }} tag="a">
          Mock Trial Tab
        </NavbarBrand>
      </Link>
      <Nav className="mr-auto">
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
      <Nav className="justify-content-end">
        {
          signedIn ? (
            <NavItem onClick={() => signIn()}>
              <NavLink style={pointer}>Sign In</NavLink>
            </NavItem>
          ) : (
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                {name}
              </DropdownToggle>
              <DropdownMenu right>
                <Link
                  href="/tournament/[tournament]/teams/[team]"
                  as={`/tournament/${teamTourney}/teams/${teamNumber}`}
                >
                  <DropdownItem>Team Homepage</DropdownItem>
                </Link>
                <DropdownItem onClick={() => signOut()}>Log Out</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          )
          // <NavItem>
          //   <Link href="/">
          //     <NavLink style={pointer}>User</NavLink>
          //   </Link>
          // </NavItem>
        }
      </Nav>
    </Navbar>
  );
};
