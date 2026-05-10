import { Plus, Search, Calendar, Tag, Edit, Trash2, X, Save } from 'lucide-react';
import { useState } from 'react';
import { useAppContext } from '../App';

export default function Notes() {
  const { notes, addNote, updateNote, deleteNote } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewNoteModal, setShowNewNoteModal] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState<number | null>(null);

  const [newNote, setNewNote] = useState({
    title: '',
    content: '',
    course: '',
    tags: ''
  });

  const [editNote, setEditNote] = useState({
    title: '',
    content: '',
    course: '',
    tags: ''
  });

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleCreateNote = () => {
    if (!newNote.title || !newNote.content) return;

    addNote({
      title: newNote.title,
      content: newNote.content,
      course: newNote.course || 'General',
      date: new Date().toISOString().split('T')[0],
      tags: newNote.tags.split(',').map(t => t.trim()).filter(t => t)
    });

    setNewNote({ title: '', content: '', course: '', tags: '' });
    setShowNewNoteModal(false);
  };

  const handleEditStart = (note: any) => {
    setEditingNoteId(note.id);
    setEditNote({
      title: note.title,
      content: note.content,
      course: note.course,
      tags: note.tags.join(', ')
    });
  };

  const handleEditSave = () => {
    if (!editNote.title || !editNote.content || editingNoteId === null) return;

    updateNote(editingNoteId, {
      title: editNote.title,
      content: editNote.content,
      course: editNote.course,
      tags: editNote.tags.split(',').map(t => t.trim()).filter(t => t)
    });

    setEditingNoteId(null);
    setEditNote({ title: '', content: '', course: '', tags: '' });
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this note?')) {
      deleteNote(id);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">My Notes</h2>
          <p className="text-muted-foreground">Your personal study notes</p>
        </div>
        <button
          onClick={() => setShowNewNoteModal(true)}
          className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus size={20} />
          <span>New Note</span>
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
        <input
          type="text"
          placeholder="Search notes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredNotes.map((note) => (
          <div
            key={note.id}
            className="bg-card border border-border rounded-xl p-5 hover:border-primary transition-all hover:shadow-lg"
          >
            {editingNoteId === note.id ? (
              <div className="space-y-3">
                <input
                  type="text"
                  value={editNote.title}
                  onChange={(e) => setEditNote({ ...editNote, title: e.target.value })}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Title"
                />
                <textarea
                  value={editNote.content}
                  onChange={(e) => setEditNote({ ...editNote, content: e.target.value })}
                  rows={6}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="Content"
                />
                <input
                  type="text"
                  value={editNote.course}
                  onChange={(e) => setEditNote({ ...editNote, course: e.target.value })}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Course"
                />
                <input
                  type="text"
                  value={editNote.tags}
                  onChange={(e) => setEditNote({ ...editNote, tags: e.target.value })}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Tags (comma separated)"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleEditSave}
                    className="flex-1 px-3 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg flex items-center justify-center gap-2 transition-colors"
                  >
                    <Save size={16} />
                    Save
                  </button>
                  <button
                    onClick={() => setEditingNoteId(null)}
                    className="flex-1 px-3 py-2 bg-muted hover:bg-muted/80 rounded-lg flex items-center justify-center gap-2 transition-colors"
                  >
                    <X size={16} />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-lg flex-1">{note.title}</h3>
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleEditStart(note)}
                      className="p-1.5 hover:bg-muted rounded transition-colors"
                    >
                      <Edit size={16} className="text-muted-foreground" />
                    </button>
                    <button
                      onClick={() => handleDelete(note.id)}
                      className="p-1.5 hover:bg-destructive/10 rounded transition-colors"
                    >
                      <Trash2 size={16} className="text-destructive" />
                    </button>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-6 whitespace-pre-line">
                  {note.content}
                </p>

                <div className="flex flex-wrap gap-2 mb-3">
                  {note.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full flex items-center gap-1"
                    >
                      <Tag size={10} />
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    {new Date(note.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span>{note.course}</span>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {filteredNotes.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-xl font-semibold mb-2">No notes found</h3>
          <p className="text-muted-foreground">Try adjusting your search or create a new note</p>
        </div>
      )}

      {/* New Note Modal */}
      {showNewNoteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Create New Note</h3>
              <button
                onClick={() => setShowNewNoteModal(false)}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title *</label>
                <input
                  type="text"
                  value={newNote.title}
                  onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Note title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Content *</label>
                <textarea
                  value={newNote.content}
                  onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                  rows={8}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="Write your notes here..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Course</label>
                <input
                  type="text"
                  value={newNote.course}
                  onChange={(e) => setNewNote({ ...newNote, course: e.target.value })}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g., Data Structures"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Tags</label>
                <input
                  type="text"
                  value={newNote.tags}
                  onChange={(e) => setNewNote({ ...newNote, tags: e.target.value })}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter tags separated by commas"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleCreateNote}
                  disabled={!newNote.title || !newNote.content}
                  className="flex-1 px-6 py-3 bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-primary-foreground rounded-lg transition-colors font-medium"
                >
                  Create Note
                </button>
                <button
                  onClick={() => setShowNewNoteModal(false)}
                  className="flex-1 px-6 py-3 bg-muted hover:bg-muted/80 rounded-lg transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
