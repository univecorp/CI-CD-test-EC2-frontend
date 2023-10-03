import { Modal } from "react-bootstrap";
import { Bounce } from "react-reveal";
import "./videoRender.css";
function VideoRender(props) {
  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        classname="modal-div"
      >
        <Modal.Header closeButton>
          <Bounce>
            <Modal.Title
              id="contained-modal-title-vcenter"
              className="fw-bold text-primary"
            >
              {props.title}
            </Modal.Title>
          </Bounce>
        </Modal.Header>
        <Modal.Body className="p-4 ">
          <iframe
            className="mx-auto p-2  iframe"
            width="100%"
            height="400"
            src={`https://www.youtube.com/embed/${props.videoId}?autoplay=1&enablejsapi=1`}
            title="Unive review"
            allow="accelerometer; autoplay; muted; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default VideoRender;
