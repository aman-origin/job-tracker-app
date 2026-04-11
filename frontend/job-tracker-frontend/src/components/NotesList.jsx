import { useState } from 'react';
import { formatDate } from '../utils/constants';

function NotesList({ notes, onAddNote, isLoading }) {
  const [newNote, setNewNote] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    setIsAdding(true);
    await onAddNote(newNote);
    setNewNote('');
    setIsAdding(false);
  };

  return (
    <div className="space-y-4">
      {/* Add Note Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          className="input-field resize-none"
          rows="3"
          placeholder="Add a note about this application..."
        />
        <button
          type="submit"
          disabled={isAdding || !newNote.trim()}
          className="btn-primary disabled:opacity-50"
        >
          {isAdding ? 'Adding...' : 'Add Note'}
        </button>
      </form>

      {/* Notes List */}
      <div className="space-y-3 mt-6">
        {notes.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            No notes yet. Add your first note above!
          </p>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              className="bg-gray-50 rounded-lg p-4 border border-gray-200"
            >
              <p className="text-gray-800 whitespace-pre-wrap">{note.content}</p>
              <p className="text-gray-400 text-sm mt-2">
                {formatDate(note.createdAt)}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default NotesList;