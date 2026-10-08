import Overlay from "../../ProfessionalSide/Overlay";

export default function ReadingList({ isOpen = false, onClose }) {
  return <Overlay isOpen={isOpen} onClose={onClose}>
    <h2 id="detail-title">Reading list</h2>
  </Overlay>;
}
