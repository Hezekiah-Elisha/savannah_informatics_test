import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Footer from "../components/Footer";

export default function page() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
    </div>
  );
}
