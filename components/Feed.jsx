"use client";
import React from "react";
import PromptCard from "./PromptCard";
import { useState, useEffect } from "react";


const PromptCardList = ({ post, handleTagClick }) => (
  <div className='mt-16 prompt_layout'>
    {post.map((item) => (
      <PromptCard key={item._id} post={item} handleTagClick={handleTagClick} />
    ))}
  </div>
);
const Feed = () => {
  const [text, setText] = useState("");
  const [post, setPost] = useState([]);
  const handleSearchChange = (e) => {
    setText(e.target.value);
  };
  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPost(data);
    };
    fetchPost();
  }, []);
  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          className='search_input peer'
          type='text'
          placeholder='Search for a tag or by username'
          value={text}
          onChange={handleSearchChange}
          required
        />
      </form>
      <PromptCardList post={post} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
