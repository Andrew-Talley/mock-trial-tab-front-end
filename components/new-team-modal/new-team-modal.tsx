import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label,
  Input,
  ModalFooter,
  Button,
} from "reactstrap";

import { useAddTeamMutation } from "./create-team.generated";
import { useGetSchoolsQuery } from "../../pages/tournament/[tournament]/schools/schools.generated";

interface NewTeamModalProps {
  children: React.ReactNode;
  initialSchool?: string;
}
export const NewTeamModal: React.FC<NewTeamModalProps> = ({
  children,
  initialSchool,
}) => {
  const router = useRouter();
  const { tournament } = router.query as Record<string, string>;
  const [isOpen, setOpen] = useState(false);

  const [team, setTeam] = useState("");
  const [num, setNum] = useState<number>(null);
  const [school, setSchool] = useState(initialSchool || "");

  const [{ data }] = useGetSchoolsQuery({
    variables: {
      tournamentId: tournament,
    },
  });
  const schools = data?.tournament.schools.map((s) => s.name);

  const [{ fetching }, createTeam] = useAddTeamMutation();

  const addTeam = () => {
    createTeam({
      tournament: tournament as string,
      school,
      teamNum: num,
      teamName: team,
    }).then(({ data }) => {
      if (data?.addTeam) {
        router.push(`/tournament/${tournament}/teams/${data.addTeam.num}`);
      }
    });
  };

  useEffect(() => {
    setSchool(initialSchool);
  }, [initialSchool]);

  return (
    <React.Fragment>
      <div onClick={() => setOpen(true)}>{children}</div>
      <Modal isOpen={isOpen} toggle={() => setOpen(false)}>
        <ModalHeader>Add Team</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="school">School</Label>
            <Input
              type="select"
              name="school"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
            >
              <option disabled selected value="">
                Select a school
              </option>
              {schools?.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="num">Team Number</Label>
            <Input
              name="num"
              type="number"
              value={num}
              onChange={(e) => setNum(e.target.valueAsNumber)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="team">Team Name</Label>
            <Input
              name="team"
              value={team}
              onChange={(e) => setTeam(e.target.value)}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button disabled={fetching} onClick={addTeam}>
            Add Team
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};
