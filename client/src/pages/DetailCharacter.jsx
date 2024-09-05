import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCharacterDetail } from "../features/character/characterSlice";

export default function DetailCharacter() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const character = useSelector((state) => state.character.detail);

  useEffect(() => {
    dispatch(fetchCharacterDetail(id));
  }, [dispatch, id]);

  if (!character || !character.name) return <p>Loading...</p>;

  return (
    <div>
      {/* Detail Main Entity Page */}
      <div className="detail-container">
      <img src={character.imageUrl} alt={character.name} className="entity-image" />
      <h2 className="entity-name">{character.name}</h2>
      <p className="entity-description">Films: {character.films?.join(', ') || "Not Available"}</p>
      <p className="entity-description">TV Shows: {character.tvShows?.join(', ') || "Not Available"}</p>
      <p className="entity-description">Video Games: {character.videoGames?.join(', ') || "Not Available"}</p>
    </div>
      {/* End Detail Main Entity Page */}
    </div>
  );
}
