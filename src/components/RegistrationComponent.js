import React from 'react';
import UsuarioService from '../Services/UsuarioService';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail, isEmpty, isNumeric } from 'validator';

  const required = value => {
    if (isEmpty(value)) {
      return (
        <div className="alert alert-danger" role="alert">
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
  const vruc = value => {
    if (value.length !== 11) {
      return (
        <div className="alert alert-danger" role="alert">
          El ruc debe tener 11 digitos.
        </div>
      );
    }
  };
  const vruc2 = value => {
    if (!isNumeric(value)) {
      return (
        <div className="alert alert-danger" role="alert">
          El ruc debe ser un numero.
        </div>
      );
    }
  };
  const password = value => {
    if (value.length < 6 ) {
      return (
        <div className="alert alert-danger" role="alert">
          La contraseña debe tener mas de 6 caracteres.
        </div>
      );
    }
  };

class RegistrarionComponent extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            ruc: '',
            username: '',
            email: '',
            password: '',
            loading: false,
            message: ""
        }
        this.ChangeRucHandler = this.ChangeRucHandler.bind(this);
        this.ChangeUserNameHandler = this.ChangeUserNameHandler.bind(this);
        this.ChangeEmailHandler = this.ChangeEmailHandler.bind(this);
        this.ChangePasswordHandler = this.ChangePasswordHandler.bind(this);
        this.saveUsuario = this.saveUsuario.bind(this);
    }

    saveUsuario(e){
        e.preventDefault();
        this.setState({
            message: "",
            loading: true
          });
          this.form.validateAll();
          if (this.checkBtn.context._errors.length === 0){
            UsuarioService.register(this.state.ruc, this.state.username, this.state.email, this.state.password)
            .then(() => {
              this.props.history.push("/");
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
    ChangeRucHandler= (event) => {
        this.setState({ruc: event.target.value})
    }
    ChangeUserNameHandler= (event) => {
        this.setState({username: event.target.value})
    }
    ChangeEmailHandler= (event) => {
        this.setState({email: event.target.value})
    }
    ChangePasswordHandler= (event) => {
        this.setState({password: event.target.value})
    }
    cancel(){
        this.props.history.push('/')
    }

    render (){
        return (
            <div>
                <div className = "container">
                    <div className = "row">
                        <div className = "card col-md-6 offset-md-3 offset-md-3" style={{borderRadius:"2rem", margin:"auto"}}>
                            <h3 className = "text-center">Register</h3>
                            <div className = "card-body">
                                <Form onSubmit={this.saveUsuario} ref={c => {this.form = c;}}>
                                    <div className="form-group">
                                        <label htmlFor="Ruc" style={{marginBottom: ".1rem"}}>RUC:</label>
                                        <Input type="ruc" className="form-control" id="Ruc" value={this.state.ruc} 
                                        onChange={this.ChangeRucHandler} aria-describedby="rucHelp" validations={[required,vruc,vruc2]}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="Username" style={{marginBottom: ".1rem"}}>Username:</label>
                                        <Input type="username" className="form-control" id="Username" value={this.state.username} 
                                        onChange={this.ChangeUserNameHandler} aria-describedby="usernameHelp" validations={[required]}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="Email" style={{marginBottom: ".1rem"}}>Correo:</label>
                                        <Input type="email" className="form-control" id="Email" value={this.state.email} 
                                        onChange={this.ChangeEmailHandler} aria-describedby="emailHelp" validations={[required,email]}/>
                                    </div>
                                    <div className="form-group" style={{marginBottom: "2rem"}}>
                                        <label htmlFor="Password" style={{marginBottom: ".1rem"}}>Contraseña:</label>
                                        <Input type="password" className="form-control" value={this.state.password} 
                                        onChange={this.ChangePasswordHandler} id="Password" validations={[required,password]}/>
                                    </div>
                                    
                                    <button className="btn" style={{backgroundColor:"#42b72a",borderColor:"#42b72a", 
                                    color:"white", width: "100%"}} onClick={this.saveUsuario} 
                                    ref={c => {this.checkBtn = c;}} disabled={this.state.loading}> {this.state.loading && (
                                        <span className="spinner-border spinner-border-sm"></span>
                                      )}<b>Registrar</b></button>
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default RegistrarionComponent