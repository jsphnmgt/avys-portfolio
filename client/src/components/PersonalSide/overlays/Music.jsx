import Overlay from "../../ProfessionalSide/Overlay";

export default function Music({ isOpen = false, onClose }) {
  return <Overlay isOpen={isOpen} onClose={onClose}>
    <h2 id="detail-title">Music Corner</h2>
  </Overlay>;
}
