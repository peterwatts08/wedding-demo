import { useEffect } from 'react';
import { Button, Modal, Image } from 'react-bootstrap';
import CalendarButton from './CalendarButton';

export default function Invite({ showInvite, closeInvite, goToRSVP }) {

  const handleClick = () => {
    goToRSVP()
    closeInvite()
  }

  const inviteType = 'day'
  const day = inviteType === 'day'

  return (
      <Modal
        show={showInvite}
        onHide={closeInvite}
        dialogClassName="invite__modal"
      >
        <Modal.Header closeButton />
        <Modal.Body>
          <div className="d-flex">
            <Image 
              src={`/images/invite.png`} fluid className={`mx-auto shadow`}
              style={{ height: '70vh', border: '1px black solid' }}
            />
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-content-between">
            <CalendarButton />
            <div className="d-flex flex-column">
              <Button variant="dark" size="lg" onClick={handleClick}>
                  Go to RSVP
              </Button>
              <span className="pt-2" style={{ fontSize: '14px' }}>Please RSVP by 1st January 2023</span>
            </div>
        </Modal.Footer>
      </Modal>
  );
}