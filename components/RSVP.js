import { useContext, useState, useEffect } from 'react';
import { Container, Row, Form, Button } from 'react-bootstrap'
import RSVPForm from './RSVPForm';

const guests = [
  {
    attending: '',
    comments: '',
    dietaryRequirements: '',
    eveningOnly: false,
    group: "1",
    groupOrder: 0,
    name: "Guest",
    partnerAttending: '',
    rsvp: false,
    travelOption: '',
    uid: '123'
  }
]

export default function RSVP() {

  const [guestState, updateGuestState] = useState(guests)
  const updateGuestProperty = (index, propName, newPropValue) => {
    updateGuestState(guests => {
      return guests.map((guest,i) => {
        if (index === i) {
          let newObj = guest
          newObj[propName] = newPropValue
          return newObj
        } else {
          return guest
        }
      })
    })
  }

  const rsvp = guestState.every(guest => guest.rsvp)

  useEffect(() => {
    updateGuestState(guests)
  }, [guests])

  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    const allGuestsComplete = guestState.every(guest => ((guest.attending === 'Yes' && !!guest.travelOption) || guest.attending === 'No'))
    if (allGuestsComplete) {
      const updatedState = guestState.map(guest => {
        const { uid, dietaryRequirements = '', travelOption, comments = '', attending, partnerAttending = '' } = guest
        if (attending === 'Yes') {
          return ({ ...guest, uid, attending: 'Yes', dietaryRequirements, travelOption, comments, rsvp: true, partnerAttending })
        } else {
          return ({ ...guest, uid, attending: 'No', dietaryRequirements: '', travelOption: '', comments, rsvp: true, partnerAttending })
        }
      })
      updateGuestProperty(0, 'rsvp', true)
    } else {
      setError('ERROR')
    }
  }

  const handleReset = () => {
    setError('')
    updateGuestProperty(0, 'rsvp', false)
  }

  return (
      <Form onSubmit={handleSubmit}>
        {guestState.map((guest,i) => <RSVPForm key={i} error={error} index={i} state={guest} updateGuestProperty={updateGuestProperty}/>)}
         <div className="d-flex justify-content-end">
            <div className="d-flex flex-column">
              <Button variant="dark" size="lg" className="mt-3" type="submit" disabled={rsvp}>
                {rsvp ? 'Submitted' : 'Submit'}
              </Button>
              {
                rsvp &&
                <span className="form__reset text-end py-1" onClick={handleReset}>
                  Need to change something?
                </span>
              }
            </div>
          </div>
      </Form>
  )
}