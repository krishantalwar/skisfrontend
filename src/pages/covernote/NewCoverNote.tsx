// pages/covernote/NewCoverNote.tsx
import { CoverNoteForm } from "@/components/forms/CoverNoteForm";

const NewCoverNote = () => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Create New Cover Note</h2>
      <CoverNoteForm />
    </div>
  );
};

export default NewCoverNote;
