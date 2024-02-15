import Sight from "@/db/models/Sight";
import dbConnect from "@/db/connect";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    try {
      const sight = await Sight.findById(id);
      if (!sight) {
        return response.status(404).json({ status: "Not found" });
      }
      return response.status(200).json(sight);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }

  if (request.method === "PATCH") {
    try {
      const updatedSight = request.body;
      await Sight.findByIdAndUpdate(id, updatedSight);

      return response.status(200).json(updatedSight);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }

  if (request.method === "DELETE") {
    try {
      await Sight.findByIdAndDelete(id);

      return response.status(200).json({ message: "Sight deleted" });
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }
}
