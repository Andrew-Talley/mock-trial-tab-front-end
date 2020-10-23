import { CaseInChiefTable } from "components/case-in-chief-table/CaseInChiefTable";
import { AttorneyRole, Side } from "generated/graphql";
import { attorneyRoleText, sideSymbol, sideText } from "helpers/enumsToString";
import { useStudentsForSide } from "helpers/studentsForSide";
import { useRouter } from "next/router";
import {
  useChangeStudentInRoleMutation,
  useGetAttorneyRoleQuery,
} from "page-gql/roles.generated";
import React, { useEffect, useState } from "react";
import { Col, Input, Label, Row } from "reactstrap";
import styled from "styled-components";

const AttorneyGrid = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  align-items: center;
`;

function useAttorneyRole(side: Side, role: AttorneyRole) {
  const { tournament, matchup } = useRouter().query as Record<string, string>;
  const [{ data, fetching }] = useGetAttorneyRoleQuery({
    variables: {
      tournament,
      matchup,
      side,
      role,
    },
  });

  const team = data?.tournament.matchup.team;
  const teamNum = team?.team.num;
  const gqlStudent = team?.attorney?.student;

  const [currentStudent, setStudent] = useState(null);
  useEffect(() => {
    if (gqlStudent) {
      setStudent(gqlStudent);
    }
  }, [gqlStudent]);

  const [_, changeRole] = useChangeStudentInRoleMutation();

  const onChange = (newStudent: typeof gqlStudent) => {
    if (teamNum && newStudent) {
      setStudent(newStudent);
      changeRole({
        tournament,
        matchup,
        team: teamNum,
        role,
        student: newStudent.id,
      }).catch(() => {
        setStudent(currentStudent);
      });
    }
  };

  return [currentStudent, onChange];
}

interface AttorneyRoleProps {
  side: Side;
  role: AttorneyRole;
}
const AttorneyRoleFC: React.FC<AttorneyRoleProps> = ({ side, role }) => {
  const [student, setStudent] = useAttorneyRole(side, role);

  const { tournament, matchup, side: pageSide } = useRouter().query as Record<
    string,
    string
  >;
  const { students } = useStudentsForSide(tournament, matchup, side);

  const option = students?.find((s) => s.id === student?.id);

  const canEdit = side === pageSide;

  return (
    <>
      <Label className="mb-0">{attorneyRoleText[role]}</Label>
      {canEdit ? (
        <Input
          type="select"
          value={student?.id || ""}
          onChange={(e) =>
            setStudent(students.find((s) => s.id === e.target.value))
          }
        >
          <option disabled value="">
            Choose Student...
          </option>
          {students?.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </Input>
      ) : (
        <div style={{ height: "3em", paddingTop: ".75em" }}>{option?.name}</div>
      )}
    </>
  );
};

interface AttorneyRolesProps {
  side: Side;
}
const AttorneyRoles: React.FC<AttorneyRolesProps> = ({ side }) => (
  <Col sm={6}>
    <h3>
      {sideSymbol[side]} - {sideText[side]}
    </h3>
    <AttorneyGrid className="pr-2">
      <AttorneyRoleFC side={side} role={AttorneyRole.Opener} />
      <AttorneyRoleFC side={side} role={AttorneyRole.Middle} />
      <AttorneyRoleFC side={side} role={AttorneyRole.Closer} />
    </AttorneyGrid>
  </Col>
);

interface CaseInChiefRolesProps {
  side: Side;
  directing: boolean;
}
const CaseInChiefRoles: React.FC<CaseInChiefRolesProps> = ({
  side,
  directing,
}) => (
  <Col sm={12} className="mt-4">
    <h2>{sideSymbol[side]} Case In Chief</h2>
    <CaseInChiefTable side={side} directing={directing} />
  </Col>
);

const Roles: React.FC = () => {
  const { side } = useRouter().query as Record<string, Side>;

  return (
    <>
      <h1>Edit Roles</h1>
      <h2 className="mt-4">Attorneys</h2>
      <Row className="my-2">
        <AttorneyRoles side={Side.Pl} />
        <AttorneyRoles side={Side.Def} />
      </Row>
      <Row className="my-2">
        <CaseInChiefRoles side={Side.Pl} directing={side === Side.Pl} />
        <CaseInChiefRoles side={Side.Def} directing={side === Side.Def} />
      </Row>
    </>
  );
};
export default Roles;
