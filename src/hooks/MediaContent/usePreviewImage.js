import { useState, useEffect } from "react";

const usePreviewImage = () => {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  useEffect(() => {
    if (!file) {
      setImageUrl(null);
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setImageUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [file]);

  return [file, imageUrl, setFile , setImageUrl];
};

export default usePreviewImage;
