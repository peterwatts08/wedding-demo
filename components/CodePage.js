import { useState, useEffect } from 'react';
import CodeInput from './CodeInput';

const CodePage = ({ name, setAuth }) => {

  const [height, setHeight] = useState(0);

  useEffect(() => {
    setHeight(window.innerHeight)
  }, [])

  return (
    <div className="code__container" style={{ height: `${height - 50}px` }}>
      <CodeInput setAuth={setAuth} name={name}/>
    </div>
  )
}

export default CodePage