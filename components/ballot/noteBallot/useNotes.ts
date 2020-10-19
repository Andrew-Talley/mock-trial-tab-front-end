import { ExamType, Role, Side, Speech } from "generated/graphql";
import { useRouter } from "next/router";
import { useDebounce, useDebouncedCallback } from "use-debounce";
import { useEffect, useState } from "react";
import {
  useGetExamNotesQuery,
  useGetSpeechNotesQuery,
  useUpdateExamNotesMutation,
  useUpdateSpeechNotesMutation,
} from "./useNotes.generated";

function useGenericNotes(
  serverNotes: string | undefined | null,
  updateServerNotes: (notes: string) => void
) {
  const [notes, setNotes] = useState<string>(undefined);
  useEffect(() => {
    setNotes(serverNotes || undefined);
  }, [serverNotes]);

  const debouncedServerUpdate = useDebouncedCallback(updateServerNotes, 1000, {
    maxWait: 5000,
  });

  const updateNotes = (newNotes: string) => {
    setNotes(newNotes);
    debouncedServerUpdate.callback(newNotes);
  };

  useEffect(() => () => debouncedServerUpdate.flush(), []);

  return [notes, updateNotes] as const;
}

export function useSpeechNotes(side: Side, speech: Speech) {
  const { tournament, ballot } = useRouter().query as Record<string, string>;

  const [{ data, fetching, error }] = useGetSpeechNotesQuery({
    variables: {
      tournament,
      ballot,
      side,
      speech,
    },
    requestPolicy: "cache-and-network",
  });

  const notes = data?.tournament.ballot.side.speechNotes;

  const [_, sendGQLUpdate] = useUpdateSpeechNotesMutation();

  return useGenericNotes(notes, (newNotes: string) =>
    sendGQLUpdate({
      ballot,
      side,
      speech,
      newNotes,
    })
  );
}

export function useExamNotes(
  side: Side,
  witnessNum: number,
  role: Role,
  examType: ExamType
) {
  const { tournament, ballot } = useRouter().query as Record<string, string>;

  const [{ data }] = useGetExamNotesQuery({
    variables: {
      tournament,
      ballot,
      side,
      witnessNum,
      role,
      examType,
    },
    requestPolicy: "cache-and-network",
  });

  const notes = data?.tournament.ballot.side.examNotes;

  const [_, sendGQLUpdate] = useUpdateExamNotesMutation();

  return useGenericNotes(notes, (newNotes: string) =>
    sendGQLUpdate({
      ballot,
      side,
      witnessNum,
      witness: role === Role.Witness,
      cross: examType === ExamType.Cross,
      newNotes,
    })
  );
}
