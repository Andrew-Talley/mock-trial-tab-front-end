import { Side } from "generated/graphql";

interface NoteBallotPanelProps {
  side: Side;
  children: React.ReactNode;
}
export const NoteBallotPanel: React.FC<NoteBallotPanelProps> = ({
  side,
  children,
}) => (
  <div className={`p-4 border w-50 ${side === Side.Def ? "bg-info" : ""}`}>
    {children}
  </div>
);
