import axios from "axios"

const api =  axios.create({ 
    baseURL: 'https://refreshing-motivation-production.up.railway.app/'
}) 

export default api