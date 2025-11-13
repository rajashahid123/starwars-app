import React from "react";

interface CharacterModalProps {
  character: any;
  onClose: () => void;
}

const CharacterModal: React.FC<CharacterModalProps> = ({ character, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
  <div className="bg-gray-800 p-6 rounded-2xl w-11/12 max-w-md text-gray-100 relative">
    <button
      onClick={onClose}
      className="absolute top-2 right-3 text-yellow-400 text-2xl"
    >
      ✖
    </button>

    <h2 className="text-2xl font-bold text-yellow-400 mb-4 text-center">
      {character.name}
    </h2>

    <img
      src={`https://picsum.photos/300?random=${Math.floor(Math.random() * 1000)}`}
      alt={character.name}
      className="w-full h-56 object-cover rounded-xl mb-4"
    />

    <p><strong>Height:</strong> {character.height} cm</p>
    <p><strong>Mass:</strong> {character.mass} kg</p>
    <p><strong>Birth Year:</strong> {character.birth_year}</p>
    <p><strong>Date Added:</strong> {new Date(character.created).toLocaleDateString("en-GB")}</p>
    <p><strong>Films:</strong> {character.films.length}</p>
    <p><strong>Homeworld:</strong> {character.homeworldData?.name || "N/A"}</p>
    <p><strong>Terrain:</strong> {character.homeworldData?.terrain || "N/A"}</p>
    <p><strong>Climate:</strong> {character.homeworldData?.climate || "N/A"}</p>
    <p><strong>Population:</strong> {character.homeworldData?.population || "N/A"}</p>
  </div>
</div>

  );
};

export default CharacterModal;
