import React, { useEffect, useState } from "react";
import CharacterModal from "../components/CharacterModal";

interface Character {
  name: string;
  height: string;
  mass: string;
  birth_year: string;
  species: string[];
  homeworld: string;
  films: string[];
  url: string;
  created: string; // Date Added
  homeworldData?: any;
}

const Home = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [filtered, setFiltered] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  // Filters
  const [search, setSearch] = useState("");
  const [selectedHomeworld, setSelectedHomeworld] = useState("All");

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://swapi.dev/api/people/?page=${page}`);
        if (!res.ok) throw new Error("Failed to fetch data");
        const data = await res.json();

        const withHomeworlds = await Promise.all(
          data.results.map(async (char: Character) => {
            try {
              const res2 = await fetch(char.homeworld);
              const hw = await res2.json();
              // Fetch species name if available
              let speciesName = "Unknown";
              if (char.species && char.species.length > 0) {
                const spRes = await fetch(char.species[0]);
                const spData = await spRes.json();
                speciesName = spData.name;
              }
              return { ...char, homeworldData: hw, species: [speciesName] };
            } catch {
              return { ...char, homeworldData: null, species: ["Unknown"] };
            }
          })
        );

        setCharacters(withHomeworlds);
        setFiltered(withHomeworlds);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [page]);

  // Filtering logic
  useEffect(() => {
    let filteredData = characters;

    if (search.trim()) {
      filteredData = filteredData.filter((char) =>
        char.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedHomeworld !== "All") {
      filteredData = filteredData.filter(
        (char) => char.homeworldData?.name === selectedHomeworld
      );
    }

    setFiltered(filteredData);
  }, [search, selectedHomeworld, characters]);

  const uniqueHomeworlds = [
    "All",
    ...new Set(
      characters
        .map((char) => char.homeworldData?.name)
        .filter((x): x is string => !!x)
    ),
  ];

  if (loading) return <p className="text-center text-yellow-400">Loading...</p>;
  if (error)
    return <p className="text-center text-red-400">Error: {error}</p>;

  return (
    <div className="px-4">
      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          className="px-4 py-2 rounded-lg text-black w-full sm:w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="px-4 py-2 rounded-lg text-black w-full sm:w-1/4"
          value={selectedHomeworld}
          onChange={(e) => setSelectedHomeworld(e.target.value)}
        >
          {uniqueHomeworlds.map((hw) => (
            <option key={hw}>{hw}</option>
          ))}
        </select>
      </div>

      {/* Character Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((char) => (
          <div
            key={char.url}
            onClick={() => setSelectedCharacter(char)}
            className={`p-4 rounded-2xl text-center cursor-pointer hover:scale-105 transition-transform ${
              char.species[0] === "Human"
                ? "bg-blue-700"
                : char.species[0] === "Droid"
                ? "bg-green-700"
                : "bg-gray-800"
            }`}
          >
            <img
              src={`https://picsum.photos/seed/${encodeURIComponent(
                char.name
              )}/200/300?grayscale&blur=2`}
              alt={char.name}
              className="w-full h-48 object-cover rounded-xl mb-3"
            />
            <h2 className="text-xl font-semibold text-yellow-400">
              {char.name}
            </h2>
            <p>Height: {char.height} cm</p>
            <p>Mass: {char.mass} kg</p>
            <p>Birth Year: {char.birth_year}</p>
            <p>Homeworld: {char.homeworldData?.name}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-4">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-yellow-500 text-black rounded-lg disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-lg">Page {page}</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-yellow-500 text-black rounded-lg"
        >
          Next
        </button>
      </div>

      {/* Modal */}
      {selectedCharacter && (
        <CharacterModal
          character={selectedCharacter}
          onClose={() => setSelectedCharacter(null)}
        />
      )}
    </div>
  );
};

export default Home;
