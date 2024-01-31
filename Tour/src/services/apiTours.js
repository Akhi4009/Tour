import axios from 'axios';
export async function getTours(){

    try {
        const res= await axios.get(`http://localhost:4500/api/tours`)
        return res.data.data;
    } catch (error) {
        console.log(error)
        throw new Error(error.message);
    }
}


export async function getTour(id){
  try {
    const res= await axios.get(`http://localhost:4500/api/tours/${id}`)
    return res.data.data;
  } catch (error) {
    console.log(error)
    throw new Error(error.message)
  }
}