import React from "react";
import HeroBanner from "./HeroBanner";
import AboutSection from "./AboutSection";
import FeaturesSection from "./FeaturesSection";
import TestimonialsStats from "./TestimonialsStats";
import ExtraSections from "./ExtraSections";

const Home = () => {
  return (
    <div>
      <HeroBanner></HeroBanner>
      <AboutSection></AboutSection>
      <FeaturesSection></FeaturesSection>
      <TestimonialsStats></TestimonialsStats>
      <ExtraSections></ExtraSections>
    </div>
  );
};

export default Home;
