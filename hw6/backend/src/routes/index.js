import { Router } from "express";
import { query, updateCard, clearDB } from "./scoreCard";

const router = Router();
router.get("/cards", query);
router.post("/card", updateCard);
router.delete("/cards", clearDB);

export default router;
