import mongoose from "mongoose";

const travelSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    story: {
        type: String,
        required: true,
    },
    visitedLocation: {
        type: [String],
        default: []
    }, 
    isFavorite: {
        type: Boolean,
        default: false
    },

    userId: {
        // type: Schema.Types.ObjectId,
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    visitedDate: {
        type: Date,
        required: true,
    },
}, {timestamps: true }

)

const TravelStory = mongoose.model("TravelStory", travelSchema);

export default TravelStory;