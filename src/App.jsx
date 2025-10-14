import React from "react";
import PatientForm from "./components/PatientForm";

const App = () => {
  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h2>Tele Anesthesia Pro — Patient Assessment</h2>
      <PatientForm />
    </div>
  );
};

export default App;
