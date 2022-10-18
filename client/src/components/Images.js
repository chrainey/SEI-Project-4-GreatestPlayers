import React, { useState } from 'react'
import { Image } from 'cloudinary-react'
import axios from 'axios'



const Images = () => {

  const [imageSelected, setImageSelected] = useState('')

  const uploadImage = () => {
    const formData = new FormData()
    formData.append('file', imageSelected)
    formData.append('upload_preset', 's7vr8dqz')

    axios.post(
      'https://api.cloudinary.com/v1_1/chrainey22/image/upload',
      formData
    ).then((response) => {
      console.log(response)
    })
    
  }
  
  return (
    <div>
      <input
        type="file"
        onChange={(event)=> {
          setImageSelected(event.target.files[0])
        } }
      />
      <button onClick={uploadImage}>Upload Image</button>

      <Image
        style={{ width: 200 }} 
        cloudName='chrainey22'
        publicId='https://res.cloudinary.com/chrainey22/image/upload/v1663080565/bmwurcl036h9g7kgcys1.jpg' />
    </div>
  )
}


export default Images