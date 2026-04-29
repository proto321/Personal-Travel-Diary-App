import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { addTravelStory, deleteImage, deleteTravelStory, editTravelStory, filterTravelStory, getAllTravelStory, imageUpload, searchTravelStory, updateisFavourite } from '../controllers/travelStory.controller.js';
import upload from "../multer.js"
import TravelStory from '../models/travelStory.model.js';

const router = express.Router();

router.post("/image-upload", upload.single("image") , imageUpload);

router.delete("/delete-image", deleteImage)

router.post("/add", verifyToken, addTravelStory);

router.get("/get-all", verifyToken, getAllTravelStory);

router.post("/edit-story/:id", verifyToken, editTravelStory)

router.delete("/delete-story/:id", verifyToken, deleteTravelStory)

router.put("/update-is-favorite/:id", verifyToken, updateisFavourite)

router.get("/search", verifyToken, searchTravelStory)

router.get("/filter", verifyToken, filterTravelStory)

export default router; 