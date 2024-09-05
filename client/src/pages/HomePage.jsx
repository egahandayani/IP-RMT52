import CharacterCard from "../components/CharacterCard";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCharacters, setPage } from "../features/character/characterSlice";

export default function HomePage() {
  const dispatch = useDispatch();
  const { list: { data: characters, currentPage: page, totalPages } } = useSelector(
    (state) => state.character
  );
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchCharacters({ page, q: search }));
  }, [dispatch, page, search]);

  // Handle search
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    dispatch(setPage(1));
  };

  // Pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <div className="container py-5">
      {/* Search */}
      <div className="row mb-4">
        <div className="col-md-4">
          <input
            type="search"
            id="search"
            className="form-control"
            placeholder="Search..."
            value={search}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      {/* End Search */}

      <div className="d-flex gap-4 flex-wrap">
        {characters.map((character) => (
          <CharacterCard character={character} key={character.id} />
        ))}
      </div>

      {/* Pagination */}
      <nav
        aria-label="Page navigation example"
        className="py-5 m-auto d-flex justify-content-center"
      >
        <ul id="pagination" className="pagination justify-content-center">
          {getPageNumbers().map((number) => (
            <li
              key={number}
              className={`page-item ${number === page ? "active" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => dispatch(setPage(number))}
              >
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      {/* End Pagination */}
    </div>
  );
}
