"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ProfilePage from "@components/ProfilePage";

const Profile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();
      setPosts(data);
    };

    if (session?.user.id) fetchPosts();
  }, [session?.user.id]);
  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  const handleDelete = (post) => {};
  return (
    <ProfilePage
      name='My'
      desc='Welcome to your personalized profile page'
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default Profile;