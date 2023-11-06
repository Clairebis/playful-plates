import Button from "../Button/Button.jsx";
import close from "../../Assets/Icons/close.svg";
import "../Modal/Modal.css";

export default function Modal(props) {
  const { isOpen, onClose, children } = props;

  function closeModal() {
    const modal = document.querySelector(".modal");
    modal.style.display = "none";
  }

  return (
    <div className="modal">
      <div className="modalContent">
        <div className="closeModal">
          <img src={close} alt="" onClick={closeModal} />
        </div>
        <div className="modalText">
          <p style={{ fontWeight: "bold" }}>{props.question}</p>
          <div className="modalBtnHorizontal">
            <Button
              text="No"
              className="button-outline btnSmall"
              onClick={closeModal}
            />
            <Button
              text="Yes"
              className="btnSmall"
              onClick={props.functionName}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
