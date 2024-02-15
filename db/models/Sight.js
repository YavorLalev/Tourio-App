import mongoose from "mongoose";

const { Schema } = mongoose;

const sightSchema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  image: { type: String, required: true },
  mapURL: { type: String, required: true },
  description: { type: String, required: true },
});

const Sight = mongoose.models.Sight || mongoose.model("Sight", sightSchema);

export default Sight;
