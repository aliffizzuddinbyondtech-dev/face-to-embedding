import { useEffect, useState } from "react";
import * as faceapi from "face-api.js";

export const useFaceEmbedding = (imageUrl: string | null) => {
  const [embedding, setEmbedding] = useState<number[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!imageUrl) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageUrl;

    const loadModels = async () => {
      const MODEL_URL = "/models"; // put face-api models in public/models
      await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL);
      await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
      await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
    };

    const computeEmbedding = async () => {
      await loadModels();

      const detection = await faceapi
        .detectSingleFace(img)
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (detection) {
        setEmbedding(Array.from(detection.descriptor));
      } else {
        setEmbedding(null);
      }

      setLoading(false);
    };

    img.onload = () => computeEmbedding();
    img.onerror = () => {
      console.error("Failed to load image");
      setLoading(false);
    };
  }, [imageUrl]);

  return { embedding, loading };
};
