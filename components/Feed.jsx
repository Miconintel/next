"use client";

import React from "react";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ resp, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {resp.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearch] = useState("");
  const [posts, setPost] = useState([]);

  useEffect(() => {
    const fetchPrompt = async () => {
      try {
        const res = await fetch("/api/prompt");
        if (!res.ok) throw new Error("there was an error fetching");
        const data = await res.json();

        setPost(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPrompt();
  }, []);

  const handleSearchChange = (e) => {};
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="search for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList resp={posts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
