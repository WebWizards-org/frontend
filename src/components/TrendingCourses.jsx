import React, { useEffect } from "react";
import axios from "axios";

function App() {
  const getCourse = () => {
    axios
      .get("https://api.coursera.org/api/courses.v1?q=search&query=python&limit=5")
      .then((res) => {
        console.log("Courses:", res.data.elements); // contains course list
      })
      .catch((err) => {
        console.error("Error fetching courses:", err);
      });
  };

  useEffect(() => {
    getCourse();
  }, []);

  return <h1>Check console for Coursera courses</h1>;
}

export default App;
