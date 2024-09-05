import { useState } from "react";
import { useDispatch } from "react-redux";
import { editCharacterImage } from "../features/character/characterSlice";
import { useNavigate } from "react-router-dom";

export default function CharacterUpload({ fetchImage, id }) {
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("imageUrl", file);
    dispatch(editCharacterImage({ id, formData }));
    fetchImage();
    navigate("/myCharacters");
  };
  return (
    <div>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
          padding: "1.5rem",
          borderRadius: "0.8rem",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          backgroundColor: "#f8f9fa",
          maxWidth: "600px",
          margin: "2rem auto",
        }}
        onSubmit={handleOnUpload}
      >
        <label
          htmlFor="formFile"
          style={{
            fontSize: "1.1rem",
            fontWeight: "bold",
            marginBottom: "0.5rem",
            color: "#333",
          }}
        >
          Select file:
        </label>
        <input
          id="formFile"
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          style={{
            padding: "0.5rem",
            fontSize: "1rem",
            border: "1px solid #ccc",
            borderRadius: "0.25rem",
            marginBottom: "1rem",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "0.55rem 1.5rem",
            fontSize: "1rem",
            color: "#fff",
            backgroundColor: "#007bff",
            border: "none",
            borderRadius: "0.25rem",
            cursor: "pointer",
            transition: "background-color 0.5s",
          }}
        >
          Upload
        </button>
      </form>
    </div>
  );
}
