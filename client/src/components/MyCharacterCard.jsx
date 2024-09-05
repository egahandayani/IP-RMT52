import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteMyCharacter } from "../features/character/characterSlice";

export default function MyCharacterCard({ id, name, imageUrl, films }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleUpdate = () => {
    navigate(`/characters/${id}/update-image`);
  };

  const handleDelete = () => {
    dispatch(deleteMyCharacter(id));
    navigate("/myCharacters");
  };

  return (
    <div className="card" style={{ width: "12rem" }}>
      <img src={imageUrl} className="card-img-top" alt={name} />
      <div className="card-body">
        <h6 className="card-title">{name}</h6>
        <p className="card-text">Appears in: {films ? films.join(', ') : "Not Available"}</p>
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
            className="btn btn-warning w-100"
            onClick ={handleUpdate}
          >
            Update
          </button>
          <button
            style={{
              width: "100%",
              marginTop: "1rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="btn btn-danger w-100"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
