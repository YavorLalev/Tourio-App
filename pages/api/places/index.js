import Sight from "@/db/models/Sight";
import dbConnect from "@/db/connect";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    try {
      const sights = await Sight.find();
      return response.status(200).json(sights);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }

  if (request.method === "POST") {
    try {
      const sightData = request.body;
      const sight = new Sight(sightData);

      await sight.save();

      return response.status(201).json({ message: "Sight created" });
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }
}
