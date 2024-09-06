import { useDispatch, useSelector } from "react-redux";
import CharacterUpload from "../components/CharacterUpload";
import { useEffect, useState } from "react";
import { fetchCharacterDetail } from "../features/character/characterSlice";
import { useParams } from "react-router-dom";

export default function UpdateCharacter() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const character = useSelector((state) => state.character.detail);
  const [image, setImage] = useState("");

  useEffect(() => {
    dispatch(fetchCharacterDetail(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (character) {
      setImage(character.imageUrl);
    }
  }, [character]);
  return (
    <div>
      {/* Home Section */}
      <section className="container my-4" id="home-section">
        <div className="row">
          {/* Update Section */}
          <section
            className="col-md-12 col-lg-9 offset-lg-1"
            id="update-product-section"
          >
            <div className="card shadow-sm" style={{ marginTop: "2rem" }}>
              <div
                className="card-body"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <h1 className="card-title display-4 mb-4 text-center">
                  Update Image Character
                </h1>
                <div className="mb-4 text-center">
                  <h5 className="mb-4">
                    Character Name: {character.name || "Character name not available"}
                  </h5>
                  <img
                    src={image || "Character image not available"}
                    alt="Current character image not available"
                    style={{ width: "40%", height: "auto" }}
                  />
                </div>

                <div style={{ marginTop: "1rem" }}>
                <CharacterUpload fetchImage={() => setImage(character.imageUrl)} id={id} />
                </div>
              </div>
            </div>
          </section>
          {/* End Update Section */}
        </div>
      </section>
      {/* End Home Section */}
    </div>
  );
}
