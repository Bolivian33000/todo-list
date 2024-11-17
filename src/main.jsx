import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <App />
  </StrictMode>
)


  {/* So all of the magic happens within the app, which then itself gets wrednered within the main componeent below,
    and the main.jsx file fetches the div in the document that contains the ID root, and basically throws all of our react code as 
    html inside of there. The document that has the ID "root" is the index.html file.
    */}



