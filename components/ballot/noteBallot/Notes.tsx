import ReactMde from "react-mde";
import * as Showdown from "showdown";
import * as xssFilter from "showdown-xss-filter";
import { useState } from "react";
import { ToolbarCommands } from "react-mde/lib/definitions/types";

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
  extensions: [xssFilter],
});

const TOOLBAR_COMMANDS: ToolbarCommands = [
  ["header", "bold", "italic"],
  ["unordered-list", "ordered-list", "checked-list"],
];

interface NotesProps {
  notes: string;
  onChange: (newNotes: string) => void;
}
export const Notes: React.FC<NotesProps> = ({ notes, onChange }) => {
  const [tab, setTab] = useState<"write" | "preview">("write");

  return (
    <div className="w-100">
      <ReactMde
        value={notes}
        onChange={onChange}
        selectedTab={tab}
        onTabChange={setTab}
        toolbarCommands={TOOLBAR_COMMANDS}
        generateMarkdownPreview={(markdown) =>
          Promise.resolve(converter.makeHtml(markdown))
        }
      />
    </div>
  );
};
