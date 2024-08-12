import { useContext } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";

type ModalPerfilProps = {
    setModalPerfilOpen: (modalPerfilOpen: boolean) => void
}

export function ModalPerfil(props: ModalPerfilProps){
    const navigate = useNavigate();

    async function LogOut(){
        await localStorage.removeItem('token');
        await localStorage.removeItem("Profile");
        navigate("/login");
    }

    return(
        <div className="background-modal" onClick={() => props.setModalPerfilOpen(false)}>
            <div className="container-modal-perfil">
                <div className="btn-menu" onClick={() => navigate("/edit-data")}>
                    Configurações
                </div>
                <div className="btn-menu" onClick={() => navigate("/edit-data")}>
                    Conta
                </div>
                <div className="btn-menu" onClick={() => navigate("/change-profile")}>
                    Trocar Perfil
                </div>
                <div className="btn-menu" onClick={() => navigate("/edit-profile")}>
                    Editar Perfis
                </div>
                <div className="btn-menu" onClick={() => LogOut()}>
                    Sair
                </div>
            </div>
        </div>
    );  
}