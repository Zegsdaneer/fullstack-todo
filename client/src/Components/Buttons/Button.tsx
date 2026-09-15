import React from 'react'
import './Button.css'


interface ButtonProps {
    onClick?: () => void; //What happens when clicked (optional) (?)
    children: React.ReactNode;
    type?: 'button' | 'submit'; // Add type here (default to button)
    size?: 'sm' | 'md' | 'lg' | 'md2';
}

function Button({ children, onClick, type = 'button', size}: ButtonProps) {

    const className = 'btn';
    return(
        <button className={`${className} btn-${size}`} onClick={onClick} type={type} >
            {children}
        </button>
    )
}

export default Button;



// React.ReactNode is a TypeScript type that represents anything React can render. it is the most comprehensive and permissive type for uI vlues in react, commonly used to type the children prop of a component.
// Under the hood, React.ReactNode is a broad union type containing... react elements...
//Primitives strings and number... which renders as text node strings..
// Booleans and empty values boolean, null and undefined, whicha re balid but render nothing.
// arrats or fragments
// portals and promises....


// Why we use type attribute because it tells the browser exactly how this button should behave when it lives inside a form.
// If you dont explictly tell a butotn what its type is... it can cause accidental bugs or break standard web features.
//type=submit automatically connects that button to the form... 