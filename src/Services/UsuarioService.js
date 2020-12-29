import axios from 'axios'

const login="https://backend-contafast.herokuapp.com/login";
const registration="https://backend-contafast.herokuapp.com/registration";

class UserService {
    
    register(ruc,username,email,password){
        return axios.post(registration + "/crearusuario", {ruc,username,email,password});
    }
    login(email, password) {
        return axios.post(login + "/verificarusuario", {email,password}).then(response => {
            localStorage.setItem("usuario", JSON.stringify(response.data));
          });
    }
    logout() {
        localStorage.removeItem("usuario");
    }
    getCurrentUser() {
        return JSON.parse(localStorage.getItem("usuario"));;
    }
    verificacion(token,email,password) {
        return axios.put(login + "/actualizarestado", {token,email,password}).then(response => {
            localStorage.setItem("usuario", JSON.stringify(response.data));
          });
    }
}   
export default new UserService();