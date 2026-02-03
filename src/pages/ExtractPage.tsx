import React from "react";
import { useLocation } from "react-router-dom";
import { useFaceEmbedding } from "../hooks/useFaceEmbedding";

const ExtractPage: React.FC = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const imageUrl = params.get("data");

  const { embedding, loading } = useFaceEmbedding(imageUrl);

  if (loading) return null; // don’t render anything
  return embedding ? <>{embedding}</> : null; // just return embedding
};

export default ExtractPage;
