import { Row, Col } from "reactstrap";
import "./confirmation.css";
const Confirmation = () => {
  return (
    <div className="ty-text">
      <Row noGutters className="text-center">
        <Col>
          <p>Thank You!</p>
          <p className="thanks-subtext">
            You should receive an email with the details of your reservation.
          </p>
          <p>As a reminder, no show will have minimum $10 charge</p>
        </Col>
      </Row>      
    </div>
  )
}

export default Confirmation