import Overlay from "../../ProfessionalSide/Overlay";

export default function Watchlist({ isOpen = false, onClose }) {
  return <Overlay isOpen={isOpen} onClose={onClose}>
    <h2 id="detail-title">Watchlist</h2>
  </Overlay>;
}
