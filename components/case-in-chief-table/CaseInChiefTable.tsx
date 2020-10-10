import { Side } from "generated/graphql";
import { useStudentsForSide } from "helpers/studentsForSide";
import { useRouter } from "next/router";
import {
  useGetWitnessInfoQuery,
  GetAttorneyRoleQueryVariables,
} from "page-gql/roles.generated";
import React, { useEffect, useState } from "react";
import { Input, Table } from "reactstrap";
import { useChangeWitnessMutation } from "./caseInChiefTable.generated";

type Variables = GetAttorneyRoleQueryVariables;

function useWitnessInfo(side: Side, witnessNum: number) {
  const { tournament, matchup } = useRouter().query as Record<string, string>;

  const [{ data, ...passdownProps }] = useGetWitnessInfoQuery({
    variables: {
      tournament,
      matchup,
      side,
      opposingSide: OPP_SIDE[side],
      witnessNum,
    },
  });

  const matchupInfo = data?.tournament.matchup;

  const info = {
    ...matchupInfo?.team.witness,
    crosser: matchupInfo?.oppTeam.attorney,
  };

  return {
    info,
    ...passdownProps,
  };
}

function useWitnessCell(side: Side, witnessNum: number) {
  const { tournament, matchup } = useRouter().query as Record<string, string>;
  const { students: allStudents } = useStudentsForSide(
    tournament,
    matchup,
    side
  );

  const { info } = useWitnessInfo(side, witnessNum);

  const { student } = info;

  const [curStudent, setStudent] = useState(student?.id);
  useEffect(() => {
    if (student) {
      setStudent(student?.id);
    }
  }, [student?.id]);

  const [_, changeStudent] = useChangeWitnessMutation();

  const onChange = (newId: string) => {
    setStudent(newId);
    changeStudent({
      tournament,
      matchup,
      side,
      order: witnessNum,
      student: newId,
    });
  };

  const fullStudent = allStudents?.find((s) => s.id === curStudent);
  return {
    id: curStudent,
    name: fullStudent?.name,
    options: allStudents,
    onChange,
  };
}

interface WitnessCellProps {
  side: Side;
  witnessNum: number;
}
const WitnessCell: React.FC<WitnessCellProps> = ({ side, witnessNum }) => {
  const { id, options, onChange } = useWitnessCell(side, witnessNum);

  return (
    <td>
      <Input
        type="select"
        value={id || ""}
        onChange={(e) => onChange(e.target.value)}
      >
        <option disabled value="">
          Choose Student
        </option>
        {options?.map((o) => (
          <option id={o.id} value={o.id}>
            {o.name}
          </option>
        ))}
      </Input>
    </td>
  );
};

const OPP_SIDE = {
  [Side.Pl]: Side.Def,
  [Side.Def]: Side.Pl,
};

interface CaseInChiefTableRowProps {
  side: Side;
  witnessNum: number;
}
const CaseInChiefTableRow: React.FC<CaseInChiefTableRowProps> = ({
  side,
  witnessNum,
}) => {
  const { info } = useWitnessInfo(side, witnessNum);

  return (
    <tr>
      <td>{witnessNum}</td>
      <td>{info.witnessName}</td>
      <WitnessCell side={side} witnessNum={witnessNum} />
      <td>Zoe Luther</td>
      <td>Kevin Loo</td>
    </tr>
  );
};

interface CaseInChiefTableProps {
  side: Side;
}
export const CaseInChiefTable: React.FC<CaseInChiefTableProps> = ({ side }) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>Direct Number</th>
          <th>Character</th>
          <th>Witness</th>
          <th>Directing Attorney</th>
          <th>Crossing Attorney</th>
        </tr>
      </thead>
      <tbody>
        <CaseInChiefTableRow side={side} witnessNum={1} />
        <CaseInChiefTableRow side={side} witnessNum={2} />
        <CaseInChiefTableRow side={side} witnessNum={3} />
      </tbody>
    </Table>
  );
};
