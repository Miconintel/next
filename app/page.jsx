import React from "react";
import Feed from "@components/Feed";

const homepage = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        discover and share <br className="max-md:hidden" />
        <span className="orange_gradient text-center">AI-powered prompts </span>
      </h1>
      <p className="desc text-center">
        {" "}
        promptopia is an open source tool for modern world to discover
      </p>
      <Feed></Feed>
    </section>
  );
};

export default homepage;
