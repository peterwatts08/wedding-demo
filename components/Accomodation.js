import { useState, useEffect } from 'react';
import ReactDOMServer from 'react-dom/server'
import { Container, Row, Col, Image, Button } from 'react-bootstrap'
import GoogleMap from 'google-map-react';
import locations from '../functions/locations';

export default function Accomodation() {

  const [currentLocation, setCurrentLocation] = useState(0)
  const [zoom, setZoom] = useState(10)
  const [map, setMap] = useState(null)
  const [maps, setMaps] = useState(null)
  const [directionsRenderer, setDirectionsRenderer] = useState(null)
  const [infoWindow, setInfoWindow] = useState(null)
  const venueLocation = { lat: 51.47885737301142, lng: -0.29556227279027836 }

  const LocationTile = ({ url, address, num, name, venue, lat, lng, description }) => {

    const [expanded, setExpanded] = useState(num === currentLocation)
    const handleClick = () => {
      if (!expanded && num !== currentLocation) {
        setCurrentLocation(num)
        if (num) {
          plotRoute(venueLocation, { lat, lng })
        } else {
          if (directionsRenderer) {
            directionsRenderer.setMap(null);
          }
          if (infoWindow) {
            infoWindow.close()
          }
          setZoom(10)
        }
      }
    }

    return (
      <div className={`location__tile${expanded ? '--expanded' : ''} p-2 my-3`} onClick={handleClick}>
        <div className="d-flex">
          <span className={`location__icon${venue ? '--venue' : ''} p-2 my-auto`}>{num ? num : <span>&#9733;</span>}</span>
          <span className="my-auto ps-2"><strong>{name}</strong>{venue && <em>{' - Venue'}</em>}</span>
        </div>
        {
          !!description &&
          <div>
            <p className="location__description p-0 m-0 pt-2">{description}</p>
          </div>
        }
        {
          expanded &&
          <div className="d-flex justify-content-between mt-2">
            { address && <p className="location__address pt-2 px-1 m-0 my-auto"><em>{address}</em></p> }
            { url && <div className="d-flex"><Button className="mb-0 mt-auto" variant="outline-dark" as="a" href={url} target="_blank">View online</Button></div>}
          </div>
        }
      </div>
    )
  }

  const LocationPin = ({ venue, num, lat, lng }) => {

    const handleClick = () => {
      if (num !== currentLocation) {
        setCurrentLocation(num)
        if (num) {
          plotRoute(venueLocation, { lat, lng })
        } else {
          if (directionsRenderer) {
            directionsRenderer.setMap(null);
          }
          if (infoWindow) {
            infoWindow.close()
          }
          setZoom(10)
        }
      } 
    }

    return (
      <span lat={lat} lng={lng} className={`location__icon${venue ? '--venue' : ''} p-2`} style={{ cursor: 'pointer' }} onClick={handleClick}>
        {num ? num : <span>&#9733;</span>}
      </span>
    )
  }

  const plotRoute = (origin, destination) => {
    const directionsService = new maps.DirectionsService();
    directionsRenderer.setMap(null);
    directionsRenderer.setMap(map);
    const request = {
      origin,
      destination,
      travelMode: 'DRIVING',
      provideRouteAlternatives: false,
      drivingOptions: {
        departureTime: new Date(),
        trafficModel: 'pessimistic'
      },
      unitSystem: google.maps.UnitSystem.IMPERIAL
    };
    directionsRenderer.setOptions({
      suppressMarkers: true
    });
    directionsService.route(request, (result, status) => {
      if (status === 'OK') {
        directionsRenderer.setDirections(result);
        const leg = result.routes[0].legs[0]
        const infoDiv = ReactDOMServer.renderToString(
            <div className="location__info-box">
              <p className="pe-2 m-0"><strong>Distance:</strong>{' '}{leg.distance.text}</p>
              <p className="pe-2 m-0"><strong>Time:</strong>{' '}{leg.duration.text}</p>
            </div>
        )
        if (infoWindow) {
          infoWindow.close()
        }
        setInfoWindow(new maps.InfoWindow(
          { 
            content: infoDiv, 
            position: { lat: (origin.lat+destination.lat)/2, lng: (origin.lng+destination.lng)/2 } 
          }
        ))
      }
    });
  }

  useEffect(() => {
    if (infoWindow) {
      infoWindow.open({ map, shouldFocus: false })
    }
  }, [infoWindow])

  return (
    <>
    <Container fluid className="content__container">
        <Row xs={1} lg={2}>
          <Col xs={12} lg={3}>
              {
                locations.map((location,i) => <LocationTile key={i} {...location} num={i}/>)
              }
          </Col>
          <Col xs={12} lg={9}>
            <div className="location__map my-3">
              <GoogleMap
                bootstrapURLKeys={
                  { 
                    key: process.env.NEXT_PUBLIC_GOOGLE_API
                  }
                }
                defaultCenter={venueLocation}
                center={{ lat: locations[currentLocation].lat, lng: locations[currentLocation].lng }}
                defaultZoom={10}
                zoom={zoom}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) => {
                  setMap(map)
                  setMaps(maps)
                  setDirectionsRenderer(new maps.DirectionsRenderer())
                }}
              >
              {
                locations.map((location,i) => <LocationPin key={i} num={i} {...location} />)
              }
              </GoogleMap>
            </div>
          </Col>
        </Row>
    </Container>
    </>
  )
}