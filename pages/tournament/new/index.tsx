import { NextPage } from "next";
import { useState } from "react";
import React from "react";
import { FormGroup, Label, Input, Button } from "reactstrap";
import { useRouter } from "next/router";
import { useCreateTournamentMutation } from "./newTournament.generated";
import { toast } from "react-toastify";

const NewTournament: NextPage = () => {
  const router = useRouter();
  const [name, setName] = useState("");

  const [_, makeTournament] = useCreateTournamentMutation();

  const create = () => {
    makeTournament({
      name,
    }).then(({ data, error }) => {
      if (error || !data?.addTournament?.id) {
        toast("Uh oh... ran into a problem making the tournament.", {
          type: "error",
        });
      } else {
        router.push(`/tournament/${data.addTournament.id}`);
      }
    });
  };

  return (
    <React.Fragment>
      <FormGroup>
        <Label for="name">Tournament Name</Label>
        <Input
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormGroup>
      <Button onClick={create}>Create Tournament</Button>
    </React.Fragment>
  );
};
export default NewTournament;
