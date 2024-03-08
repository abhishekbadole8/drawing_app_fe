import axios from "axios";

export async function postShape(shapeData) {
  if (shapeData.type === "SELECT") {
    return;
  }
  try {
    const response = await axios.post("http://localhost:5000/api/shapes", {
      ...shapeData,
    });

    if (!response.data) {
      throw new Error("Failed to post shape data");
    }

    return response.data;
  } catch (error) {
    console.error("Error posting shape data:", error);
    throw error;
  }
}

export async function getShape() {
  try {
    const response = await axios.get("http://localhost:5000/api/shapes");
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
}
