import { Side, Speech } from "generated/graphql";
import { useEffect, useState } from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import { sideSymbol } from "helpers/enumsToString";
import styled from "styled-components";
import { PageNav } from "components/PageNav";
import { useRouter } from "next/router";

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

export function useTrackRound(noteOnly: boolean) {
  const router = useRouter();
  const { page } = router.query as Record<string, string>;
  const index = parseInt(page) || 0;

  const setIndex = (newIndex: number) => {
    const { tournament, ballot } = router.query;
    if (tournament && ballot) {
      router.push(`/tournament/${tournament}/ballot/${ballot}/${newIndex}`);
    }
  };

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
  const nextItem =
    (noteOnly && index === TABS.length - 2) || index === TABS.length - 1
      ? null
      : TABS[index + 1];

  const nav = (
    <PageNav
      previous={
        <>
          {previousItem !== null && "< "}
          {toLabel(previousItem)}
        </>
      }
      current={toLabel(currentItem)}
      next={
        <>
          {toLabel(nextItem)}
          {nextItem !== null && " >"}
        </>
      }
      onBack={decrement}
      onForward={increment}
    />
  );

  const activeTab = TABS[index];

  return { nav, activeTab };
}
