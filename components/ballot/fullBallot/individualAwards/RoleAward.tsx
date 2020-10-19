import { Role, Student } from "generated/graphql";
import { roleText } from "helpers/enumsToString";
import { Input } from "reactstrap";
import { IndividualAward } from "./IndividualAward";

interface RoleAwardProps {
  role: Role;

  options: Student[] | null | undefined;
}
export const RoleAward: React.FC<RoleAwardProps> = ({ role, options }) => {
  const text = roleText[role];

  return (
    <div>
      <h4 className="text-center">{text}</h4>
      <ol>
        {[1, 2, 3, 4].map((val) => (
          <IndividualAward role={role} awardNum={val} options={options} />
        ))}
      </ol>
    </div>
  );
};
