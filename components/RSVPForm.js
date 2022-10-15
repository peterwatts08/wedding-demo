import { Container, Row, Form, Button } from 'react-bootstrap'

export default function RSVPForm({ error, state, index, updateGuestProperty }) {

  const { rsvp = false, name, dietaryRequirements = '', travelOption = '', attending = false, comments = '', partnerName, partnerAttending } = state

  const attendingMessage = 'Thank you for confirming your attendance. We are excited for you to celebrate with us!'
  const notAttendingMessage = 'Thank you for letting us know that you are not able to attend.'

  return (
      <div className="form__container my-3">
        <p className="px-1">
          <strong>Guest:{' '}{name}</strong>
        </p>
        {
          rsvp &&
          <div className="form__message p-2">
           {attending === 'Yes' ? attendingMessage : notAttendingMessage}
           {attending === 'Yes' && <span role="img" aria-label="celebration emoji" className="ms-2">&#x1F389;</span>}
          </div>
        }
          <Form.Floating>
            <Form.Select 
              id="attendanceInput"
              value={attending} 
              className="pt-4 mt-3"
              style={{ height: '90px' }}
              onChange={(e) => updateGuestProperty(index, 'attending', e.target.value)}
              size="lg"
              isInvalid={!!error && !attending}
              disabled={rsvp}
            > 
              <option value=""></option>
              <option value="Yes">Joyfully accept.</option>
              <option value="No">Regretfully decline.</option>
            </Form.Select>
            <label htmlFor="attendanceInput" className="form__label">Please select an RSVP option</label>
          </Form.Floating>
          {
            attending === 'Yes' &&
            <>
            {
              partnerName &&
              <Form.Floating>
                <Form.Select 
                  as="input" 
                  id="partnerAttendingInput"
                  value={partnerAttending} 
                  onChange={(e) => updateGuestProperty(index, 'partnerAttending', e.target.value)}
                  size="lg"
                  className="pt-4 mt-3"
                  style={{ height: '90px' }}
                  disabled={rsvp}
                >
                  <option value=""></option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </Form.Select>
                <label htmlFor="dietaryRequirementsInput" className="form__label">{`Will ${partnerName} be joining us for the evening? (from 7:30pm)`}</label>
              </Form.Floating>
            }
            <Form.Floating>
              <Form.Control 
                as="input" 
                id="dietaryRequirementsInput"
                value={dietaryRequirements} 
                onChange={(e) => updateGuestProperty(index, 'dietaryRequirements', e.target.value)}
                size="lg"
                className="pt-4 mt-3"
                style={{ height: '90px' }}
                disabled={rsvp}
              />
              <label htmlFor="dietaryRequirementsInput" className="form__label">Please enter any dietary requirements</label>
            </Form.Floating>
            <Form.Floating>
             <Form.Select 
              id="travelOptionInput"
              value={travelOption} 
              className="pt-4 mt-3"
              style={{ height: '90px' }}
              onChange={(e) => updateGuestProperty(index, 'travelOption', e.target.value)}
              size="lg"
              isInvalid={!!error && travelOption === ''}
              disabled={rsvp}
            > 
              <option value=""></option>
              <option value="Coach from Cranleigh">Wedding coach</option>
              <option value="Own transport">Own travel arrangements</option>
            </Form.Select>
            <label htmlFor="travelOptionInput" className="form__label">Please select a travel option</label>
            </Form.Floating>
            </>
          }
          {
            (attending === 'Yes' || attending === 'No') &&
            <Form.Floating>
              <Form.Control 
                as="input" 
                id="commentInput"
                value={comments} 
                onChange={(e) => updateGuestProperty(index, 'comments', e.target.value)}
                size="lg"
                className="pt-4 mt-3"
                style={{ height: '90px' }}
                disabled={rsvp}
              />
              <label htmlFor="commentInput" className="form__label">Please enter any additional comments</label>
            </Form.Floating>
          }
      </div>
  )
}