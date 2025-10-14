import React, { useState } from "react";

const PatientForm = () => {
  const [patient, setPatient] = useState({
    name: "",
    age: "",
    gender: "",
    ASA: "",
    conditions: "",
  });
  const [suggestion, setSuggestion] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setPatient({ ...patient, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Patient Data:", patient);
    alert("Data submitted! Check console.");

    try {
      setLoading(true);
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patient),
      });
      const data = await res.json();
      setSuggestion(data.suggestion || "No suggestion returned.");
    } catch (err) {
      console.error(err);
      setSuggestion("Error getting suggestion.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 480, margin: "24px auto", padding: 16, fontFamily: "system-ui" }}>
      <h2>Patient Information</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 8 }}>
          <input name="name" placeholder="Name" onChange={handleChange} required style={{ width: "100%", padding: 8 }} />
        </div>
        <div style={{ marginBottom: 8 }}>
          <input name="age" type="number" placeholder="Age" onChange={handleChange} required style={{ width: "100%", padding: 8 }} />
        </div>
        <div style={{ marginBottom: 8 }}>
          <input name="gender" placeholder="Gender" onChange={handleChange} required style={{ width: "100%", padding: 8 }} />
        </div>
        <div style={{ marginBottom: 8 }}>
          <input name="ASA" placeholder="ASA Classification" onChange={handleChange} required style={{ width: "100%", padding: 8 }} />
        </div>
        <div style={{ marginBottom: 8 }}>
          <input name="conditions" placeholder="Medical Conditions" onChange={handleChange} style={{ width: "100%", padding: 8 }} />
        </div>
        <button type="submit" style={{ padding: "8px 16px" }} disabled={loading}>
          {loading ? "Analyzing..." : "Submit"}
        </button>
      </form>

      {suggestion && (
        <div style={{ marginTop: 16, padding: 12, border: "1px solid #ddd", borderRadius: 6 }}>
          <h3>OpenAI Suggestion</h3>
          <pre style={{ whiteSpace: "pre-wrap" }}>{suggestion}</pre>
        </div>
      )}
    </div>
  );
};

export default PatientForm;
