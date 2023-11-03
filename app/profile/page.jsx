"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";

import React from "react";

const MyProfile = () => {
  const { data: session } = useSession();
  const [posts, setPost] = useState([]);
  const router = useRouter();

  ///////////////////////////
  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  ////////////////
  const handleDelete = async (post) => {
    console.log(post);
    const hasConfirmed = confirm("are u sure you want to delete this prompt");

    if (hasConfirmed) {
      console.log(hasConfirmed);
      try {
        await fetch(`api/prompt/${post._id}`, { method: "DELETE" });

        const filteredPosts = posts.filter((item) => item._id !== post._id);
        setPost(filteredPosts);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    const fetchPrompt = async () => {
      try {
        const res = await fetch(`/api/users/${session?.user.id}/posts`);
        if (!res.ok) throw new Error("there was an error fetching");
        const data = await res.json();

        setPost(data);
      } catch (err) {
        console.log(err);
      }
    };
    if (session?.user.id) fetchPrompt();
  }, [session?.user.id]);

  return (
    <Profile
      name="My"
      desc="welcome to your profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
