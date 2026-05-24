export default function MuseumRooms() {
  const rooms = [
    "Pavilhão da Terra e do Cosmos",
    "Pavilhão de Ciências da Terra e História Natural",
    "Pavilhão das Civilizações Antigas (Arqueologia)",
    "Pavilhão de Artes e Cultura",
    "Pavilhão de História e Conflitos",
    "Pavilhão de Ciência, Tecnologia e Inovação",
    "Pavilhão da Biodiversidade e Meio Ambiente"
  ]

  return (
    <div className="pixel-box">
      <h2 className="pixel-text mb-4">SALAS</h2>
      {rooms.map((room, index) => (
        <button key={index} className="pixel-button w-full mb-3 text-left text-xs leading-5">
          {room}
        </button>
      ))}
    </div>
  )
}
