"use client";

import { useAuthStore } from "@/lib/store/authStore";
import css from "./EditProfilePage.module.css";
import Image from "next/image";
import { useState } from "react";
import { updateMe } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";

const EditProfile = () => {
  const router = useRouter();
  const { user, setUser } = useAuthStore();
  const [userName, setUserName] = useState(user?.username ?? "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const handleSaveUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const updateUser = await updateMe({ username: userName });
      setUser(updateUser);
      router.push("/profile");
    } catch (error) {
      console.error("Oops, some error:", error);
    }
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        {user?.avatar && (
          <Image
            src={user.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        )}

        <form onSubmit={handleSaveUser} className={css.profileInfo}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              onChange={handleChange}
              id="username"
              value={userName}
              type="text"
              className={css.input}
            />
          </div>

          <p>Email: {user?.email ?? ""}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              onClick={() => router.push("/profile")}
              type="button"
              className={css.cancelButton}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditProfile;
