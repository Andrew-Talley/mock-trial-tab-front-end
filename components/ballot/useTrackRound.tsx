import { Side, Speech } from "generated/graphql";
import { useState } from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import { sideSymbol } from "helpers/sideSymbol";
import styled from "styled-components";

const TABS = [
  {
    type: "speech",
    speech: Speech.Opening,
  },
  {
    type: "exam",
    side: Side.Pl,
    number: 1,
  },
  {
    type: "exam",
    side: Side.Pl,
    number: 2,
  },
  {
    type: "exam",
    side: Side.Pl,
    number: 3,
  },
  {
    type: "exam",
    side: Side.Def,
    number: 1,
  },
  {
    type: "exam",
    side: Side.Def,
    number: 2,
  },
  {
    type: "exam",
    side: Side.Def,
    number: 3,
  },
  {
    type: "speech",
    speech: Speech.Closing,
  },
  {
    type: "summary",
  },
] as const;

function toLabel(tab: typeof TABS[number] | null) {
  if (tab === null) return null;

  switch (tab.type) {
    case "speech":
      return tab.speech === Speech.Opening ? "Opening" : "Closing";
    case "summary":
      return "Review Ballot";
    case "exam":
      return `${sideSymbol[tab.side]} Witness #${tab.number}`;
  }
}

const GridNav = styled(Nav)`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
`;

export function useTrackRound() {
  const [index, setIndex] = useState(0);

  const decrement = () => {
    if (index !== 0) {
      setIndex(index - 1);
    }
  };

  const increment = () => {
    if (index !== TABS.length - 1) {
      setIndex(index + 1);
    }
  };

  const previousItem = index === 0 ? null : TABS[index - 1];
  const currentItem = TABS[index];
  const nextItem = index === TABS.length - 1 ? null : TABS[index + 1];

  const nav = (
    <GridNav>
      <NavItem>
        <NavLink href="#" onClick={decrement}>
          {previousItem !== null && "< "}
          {toLabel(previousItem)}
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink tag="span">{toLabel(currentItem)}</NavLink>
      </NavItem>
      <NavItem className="text-right">
        <NavLink href="#" onClick={increment}>
          {toLabel(nextItem)}
          {nextItem !== null && " >"}
        </NavLink>
      </NavItem>
    </GridNav>
  );

  const activeTab = TABS[index];

  return { nav, activeTab };
}
