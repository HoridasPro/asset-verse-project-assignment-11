import React, { useEffect, useState } from "react";
import HeroBanner from "./HeroBanner";
import AboutSection from "./AboutSection";
import FeaturesSection from "./FeaturesSection";
import TestimonialsStats from "./TestimonialsStats";
import ExtraSections from "./ExtraSections";
import Loading from "../../Loading/Loading";

const Home = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [setLoading]);
  if (loading) {
    return <Loading />;
  }

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
