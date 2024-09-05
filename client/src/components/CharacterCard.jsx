import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createMyCharacter } from "../features/character/characterSlice";

export default function CharacterCard({ character }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDetails = () => {
    navigate(`/characters/${character.id}`);
  };

   const handleAddMyCharacter = async () => {
    try {
      await dispatch(createMyCharacter(character.id));
      navigate('/myCharacters');
    } catch (err) {
      console.log('Error adding character:', err);
    }
  };

  return (
    <div
      className="card"
      style={{
        flex: "1 1 calc(25% - 1rem)",
        maxWidth: "calc(19.5% - 1rem)",
        marginBottom: "5rem",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
        borderRadius: "0.8rem",
        overflow: "hidden",
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        textAlign: "center",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "1rem",
        padding: "8px",
        margin: "0 0.5rem",
        marginLeft: "10px",
        marginRight: "10px",
      }}
    >
      <img
        style={{
          width: "100%",
          height: "200px",
          objectFit: "cover",
        }}
        src={character.imageUrl}
        className="card-img-top"
        alt={character.name}
      />
      <div
        className="card-body"
        style={{
          padding: "1rem",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h5
          className="card-title"
          style={{
            margin: "0 0 0.5rem 0",
            fontSize: "1.10rem",
            fontWeight: "bold",
          }}
        >
          {character.name}
        </h5>
        <div className="d-flex gap-3 pt-5">
          <button
            style={{
              width: "100%",
              marginTop: "auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            type="submit"
            className="btn btn-secondary w-100"
            onClick={handleDetails}
          >
            Details
          </button>
          <button
            style={{
              width: "100%",
              marginTop: "1rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="btn btn-primary w-100"
            onClick={handleAddMyCharacter}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
