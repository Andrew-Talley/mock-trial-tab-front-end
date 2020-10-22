import ReactMde from "react-mde";
import * as Showdown from "showdown";
import * as xssFilter from "showdown-xss-filter";
import { useEffect, useState } from "react";
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

const PreviewNotes: React.FC<{ markdown: string }> = ({ markdown }) => {
  const [html, updateHTML] = useState("Loading...");
  useEffect(() => {
    if (markdown.trim().length === 0) {
      updateHTML("[No Notes]");
    } else {
      Promise.resolve(converter.makeHtml(markdown)).then((value) =>
        updateHTML(value)
      );
    }
  }, [markdown]);

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

interface NotesProps {
  notes: string;
  canEdit?: boolean;
  onChange: (newNotes: string) => void;
}
export const Notes: React.FC<NotesProps> = ({
  notes,
  onChange,
  canEdit = true,
}) => {
  const [tab, setTab] = useState<"write" | "preview">("write");

  return (
    <div className="w-100">
      {canEdit ? (
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
      ) : (
        <PreviewNotes markdown={notes || ""} />
      )}
    </div>
  );
};
