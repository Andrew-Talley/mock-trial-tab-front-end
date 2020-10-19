import { Role, Student } from "generated/graphql";
import { useState } from "react";
import { Input } from "reactstrap";

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
  const [value, setValue] = useState("");

  return (
    <li className="my-2">
      <Input
        type="select"
        value={value}
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
    </li>
  );
};
