import { Role, Student } from "generated/graphql";
import { BallotContext } from "pages/tournament/[tournament]/ballot/[ballot]/[page]";
import { useContext, useEffect, useState } from "react";
import { Input } from "reactstrap";
import {
  useChangeIndividualAwardMutation,
  useGetIndividualAwardsQuery,
} from "./individualAward.generated";

function useIndividualAward(role: Role, number: number) {
  const { tournament, ballot } = useContext(BallotContext);
  const [{ data, ...props }, refetch] = useGetIndividualAwardsQuery({
    variables: {
      tournament,
      ballot,
    },
  });

  const ballotInfo = data?.tournament.ballot;

  const awards =
    role === Role.Attorney
      ? ballotInfo?.attorneyAwards
      : ballotInfo?.witnessAwards;

  const serverValue = awards?.[number - 1]?.student?.id;

  const [id, setId] = useState<string>();
  useEffect(() => {
    if (serverValue) {
      setId(serverValue);
    }
  }, [serverValue]);

  const [_, updateServer] = useChangeIndividualAwardMutation();

  const onChange = (newId: string) => {
    setId(newId);
    updateServer({
      ballot,
      role,
      rank: number,
      student: newId,
    }).then(() => {
      refetch();
    });
  };

  return [id, onChange] as const;
}

interface IndividualAwardProps {
  role: Role;
  awardNum: number;
  options: Student[];
}
export const IndividualAward: React.FC<IndividualAwardProps> = ({
  role,
  awardNum,
  options,
}) => {
  const { canEdit } = useContext(BallotContext);
  const [value, setValue] = useIndividualAward(role, awardNum);

  const selectedOption = options.find((o) => o.id === value);

  return (
    <li className="my-2">
      {canEdit ? (
        <Input
          type="select"
          value={value || ""}
          onChange={(e) => setValue(e.target.value)}
        >
          <option disabled value="">
            Choose Student...
          </option>
          {options.map((o) => (
            <option key={o.id} value={o.id}>
              {o.name}
            </option>
          ))}
        </Input>
      ) : (
        selectedOption?.name
      )}
    </li>
  );
};
