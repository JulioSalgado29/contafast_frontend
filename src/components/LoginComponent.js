import React from 'react';
import UsuarioService from '../Services/UsuarioService';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail, isEmpty } from 'validator';

  const required = value => {
    if (isEmpty(value)) {
      return (
        <div class="alert alert-danger" role="alert">
          Este campo es requerido
        </div>
      );
    }
  }; 
  const email = value => {
    if (!isEmail(value)) {
      return (
        <div className="alert alert-danger" role="alert">
          El email no es valido
        </div>
      );
    }
  };

class LoginComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          currentUser: UsuarioService.getCurrentUser(),
          email: '',
          password: '',
          loading: false,
          message: "",
          estado: '',
          token: ""
        }
        this.ChangeEmailHandler = this.ChangeEmailHandler.bind(this);
        this.ChangePasswordHandler = this.ChangePasswordHandler.bind(this);
        this.loginUsuario = this.loginUsuario.bind(this);
        this.register = this.register.bind(this);
        this.verificarUsuario = this.verificarUsuario.bind(this);
        this.logOut = this.logOut.bind(this);
    }

    loginUsuario(e){
        e.preventDefault();
        this.setState({
            message: "",
            loading: true
          });
          this.form.validateAll();
          if (this.checkBtn.context._errors.length === 0){
            UsuarioService.login(this.state.email, this.state.password).then(() => {
              window.location.reload(false);
              this.props.history.push("/perfil-usuario");
              //window.location.reload();
            },
            error => {
              const resMessage =
              (error.response && error.response.data) || error.message 
              || error.toString();
              this.setState({
                loading: false,
                message: resMessage
              });
            });
          }else {
            this.setState({
              loading: false
            });
        }
    }
    verificarUsuario(e){
      e.preventDefault();
      this.setState({
          message: "",
          loading: true
        });
      const { currentUser } = this.state;
      UsuarioService.verificacion(this.state.token,currentUser.email,currentUser.password).then(() => {
          window.location.reload(false);
        },
        error => {
          const resMessage =
          (error.response && error.response.data) || error.message 
          || error.toString();
          this.setState({
            loading: false,
            message: resMessage
          });
          console.log(resMessage)
        });
    }
    ChangeTokenHandler= (event) => {
      this.setState({token: event.target.value})
    }
    ChangeEmailHandler= (event) => {
        this.setState({email: event.target.value})
    }
    ChangePasswordHandler= (event) => {
        this.setState({password: event.target.value})
    }
    register(){
        this.props.history.push('/registrar-usuario')
    }
    logOut() {
      UsuarioService.logout();
      window.location.reload(false);
    }

    render (){
      const { currentUser } = this.state;
      if(currentUser===null)
        return (
          <div>
            {(currentUser==null &&
            <h2>hola</h2>)
            || currentUser==="1" ||
            <h2>hola1</h2>
            || 
            <h2>holaelse</h2>}
              <div className = "container">
                  <div className = "row">
                      <div className = "card col-md-6 offset-md-3 offset-md-3" style={{borderRadius:"2rem", margin:"auto"}}>
                          <h3 className = "text-center">Login</h3>
                          <div className = "card-body">
                              <Form onSubmit={this.loginUsuario} ref={c => {this.form = c;}}>
                                  <div className="form-group">
                                      <label htmlFor="Email" style={{marginBottom: ".1rem"}}>Correo:</label>
                                      <Input type="email" className="form-control" id="Email" value={this.state.email} 
                                      onChange={this.ChangeEmailHandler} aria-describedby="emailHelp" validations={[required,email]}/>
                                  </div>
                                  <div className="form-group" style={{marginBottom: "2rem"}}>
                                      <label htmlFor="Password" style={{marginBottom: ".1rem"}}>Contraseña:</label>
                                      <Input type="password" className="form-control" value={this.state.password} 
                                      onChange={this.ChangePasswordHandler} id="Password" validations={[required]}/>
                                  </div>
                                  <button className="btn" style={{backgroundColor:"#1877f2",borderColor:"#1877f2", 
                                  color:"white", width: "100%", marginBottom: ".3rem"}} onClick={this.loginUsuario} 
                                  ref={c => {this.checkBtn = c;}} disabled={this.state.loading}> {this.state.loading && (
                                      <span className="spinner-border spinner-border-sm"></span>
                                    )}<b>Ingresar</b></button>
                                  
                                  {this.state.message && (
                                  <div className="form-group">
                                      <div className="alert alert-danger" role="alert">
                                          {this.state.message}
                                      </div>
                                  </div>
                                  )}
                                  <CheckButton
                                  style={{ display: "none" }}
                                  ref={c => {
                                      this.checkBtn = c;
                                  }}
                                  />
                              </Form>
                              <button className="btn" style={{backgroundColor:"#42b72a",borderColor:"#42b72a", 
                                  color:"white", width: "100%"}} onClick={this.register}><b>Crear cuenta nueva</b></button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>)
      if("1"===currentUser.estado)
        return (
          <div className="form-label-group">
            {(currentUser==null &&
            <h2>hola</h2>)
            || currentUser==="1" ||
            <h2>hola1</h2>
            ||
            <h2>holaelse</h2>}
            <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus/>
            <label htmlFor="inputEmail">Email address</label>
          </div>
          )
      else
        return (
          <div className="container">
            <h3>
            Bienvenido <strong>{currentUser.username}{currentUser.token}</strong> CPP del tio pio 
            <p>verifica el correo que usaste para registraste, te hemos enviado un token</p>
            </h3>
            <input type="token" className="form-control" id="Token" value={this.state.token}
            onChange={this.ChangeTokenHandler} aria-describedby="tokenHelp" />
            <button className="btn" onClick={this.verificarUsuario}><b>Verificar</b></button>
          </div>
            )
    }
}

export default LoginComponent