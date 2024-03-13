import React, { useRef } from 'react'
import './cursor.css'

const Customcursor = () => {
    const cursorRef = useRef(null);

    React.useEffect(() => {
        document.addEventListener('mousemove', (event) => {
            const { clientX, clientY } = event;
            if (cursorRef.current) {
                const mouseX = clientX - cursorRef.current.clientWidth / 2;
                const mouseY = clientY - cursorRef.current.clientHeight / 2;
                cursorRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
            }
        });
    }, []);


    return <div className='app-cursor' ref={cursorRef}/>;
    
}

export default Customcursor
