import React, { useState, useEffect } from "react";
import { NavLink, useSearchParams } from "react-router-dom";

const Character = () => {
  const [allCharacters, setAllCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);

  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";

  const fetchAllCharacters = async () => {
    setLoading(true);
    let allResults = [];
    let page = 1;
    let totalPages = 1;

    try {
      const initialResponse = await fetch(
        `https://rickandmortyapi.com/api/character?page=1`
      );
      const initialData = await initialResponse.json();
      allResults = initialData.results;
      totalPages = initialData.info.pages;

      for (page = 2; page <= totalPages; page++) {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character?page=${page}`
        );
        const data = await response.json();
        allResults = [...allResults, ...data.results];
      }

      setAllCharacters(allResults);
      setTotalPages(totalPages);
    } catch (err) {
      setError("Error fetching characters");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAllCharacters();
  }, []);

  const handleSearchChange = (e) => {
    setSearchParams({ search: e.target.value });
  };

  const filteredCharacters = allCharacters.filter((character) =>
    character.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="bg-black p-6 rounded-md">
        <h1 className="font-bold text-green-600 text-4xl font-sans tracking-widest my-10 text-center">
          Personajes de Rick and Morty
        </h1>

        <div className="text-center my-6">
          <input
            type="text"
            placeholder="Buscar personaje..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="p-3 rounded-lg border-2 border-green-600 text-black bg-violet-500 font-bold"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {filteredCharacters.length > 0 ? (
            filteredCharacters.map((character) => (
              <div
                key={character.id}
                className="bg-violet-700 p-6 rounded-lg shadow-lg max-w-xs text-center"
              >
                <img
                  src={character.image}
                  alt={character.name}
                  className="rounded-full mx-auto mb-4"
                />
                <h2 className="font-bold text-green-600 text-xl mb-2">
                  {character.name}
                </h2>
                <h2 className="text-black font-bold text-lg">
                  {character.status}
                </h2>
              </div>
            ))
          ) : (
            <p className="text-white">No se encontraron personajes</p>
          )}
        </div>

        <div className="text-center font-bold text-4xl bg-green-600 hover:bg-violet-700 text-violet-700 hover:text-green-600 rounded-md mt-10 p-4">
          <NavLink to="/home">Home</NavLink>
        </div>
      </div>
    </>
  );
};

export default Character;