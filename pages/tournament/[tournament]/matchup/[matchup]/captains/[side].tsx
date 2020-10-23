import { useMatchupInfoQuery } from "components/add-ballot-for-judge-modal/addJudgeBallot.generated";
import { Side } from "generated/graphql";
import { AuthContext } from "helpers/auth";
import { sideSymbol, sideText } from "helpers/enumsToString";
import { useWitnesses } from "helpers/useWitnesses";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  useGetCurrentWitnessesQuery,
  useUpdateWitnessMutation,
} from "page-gql/captains.generated";
import { useGetMatchupInfoQuery } from "page-gql/matchup.generated";
import { useContext, useEffect, useState } from "react";
import { Button, Input, NavLink, Table } from "reactstrap";

function witnessesForSide(side: Side) {
  const PL_WITNESSES = [
    "Angel Rodriguez",
    "Lonnie Paras",
    "Riley Adkins-O'Keefe",
  ];
  const DEF_WITNESSES = ["Harper Martini", "Austin Lewis", "Blaire Osborne"];
  const SWING_WITNESSES = [
    "Dr. Jimin Kwon",
    "Dr. R. Cannon",
    "Sam Arnould",
    "Casey Soto",
    "Danny Francazio",
  ];

  if (side === Side.Pl) {
    return [...PL_WITNESSES, ...SWING_WITNESSES];
  } else {
    return [...DEF_WITNESSES, ...SWING_WITNESSES];
  }
}

interface CharacterProps {
  side: Side;
  witness: string;
  onChange: (newWitness: string) => void;
}
const Character: React.FC<CharacterProps> = ({ side, witness, onChange }) => {
  return (
    <Input
      type="select"
      className="flex-grow-1"
      style={{ flexBasis: 0 }}
      value={witness}
      onChange={(e) => onChange(e.target.value)}
    >
      <option disabled value="">
        Choose Witness...
      </option>
      {witnessesForSide(side).map((wit) => (
        <option key={wit} value={wit}>
          {wit}
        </option>
      ))}
    </Input>
  );
};

interface CharacterOrderProps {
  order: number;
  onChange: (newOrder: number) => void;
}
const CharacterOrder: React.FC<CharacterOrderProps> = ({ order, onChange }) => (
  <Input
    type="select"
    value={order}
    onChange={(e) => onChange(parseInt(e.target.value))}
  >
    <option value={0} disabled>
      Choose Order
    </option>
    <option value={1}>1</option>
    <option value={2}>2</option>
    <option value={3}>3</option>
  </Input>
);

interface SideCallsProps {
  side: Side;
  canEdit: boolean;
}
const SideCalls: React.FC<SideCallsProps> = ({ side, canEdit }) => {
  const { tournament, matchup } = useRouter().query as Record<string, string>;
  const { witnesses, changeWitness } = useWitnesses(tournament, matchup, side);

  return (
    <div className="w-50 p-2">
      <h3 className="text-center">
        {sideSymbol[side]} - {sideText[side]}
      </h3>
      <Table>
        <thead>
          <tr>
            <th>Order</th>
            <th>Witness</th>
          </tr>
        </thead>
        <tbody>
          {witnesses.map((witness, ind) => (
            <tr key={ind}>
              <td>{ind + 1}</td>
              <td>
                {canEdit ? (
                  <Character
                    side={side}
                    witness={witness}
                    onChange={(wit) => changeWitness(ind, wit)}
                  />
                ) : (
                  <span style={{ display: "flex", height: "2.5em" }}>
                    {witness}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

const Captains: React.FC = () => {
  const { admin } = useContext(AuthContext);
  const { tournament, matchup, side } = useRouter().query as Record<
    string,
    string
  >;

  return (
    <>
      <h2>Witness Calls</h2>
      <div className="d-flex">
        <SideCalls side={Side.Pl} canEdit={admin || side === Side.Pl} />
        <SideCalls side={Side.Def} canEdit={admin || side === Side.Def} />
      </div>
      <div>
        <NavLink>
          <Link
            href="/tournament/[tournament]/matchup/[matchup]"
            as={`/tournament/${tournament}/matchup/${matchup}`}
          >
            <a>{"< "}Back</a>
          </Link>
        </NavLink>
      </div>
    </>
  );
};
export default Captains;
