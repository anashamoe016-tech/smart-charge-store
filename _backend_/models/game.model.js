import mongoose from "mongoose";

const gameSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },

    image: {
        type: String,
        default: ""
    },

    description: {
        type: String,
        default: ""
    },

    category: {
        type: String,
        default: "Games"
    },

    active: {
        type: Boolean,
        default: true
    },

    sortOrder: {
        type: Number,
        default: 0
    },

    providers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Provider"
        }
    ]
},
{
    timestamps: true
}
);

const Game = mongoose.model("Game", gameSchema);

export default Game;