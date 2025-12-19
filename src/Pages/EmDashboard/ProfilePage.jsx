import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import { photoUpload } from "../../Utils/UploadPhoto";
import Swal from "sweetalert2";
import { IoSync } from "react-icons/io5";

const ProfilePage = () => {
  const axiosSecure = useAxios();
  const { user, userProfileUpdate } = useAuth();

  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [loading, setLoading] = useState(false);

  const { data: profile = {}, refetch } = useQuery({
    queryKey: ["profile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/profile?email=${user.email}`);
      return res.data;
    },
  });

  // ⚡ Update local state when profile changes
  useEffect(() => {
    if (profile) {
      setName(profile.name || "");
      setPhotoURL(profile.photoURL || "");
    }
  }, [profile]);

  const handleImageUpload = async (file) => {
    if (!file) return;
    setUploadingImage(true);
    try {
      const uploadedURL = await photoUpload(file);
      setPhotoURL(uploadedURL);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Image upload failed", "error");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (uploadingImage) {
      Swal.fire("Wait", "Please wait for image upload to finish.", "info");
      return;
    }

    setLoading(true);
    try {
      await axiosSecure.patch("/profile", {
        email: user.email,
        name,
        photoURL,
      });

      await userProfileUpdate({
        displayName: name,
        photoURL: photoURL,
        role: "employee",
      });

      await refetch();

      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "Your profile has been updated successfully!",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Profile update failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-5">
      <img
        src={photoURL || profile.photoURL}
        alt="Profile"
        className="w-24 h-24 rounded-full mb-3"
      />

      <form onSubmit={handleUpdate} className="space-y-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input input-bordered w-full"
          placeholder="Name"
        />

        <input
          type="email"
          value={user.email}
          readOnly
          className="input input-bordered w-full bg-gray-100"
        />

        <div>
          <label className="font-medium">Photo</label>
          <input
            type="file"
            accept="image/*"
            className="file-input file-input-bordered w-full"
            onChange={(e) => handleImageUpload(e.target.files[0])}
          />
          {uploadingImage && (
            <p className="text-sm text-gray-500 mt-1">Uploading image...</p>
          )}
        </div>

        <button
          type="submit"
          disabled={uploadingImage || loading}
          className="btn btn-primary w-full flex items-center justify-center gap-2"
        >
          {loading && <IoSync className="animate-spin" />}
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>

      <div className="mt-4">
        {profile.companies?.map((c, i) => (
          <p key={i}>
            {c.companyName} - {c.role}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
