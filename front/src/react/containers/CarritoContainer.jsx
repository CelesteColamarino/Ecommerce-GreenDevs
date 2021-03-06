import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import {
  fetchCarritos,
  carritoDelete
} from "../../redux/action-creators/carrito";
import "../css/estilosPerfil.css";
import { createVariasCompras } from "../../redux/action-creators/compras";

import CarritoList from "../components/CarritoList";
import Footer from "../components/Footer";
import Loading from "../components/Loading";

const CarritoContaienr = ({
  deleteCart,
  fetchCarritos,
  listaCarrito,
  createVariasCompras,
  listaCarritos,
  history,
  user
}) => {
  const [boolean, setBoolean] = useState(false);
  const [esVisible, setEsVisible] = useState(false);

  useEffect(() => {
    fetchCarritos();
  }, []);

  const handlerButtonDelete = id => {
    deleteCart(id);
  };

  const handleButtonComprar = e => {
    e.preventDefault();
    if (user) {
      createVariasCompras().then(() => history.push("/miPerfil/compras"));
    } else {
      history.push("/login");
    }
  };

  const mostrarDetalle = e => {
    e.preventDefault();
    setEsVisible(!esVisible);
  };
  const cambio = () => {
    setBoolean(true);
  };

  return (
    <div>
      <div className="container-fluid mt-3 mb-3">
        <div className="card profile-card-2">
          <div className="card-img-block">
            <img
              className="img-fluid"
              src="/imagenes/Fondos/fondofranja.png"
              alt="Card image cap"
            />
          </div>
          <div className="card-body2">
            <img
              src="https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-shapes/128/shopping-circle-blue-512.png"
              alt="shop-image"
              className="profile"
            />
            {listaCarritos ? (
              <CarritoList
                cambio={cambio}
                mostrarDetalle={mostrarDetalle}
                handlerButtonDelete={handlerButtonDelete}
                listaCarrito={listaCarritos}
                handleButtonComprar={handleButtonComprar}
                esVisible={esVisible}
              />
            ) : (
              <Loading />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.login.userLogueado.id,
    listaCarritos: state.carrito.listaCarrito
  };
};

const mapDispathToProps = (dispatch, ownProps) => {
  return {
    fetchCarritos: () => dispatch(fetchCarritos()),
    deleteCart: id => dispatch(carritoDelete(id)),
    createVariasCompras: () => dispatch(createVariasCompras())
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispathToProps)(CarritoContaienr)
);
