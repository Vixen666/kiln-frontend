import React, { useState, useEffect } from "react";
import "./styles.css";

function NewTemplateModal({ onSave, onClose }) {
  const [newTemplateId, setNewTemplateId] = useState(null);
  const [templateName, setTemplateName] = useState("");

  useEffect(() => {
    // Fetch new TemplateId from the database
    // Replace this with your actual API call
    const fetchNewTemplateId = async () => {
      // Simulated API call
      const fetchedId = "new-id"; // Replace with actual fetched ID
      setNewTemplateId(fetchedId);
    };

    fetchNewTemplateId();
  }, []);

  const handleSave = () => {
    if (templateName.trim() !== "") {
      onSave(newTemplateId, templateName);
    } else {
      alert("Please enter a template name.");
    }
  };

  return (
    <div className="modal">
      <h2>Create New Template</h2>
      <p>Template ID: {newTemplateId}</p>
      <input
        type="text"
        placeholder="Template Name"
        value={templateName}
        onChange={(e) => setTemplateName(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default NewTemplateModal;
