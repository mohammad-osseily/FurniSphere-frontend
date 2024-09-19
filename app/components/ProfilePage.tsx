// app/profile/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  updateProfile,
  getUserFromLocalStorage,
} from "../services/authServices";
import Swal from "sweetalert2";

interface ProfileFormInputs {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const ProfilePage = () => {
  const user = getUserFromLocalStorage();
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormInputs>({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
    },
  });

  useEffect(() => {
    reset({
      name: user?.name || "",
      email: user?.email || "",
    });
  }, [user, reset]);

  const onSubmit = async (data: ProfileFormInputs) => {
    setLoading(true);

    try {
      await updateProfile(
        data.name,
        data.email,
        data.password,
        data.password_confirmation
      );
      Swal.fire({
        title: "Success!",
        text: "Profile updated successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to update profile.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-3xl font-semibold mb-6">Update Profile</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block mb-2 text-sm font-medium">Name</label>
          <input
            {...register("name", { required: "Name is required" })}
            className="w-full px-4 py-2 border rounded-md"
            type="text"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">Email</label>
          <input
            {...register("email", { required: "Email is required" })}
            className="w-full px-4 py-2 border rounded-md"
            type="email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">
            Password (Leave blank to keep current password)
          </label>
          <input
            {...register("password")}
            className="w-full px-4 py-2 border rounded-md"
            type="password"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">
            Confirm Password
          </label>
          <input
            {...register("password_confirmation")}
            className="w-full px-4 py-2 border rounded-md"
            type="password"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-2 bg-primary text-white rounded-xl"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
