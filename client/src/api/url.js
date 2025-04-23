import axios from 'axios';
const axins=axios.create({
    baseURL: 'http://localhost:5045/api'// Replace with your API base URL
   // This ensures cookies are sent with requests
});
export default axins;