import React from 'react';
import UsuarioService from '../Services/UsuarioService';

class HeaderComponent extends React.Component{

    constructor(props){
        super(props);
        this.logOut = this.logOut.bind(this);
        this.state = {
            currentUser: UsuarioService.getCurrentUser(),
        }
    }

    logOut() {
        UsuarioService.logout();
        window.location.reload(false);
    }

    render (){
        const { currentUser } = this.state;
            return(
            <div>
                <header>
                    <nav className="navbar navbar navbar-light " style={{backgroundColor:"black", marginBottom:"4rem", justifyContent:'space-evenly'}}>
                        <a href="/" className="btn btn-primary active" role="button" aria-pressed="true" 
                        style={{background: "none", padding: "inherit", fontSize:"2rem",
                        lineHeight:"1.5",borderRadius:".3rem"}}><b>Contafast</b></a>
                        {currentUser!=null &&
                            <button type="button" className="btn btn-danger" onClick={this.logOut}>Cerrar Sesion</button>
                        }
                    </nav>
                </header>
            </div>)
    }
}

export default HeaderComponent