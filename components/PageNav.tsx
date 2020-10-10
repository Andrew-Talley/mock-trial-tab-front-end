import React from "react";
import { Nav, NavItem, NavLink, NavProps } from "reactstrap";
import styled from "styled-components";

const GridNav = styled(Nav)`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
`;

interface PageNavProps extends NavProps {
  previous?: React.ReactNode;
  current: React.ReactNode;
  next?: React.ReactNode;

  onBack: () => void;
  onForward: () => void;
}
export const PageNav: React.FC<PageNavProps> = ({
  previous,
  current,
  next,
  onBack,
  onForward,
  ...props
}) => (
  <GridNav {...(props as any)}>
    <NavItem>
      <NavLink href="#" onClick={onBack}>
        <a>{previous}</a>
      </NavLink>
    </NavItem>
    <NavItem>
      <NavLink tag="span">{current}</NavLink>
    </NavItem>
    <NavItem className="text-right">
      <NavLink href="#" onClick={onForward}>
        <a>{next}</a>
      </NavLink>
    </NavItem>
  </GridNav>
);
