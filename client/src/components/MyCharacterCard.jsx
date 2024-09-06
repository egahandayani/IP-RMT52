import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteMyCharacter } from "../features/character/characterSlice";
import Swal from "sweetalert2";

export default function MyCharacterCard({ id, name, imageUrl, films }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleUpdate = () => {
    navigate(`/characters/${id}/update-image`);
  };

  const handleDelete = async () => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await dispatch(deleteMyCharacter(id));
        Swal.fire({
          title: "Deleted!",
          text: "Your character has been deleted.",
          icon: "success",
        });
      }
      navigate("/myCharacters");
    } catch (err) {
      console.log("🚀 ~ handleDelete ~ err:", err);
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
        src={imageUrl}
        className="card-img-top"
        alt={name}
        style={{
          width: "100%",
          height: "200px",
          objectFit: "cover",
        }}
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
            fontSize: "1.15rem",
            fontWeight: "bold",
          }}
        >
          {name}
        </h5>
        <p
          className="card-text"
          style={{
            margin: "0 0 0.5rem 0",
            fontSize: "1rem",
          }}
        >
          Appears in: {films ? films.join(", ") : "Not Available"}
        </p>
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
            onClick={handleUpdate}
          >
            Update
          </button>
          <button
            style={{
              width: "100%",
              marginTop: "auto",
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
