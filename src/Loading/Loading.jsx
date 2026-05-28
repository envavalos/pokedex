import React from "react";
import loadingGif from "../assets/simple_pokeball.gif";

const Loader = () => {
  return (
    <div style={styles.container}>
      <img src={loadingGif} alt="Loading..." style={simple_pokeball.gif} />
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#181b1d",
  },
};

export default Loader;