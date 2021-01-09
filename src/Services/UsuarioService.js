import axios from 'axios'
const login = "http://dentino.sytes.net:8000/login";
const registration = "http://dentino.sytes.net:8000/registration";

class UserService {

    register(ruc, username, email, password) {
        const usuario = {
            "usuario": {"username": username,"password": password,"fechaCre": "2020-07-10"},
            "persona": { "nombre": "Gregory", "apellido": "Recalde", "email": email, "fechaNac": "1999-02-07", "direccion": "Heredia586", "telefono": "920691763", "genero": "M" },
            "token": { "expiration": "2020-07-10" }
        };

        return axios.post(registration + "/registrar-administrador", usuario, { auth: {
            username: 'admin',
            password: '1234abcd'
          }});
        //return axios.post(registration + "/crearusuario", { ruc, username, email, password });
    }
    login(email, password) {
        return axios.post(login + "/verificarusuario", { email, password }).then(response => {
            localStorage.setItem("usuario", JSON.stringify(response.data));
        });
    }
    logout() {
        localStorage.removeItem("usuario");
    }
    getCurrentUser() {
        return JSON.parse(localStorage.getItem("usuario"));;
    }
    verificacion(token, email, password) {
        return axios.put(login + "/actualizarestado", { token, email, password }).then(response => {
            localStorage.setItem("usuario", JSON.stringify(response.data));
        });
    }
}
export default new UserService();