import axios from "axios";

export const photoUpload = async (photoData) => {
  const formData = new FormData();
  formData.append("image", photoData);
  const uploadRes = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_HOST_KEY}`,
    formData
  );
  console.log(uploadRes);

  return uploadRes.data.data.url;
};
