import { useState, useEffect } from 'react';
import dynamic from "next/dynamic";
import { Spinner } from 'react-bootstrap';

const props = {
  inputStyle: {
    fontFamily: 'monospace',
    margin:  '4px',
    MozAppearance: 'textfield',
    // width: '50px',
    borderRadius: '3px',
    fontSize: '28px',
    // height: '50px',
    border: '2px solid #D1D1D1',
    textAlign: 'center'
  },
  inputStyleInvalid: {
    fontFamily: 'monospace',
    margin:  '4px',
    MozAppearance: 'textfield',
    width: '50px',
    borderRadius: '3px',
    fontSize: '28px',
    height: '50px',
    border: '2px solid #D1D1D1',
    textAlign: 'center'
  }
}

const CodeInput = ({ name, setAuth }) => { 

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (window.localStorage.code) {
      checkPassword(window.localStorage.code)
    }
  }, [])

  const checkPassword = async (code) => {
    setLoading(true)
      return fetch("/api/codeCheck", {
      "method": "POST",
      "headers": { "content-type": "application/json" },
      "body": JSON.stringify({ code })
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setLoading(false)
        } else {
          setLoading(false)
          window.localStorage.setItem('code',code)
          setAuth(true)
        }
      })
  }

  const handleChange = (value) => {
    if (value.length === 6) {
      checkPassword(value)
    }
  }

  const ReactCodeInput = dynamic(import('react-code-input'));
  return (
    <>
    {
      loading ?
      <></> :
      <>
      <div className="d-flex flex-column">
        {!!name && <p className="mx-auto">Welcome,{' '}{name}.</p>}
        <ReactCodeInput type='number' fields={6} {...props} onChange={handleChange} className="text-center"/> 
      </div>
      </>
    }
    </>
  )
}

export default CodeInput

