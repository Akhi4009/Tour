
import { useRef, useState } from "react"
import classes from "./image-picker.module.css"


export default function ImagePicker({label,name}){
    const [pickedImage,setPickeImage] = useState()
    const imageInput= useRef()

    function handlePickClick(){
         imageInput.current.click()
    }

    function handleImageChange(e){
        const file=e.target.files[0];
        if(!file){
            setPickeImage(null)
            return
        }

        const fileReader = new FileReader()
        fileReader.onload =()=>{
            setPickeImage(fileReader.result)
        }

        fileReader.readAsDataURL(file);
     }
 
    return (<div className={classes.picker}>
    <label htmlFor={name}>{label}</label>
    <div className={classes.controls}>
    <div className={classes.preview}>
    {!pickedImage && <p> No Image picked yet.</p>}
    {pickedImage &&<img src={pickedImage} alt="The image" /> }
    </div>
    <input 
    className={classes.input}
    type="file"
     id={name}
     accept="image/png, image/jpeg" 
     name={name}
     ref={imageInput}
     onChange={handleImageChange}
     multiple
     required
     />
     <button className={classes.button} 
     onClick={handlePickClick}
    
     type="button">
     Pick an image
     </button>
    </div>
    </div>
    )
}