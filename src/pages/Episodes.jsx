import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const Episodes = (props) => {
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchEpisodes = async (page) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/episode?page=${page}`
      );
      const data = await response.json();

      setEpisodes(data.results);
      setTotalPages(data.info.pages);
    } catch (err) {
      setError("Error fetching episodes");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEpisodes(currentPage);
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredEpisodes = episodes.filter((episode) =>
    episode.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="bg-black p-6 rounded-md">
        <h1 className="font-bold text-green-600 text-[38px] font-mono my-10 py-10">
          Episodios de Rick and Morty
        </h1>

        <div className="  text-center my-4">
          <input
            type="text"
            placeholder="Buscar episodio"
            value={searchTerm}
            onChange={handleSearchChange}
            className="p-3 mb-10 rounded-lg border-2 border-green-600 text-black bg-violet-700 font-bold"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-10">
          {filteredEpisodes.length > 0 ? (
            filteredEpisodes.map((episode) => (
              <div key={episode.id} className="border p-4 m-4">
                <h2 className="font-bold text-violet-700 text-xl px-10 py-3">
                  {episode.name}
                </h2>
                <h2 className="font-bold text-violet-700 text-xl px-10 py-3">
                  {episode.episode}
                </h2>
                <h2 className="font-bold text-violet-700 text-xl px-10 py-3">
                  {episode.air_date}
                </h2>
              </div>
            ))
          ) : (
            <p className="text-violet-700 text-center font-bold">
              No se encontraron episodios.
            </p>
          )}
        </div>

        <div className="flex justify-center gap-10 font-bold text-xl text-green-600 py-10 mt-10">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            Previous
          </button>
          <span>{` Page ${currentPage} of ${totalPages} `}</span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
        <div className="text-center font-bold text-4xl bg-green-600 hover:bg-violet-700 text-violet-700 hover:text-green-600 rounded-md mt-10 p-4">
          <NavLink to="/home">Home</NavLink>
        </div>
      </div>
    </>
  );
};

export default Episodes;