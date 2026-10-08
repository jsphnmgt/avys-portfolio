import Overlay from "../../ProfessionalSide/Overlay";

export default function GameShelf({ isOpen = false, onClose }) {
  return <Overlay isOpen={isOpen} onClose={onClose}>
    <h2 id="detail-title">Game Shelf</h2>
  </Overlay>;
}
