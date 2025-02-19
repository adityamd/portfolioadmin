import axios from 'axios';
import { toast } from 'react-toastify';

export const sendImage = async(e, name) => {
    try{
        const file = e.target.files[0];
        const data = await axios.get(`/s3/url/${name}`)
        const url = data.data
        const data2 = await axios.put(url, file, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        toast.success("File uploaded successfully")
    } catch(error){
        toast.error("File could not be uploaded")
    }
  }