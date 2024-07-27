import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

function MyApp(){
    return (
        <div>
            <h1>Custom App! chai</h1>
        </div>
    )
}

// const ReactElement ={
//     type:'a',
//     props:{
//         href:'https://www.google.com',
//         target:'_blank',
//     },
//     children:'Click me to go to google'
// }

const anotherElement = (
    <a href="https://google.com" target='_blank'>Visit google
    </a>
)
const anotheruser = "  | Chai aur code "

const reactElement = React.createElement(
    'a',
    {href: 'https://google.com', target:'_blank'},
      'Click me to go to google',
      anotheruser
)

ReactDOM.createRoot(document.getElementById('root')).render(

    reactElement
  
)
