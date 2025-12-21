import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import { photoUpload } from "../../Utils/UploadPhoto";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { IoSync } from "react-icons/io5";
import Loading from "../../Loading/Loading";
// import Loading from "../../Loading/Loading";

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
      await Swal.fire("Error", "Image upload failed", "error");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (uploadingImage) {
      await Swal.fire(
        "Wait",
        "Please wait for image upload to finish.",
        "info"
      );
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
        photoURL,
        role: "employee",
      });

      refetch();

      await Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "Your profile has been updated successfully!",
        timer: 3000,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error(err);
      await Swal.fire("Error", "Profile update failed", "error");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen py-14 bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800">
      <div className="max-w-2xl mx-auto px-4">
        <h2 className="text-5xl font-extrabold text-center bg-gradient-to-r from-cyan-400 via-indigo-400 to-pink-400 bg-clip-text text-transparent">
          My Profile
        </h2>
        <p className="text-lg text-gray-300 mt-3 border-b border-gray-600 pb-4 text-center">
          Update your profile information
        </p>

        <form
          onSubmit={handleUpdate}
          className="mt-12 bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-10"
        >
          <div className="flex justify-center mb-8">
            <img
              src={photoURL || profile.photoURL}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-indigo-400 shadow-lg"
            />
          </div>

          <div className="max-w-xl mx-auto bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-xl p-8 shadow-xl border border-indigo-200">
            <fieldset className="mb-5">
              <label className="block text-lg font-semibold mb-1 text-gray-800">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input input-bordered w-full"
                placeholder="Enter your name"
              />
            </fieldset>

            <fieldset className="mb-5">
              <label className="block text-lg font-semibold mb-1 text-gray-800">
                Email
              </label>
              <input
                type="email"
                value={user.email}
                readOnly
                className="input input-bordered w-full bg-gray-100"
              />
            </fieldset>

            <fieldset>
              <label className="block text-lg font-semibold mb-1 text-gray-800">
                Photo
              </label>
              <input
                type="file"
                accept="image/*"
                className="file-input file-input-bordered w-full"
                onChange={(e) => handleImageUpload(e.target.files[0])}
              />
              {uploadingImage && (
                <p className="text-sm text-gray-500 mt-1">Uploading image...</p>
              )}
            </fieldset>
          </div>

          <button
            type="submit"
            disabled={uploadingImage || loading}
            className="mt-10 mx-auto flex px-10 py-3 rounded-full text-lg font-bold text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:scale-105 transition-transform shadow-lg"
          >
            {loading && <IoSync className="animate-spin mr-2" />}
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>

        <div className="mt-10 bg-white/10 backdrop-blur-xl rounded-xl p-6 shadow-lg">
          <h3 className="text-2xl font-bold text-center text-white mb-4">
            Company Affiliations
          </h3>

          {profile.companies?.length > 0 ? (
            <div className="grid gap-4">
              {profile.companies.map((c, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-5 py-3 rounded-lg shadow"
                >
                  <span className="font-semibold">{c.companyName}</span>
                  <span className="px-3 py-1 text-sm bg-white/20 rounded-full">
                    {c.role}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-300">
              No company affiliations found
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
