import CharacterCard from "../components/CharacterCard";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCharacters, setPage } from "../features/character/characterSlice";
import ipApi from "../helpers/http-client";

export default function HomePage() {
  const dispatch = useDispatch();
  const {
    list: { data: characters, currentPage: page, totalPages },
  } = useSelector((state) => state.character);
  const [search, setSearch] = useState("");
  const [question, setQuestion] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [loading, setLoading] = useState(false);

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

  // Handle Gemini AI request
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("access_token");
    try {
      const res = await ipApi.post(
        "/disney-characters",
        {
          question: question,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAiResponse(res.data.response);
    } catch (err) {
      console.error("Error fetching AI response:", err);
      setAiResponse("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
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

      {/* Gemini AI Section */}
      <div className="row mb-4">
        <div className="col-md-6">
          <h3>Ask Gemini AI about Disney Characters</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Ask about any Disney character..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="btn btn-info"
              disabled={loading}
            >
              {loading ? "Loading..." : "Ask"}
            </button>
          </form>

          {aiResponse && (
            <div className="mt-4">
              <h4>Gemini AI Response:</h4>
              <p
                style={{
                  textAlign: "justify",
                }}
              >
                {aiResponse}
              </p>
            </div>
          )}
        </div>
      </div>
      {/* End Gemini AI Section */}

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
