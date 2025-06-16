import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RateLimited from "../components/RateLimited";
import NotesNotFound from "../components/NotesNotFound";
import NoteCard from "../components/NoteCard";
import toast from "react-hot-toast";
import api from "../lib/axios";

const Home = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all notes on component mount
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.error("Error fetching notes:", error);
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load notes");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {isRateLimited && <RateLimited />}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && !isRateLimited && (
          <div className="text-center py-10 text-green-400 text-lg">Loading notes...</div>
        )}

        {!loading && notes.length === 0 && !isRateLimited && <NotesNotFound />}

        {!loading && notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
