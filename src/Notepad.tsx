import { useState } from 'react'


function Notepad() {
    const [content, setContent] = useState("");

    const handleChange = (e: any) => {
        setContent(e.target.value);
    }
  
    return (
    <div className='notepad-container'>
        <textarea
        className='notepad-area'
         placeholder='Start writing your notes here...'
         value={content}
         onChange={handleChange}
        />
    </div>
  )
}

export default Notepad
