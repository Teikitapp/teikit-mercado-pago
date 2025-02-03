import React, { useState } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Button } from "reactstrap"
import "../estilos/Login.css"
import ClienteService from '../servicios/ClienteService';
import { useNavigate } from 'react-router';
import { Link } from "react-router-dom";

const LoginCliente = ({ setRespLoginComercio }) => {

    const [verLogin, setVerLogin] = useState(true);
    const [usuario, setUsuario] = useState("");
    const [pass, setPass] = useState("");
    const [ingresa, setIngresa] = useState(null);
    const navigate = useNavigate();


    const ingresar = () => {

        let bodyComercio = {
            "email": usuario,
            "passCliente": pass
        }

        if (usuario !== "" && pass !== "") {
            ClienteService.obtenerComercio(bodyComercio).then(response => {
                setRespLoginComercio(response.data.length);
                if (response.data.length > 0) {
                    setIngresa(response.data.length);
                    ///setUsuarios(response.data[0]);
                    console.log("INGRESA COMERCIO");
                    setVerLogin(false);//esconde el login para navegar
                    navigate("/homeComercio");

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
                    <h4>Iniciar Sesión Comercio</h4>
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

export default LoginCliente;
