import React, { useState } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Button } from "reactstrap"
import "../estilos/Login.css"
import ClienteService from '../servicios/ClienteService';
import { useNavigate } from 'react-router';
import { Link } from "react-router-dom";


const Login = ({ setRespLogin, setUsuarios }) => {

    const [verLogin, setVerLogin] = useState(true);
    const [usuario, setUsuario] = useState("");
    const [pass, setPass] = useState("");
    const [ingresa, setIngresa] = useState(null);

    //const u = localStorage.getItem('usuario');
    //const p = localStorage.getItem('clave');
    //console.log("obtener: ",u,p);
    const navigate = useNavigate();
    //let location = useLocation();
    //console.log(location.pathname) 

    /* if((u !== "" && u !== null) && (p !== "" && p !== null) && pass ==="" && usuario ===""){
        setPass(p);
        setUsuario(u);
        let  body ={
            "email": u,
            "passUsuario": p
           }
        
        ClienteService.obtenerUsuario(body).then(response => {
            setRespLogin(response.data.length)
            if (response.data.length  > 0) {
               
                setIngresa(response.data.length);
                setUsuarios(response.data[0]);
                setVerLogin(false);
                localStorage.removeItem('usuario');
                localStorage.removeItem('clave');
                console.log("obtener: ",u,p);
                navigate("/detallePedido");
               
               
            }else{
                
                
                setIngresa(response.data.length);
                console.log(ingresa);
            }


        }).catch(error => {
            console.log(error);

        })
      
    } */




    const ingresar = () => {
        //alert("ingresar:"+ usuario +" "+ pass)
        //localStorage.setItem('clave', pass);
        //localStorage.setItem('usuario', usuario);      
        //console.log("guardar: ", localStorage);  
        //localStorage.removeItem('usuario');

        let body = {
            "email": usuario,
            "passUsuario": pass
        }
        if (usuario !== "" && pass !== "") {
            ClienteService.obtenerUsuario(body).then(response => {
                setRespLogin(response.data.length);
                if (response.data.length > 0) {
                    setIngresa(response.data.length);
                    setUsuarios(response.data[0]);
                    setVerLogin(false);
                    navigate("/home");

                } else {
                    setIngresa(response.data.length);
                    console.log(ingresa);
                }
            }).catch(error => {
                setIngresa(0);
                console.log(error);

            })
        }

    }

    const funUsuario = (u) => { setUsuario(u.target.value); }
    const funPass = (p) => { setPass(p.target.value); }

    return (
        <div className='divLogin'>

            <Modal isOpen={verLogin === true}>
                <ModalHeader>
                    <h4>Iniciar Sesión Usuario</h4>
                </ModalHeader>

                <ModalBody>
                    <FormGroup>
                        <Label for='usuario'>Usuario</Label>
                        <Input onChange={(user) => { funUsuario(user) }} placeholder='example@gmail.com' type="email" id="usuario" />

                        <Label for='password'>Contraseña</Label>
                        <Input onChange={(pass) => { funPass(pass) }} type="password" id="password" />

                        <Label className='mensajeError'> {ingresa === 0 ? "Contraseña o usuario incorrecto." : ""}</Label>
                        <div className='divIngresar'>
                            <Button id="ingresar" className='btnIngresar' onClick={() => ingresar()}>Ingresar</Button>
                        </div>

                    </FormGroup>

                </ModalBody>

                <ModalFooter className='footerModalLogin'>
                    <div className='divBtnRegistrar'>
                        <Link to="/registrarUsuario" className='' >Registrar Usuario</Link>
                        <Link to="/loginComercio" className=''>Login Cafetería</Link>
                        <Link to="/login" className=''>Login Usuario</Link>
                    </div>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default Login
