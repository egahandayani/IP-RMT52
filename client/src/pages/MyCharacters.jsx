import { useDispatch, useSelector } from "react-redux";
import MyCharacterCard from "../components/MyCharacterCard";
import { fetchMyCharacters } from "../features/character/characterSlice";
import { useEffect } from "react";

export default function MyCharacters() {
  const dispatch = useDispatch();
  const myCharacters = useSelector((state) => state.character.myCharacters);

  useEffect(() => {
    dispatch(fetchMyCharacters());
  }, [dispatch]);

  return (
    <div>
      <div className="container py-5">
        <div className="d-flex gap-4 flex-wrap">
          {myCharacters.map((character, index) => (
            <MyCharacterCard
              key={index}
              id={character.id}
              name={character.name}
              imageUrl={character.imageUrl}
              films={character.films}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
