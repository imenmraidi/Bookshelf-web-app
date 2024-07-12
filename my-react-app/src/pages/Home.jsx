import React, { Component } from "react";
import TopBar from "../components/TopBar";
import Container from "./Container";

function Home() {
  return (
    <div className="bg-bg-2 m-0 p-6 h-screen w-screen flex flex-col">
      <TopBar />
      <Container />
    </div>
  );
}

export default Home;
