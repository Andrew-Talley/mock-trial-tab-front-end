import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Side } from "generated/graphql";
import { useStudentsForSide } from "helpers/studentsForSide";
import { useWitnessInfo } from "helpers/useWitnessInfo";
import { Input, Table } from "reactstrap";
import {
  useChangeWitnessMutation,
  useChangeDirectingAttyMutation,
  useChangeCrossingAttyMutation,
} from "./caseInChiefTable.generated";
import { OPP_SIDE } from "helpers/opp-side";

function useTrackStudent(side: Side, serverId: string | undefined) {
  const { tournament, matchup } = useRouter().query as Record<string, string>;
  const { students: allStudents } = useStudentsForSide(
    tournament,
    matchup,
    side
  );

  const [curStudent, setStudent] = useState(serverId);
  useEffect(() => {
    if (serverId) {
      setStudent(serverId);
    }
  }, [serverId]);

  const student = allStudents?.find((s) => s.id === curStudent);

  return { student, setStudent, allStudents };
}

function useWitnessCell(side: Side, witnessNum: number) {
  const { tournament, matchup } = useRouter().query as Record<string, string>;

  const { info } = useWitnessInfo(side, witnessNum);

  const { student, setStudent, allStudents } = useTrackStudent(
    side,
    info?.student?.id
  );

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

  return {
    id: student?.id,
    name: student?.name,
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

function useDirectingAttorneyCell(side: Side, witnessNum: number) {
  const { tournament, matchup } = useRouter().query as Record<string, string>;

  const { info } = useWitnessInfo(side, witnessNum);
  const { student, setStudent, allStudents } = useTrackStudent(
    side,
    info?.director?.student?.id
  );

  const [_, changeStudent] = useChangeDirectingAttyMutation();

  const onChange = (newId: string) => {
    setStudent(newId);
    changeStudent({
      tournament,
      matchup,
      side,
      order: witnessNum,
      attorney: newId,
    });
  };

  return {
    directingAtty: student as typeof student | undefined,
    allStudents,
    onChange,
  };
}

interface DirectingAttorneyCellProps {
  side: Side;
  witnessNum: number;
}
const DirectingAttorneyCell: React.FC<DirectingAttorneyCellProps> = ({
  side,
  witnessNum,
}) => {
  const { directingAtty, allStudents, onChange } = useDirectingAttorneyCell(
    side,
    witnessNum
  );

  return (
    <td>
      <Input
        type="select"
        value={directingAtty?.id || ""}
        onChange={(e) => onChange(e.target.value)}
      >
        <option disabled value="">
          Choose Student
        </option>
        {allStudents?.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </Input>
    </td>
  );
};

function useCrossingAttorneyCell(side: Side, witnessNum: number) {
  const { tournament, matchup } = useRouter().query as Record<string, string>;
  const { info } = useWitnessInfo(side, witnessNum);

  const { student, setStudent, allStudents } = useTrackStudent(
    OPP_SIDE[side],
    info?.crosser?.student.id
  );

  const [_, changeCrossingAttorney] = useChangeCrossingAttyMutation();

  const onChange = (newId: string) => {
    setStudent(newId);
    changeCrossingAttorney({
      tournament,
      matchup,
      side,
      order: witnessNum,
      attorney: newId,
    });
  };

  return {
    crossingAtty: student,
    allStudents,
    onChange,
  };
}

interface CrossingAttorneyCellProps {
  cInCSide: Side;
  witnessNum: number;
}
const CrossingAttorneyCell: React.FC<CrossingAttorneyCellProps> = ({
  cInCSide,
  witnessNum,
}) => {
  const { crossingAtty, allStudents, onChange } = useCrossingAttorneyCell(
    cInCSide,
    witnessNum
  );

  return (
    <td>
      <Input
        type="select"
        value={crossingAtty?.id || ""}
        onChange={(e) => onChange(e.target.value)}
      >
        <option disabled value="">
          Choose Student
        </option>
        {allStudents?.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </Input>
    </td>
  );
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
      <DirectingAttorneyCell side={side} witnessNum={witnessNum} />
      <CrossingAttorneyCell cInCSide={side} witnessNum={witnessNum} />
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
