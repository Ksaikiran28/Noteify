import express from "express";
import { createNote, deleteNote, getAllNotes, updateNote ,getNoteById} from "../controllers/notesControllers.js";
import ratelimiter from "../middleware/rateLimiter.js";
const router = express.Router();

router.get("/",getAllNotes);
router.get("/:id",getNoteById);
router.post("/",ratelimiter,createNote);
router.put("/:id",ratelimiter,updateNote);
router.delete("/:id",ratelimiter,deleteNote);


export default router;