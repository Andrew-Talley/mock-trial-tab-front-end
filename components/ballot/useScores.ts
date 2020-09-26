import { useState, useEffect } from "react";
import { ExamType, Role, Side, Speech } from "generated/graphql";
import {
  useExamScoreQuery,
  useSpeechScoreQuery,
  useUpdateExamMutation,
  useUpdateSpeechMutation,
} from "./ballot.generated";
import { useRouter } from "next/router";

export function useSpeechScore(side: Side, speech: Speech) {
  const { tournament, ballot } = useRouter().query as Record<string, string>;
  const [{ data }, refetch] = useSpeechScoreQuery({
    variables: {
      tournament,
      ballot,
      side,
      speech,
    },
  });

  const [score, setScore] = useState<number>();

  const gqlScore = data?.tournament.ballot.side.speech;

  useEffect(() => {
    setScore(gqlScore);
  }, [gqlScore]);

  const [_, update] = useUpdateSpeechMutation();

  const onChange = (score: number) => {
    setScore(score);
    update({
      ballot,
      side,
      speech,
      score,
    }).then(() => refetch());
  };

  return { score, onChange };
}

export function useExamScore(
  side: Side,
  witnessNum: number,
  role: Role,
  examType: ExamType
) {
  const { tournament, ballot } = useRouter().query as Record<string, string>;
  const [score, setScore] = useState<number>();

  const [{ data }] = useExamScoreQuery({
    variables: {
      tournament,
      ballot,
      side,
      witnessNum,
      role,
      type: examType,
    },
  });

  const gqlScore = data?.tournament.ballot.side.exam;

  useEffect(() => {
    setScore(gqlScore);
  }, [gqlScore]);

  const [_, updateExamScore] = useUpdateExamMutation();

  const updateScore = (score: number) => {
    setScore(score);
    updateExamScore({
      ballot,
      side,
      witnessNum,
      witness: role === Role.Witness,
      cross: examType === ExamType.Cross,
      score,
    });
  };

  return [score, updateScore] as const;
}
