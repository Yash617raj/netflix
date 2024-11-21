import React, { useEffect, useState } from 'react'
import './Nav.css'

function Nav() {
    const [show,handleShow] = useState(false);

    useEffect(() =>{
        const scrollListener = () => {
            if(window.scrollY > 100){
                handleShow(true);
            } else {
                handleShow(false);
            }
        };
    
        window.addEventListener("scroll", scrollListener);
    
        return () => {
            window.removeEventListener("scroll", scrollListener);
        };
    }, []);
    
  return (
    <div className={`nav ${show && "nav__black"}`}>
        <img 
        className='nav__logo'
        src='https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Logonetflix.png/1920px-Logonetflix.png'
        alt='Netflix logo'
        />
        <img 
        className='nav__avatar'
        src='https://mir-s3-cdn-cf.behance.net/project_modules/disp/84c20033850498.56ba69ac290ea.png'
        alt='Netflix logo'
        />
    </div>
  )
}

export default Nav