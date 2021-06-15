import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeCartItem, deleteCartItem, fetchCartItems } from '../store/actions/cartAction'

const CartMenu = ({ cartOpenProp, cartCloseProp }) => {

    const dispatch = useDispatch()
    const { items } = useSelector(state => state.cart)

    useEffect(() => {
        dispatch(fetchCartItems())
    }, [])

    
    useEffect(() => {
        const body = document.querySelector("body");
        const cartMenu = document.querySelector(".cart-menu");

        if (cartOpenProp) {
            const bodyWidth = body.offsetWidth;
            body.style.overflow = "hidden";
            body.style.paddingRight = body.offsetWidth - bodyWidth + "px";

            cartMenu.classList.add("cart-menu--open");
        } else {
            body.style.overflow = "auto";
            body.style.paddingRight = "";

            cartMenu.classList.remove("cart-menu--open");
        }
    }, [cartOpenProp]);

    const closeMenu = () => {
        cartCloseProp(false);
    }

    const increaseCartItem = (id, count) => {
        let newCount = count + 1
        dispatch(changeCartItem(id, newCount))
    }

    const decreaseCartItem = (id, count) => {
        if (count > 1) {
            let newCount = count - 1
            dispatch(changeCartItem(id, newCount))
        }
    }

    const deleteItem = id => {
        dispatch(deleteCartItem(id))
    }

    return (
        <div className="cart-menu">
            <div className="cart-menu__backdrop"></div>
            <div className="cart-menu__body">
                <button
                    className="cart-menu__close"
                    type="button"
                    onClick={closeMenu}
                >
                    <i className="bi bi-x-lg"></i>
                </button>
                <div className="cart-menu__panel">
                    <div className="cart-menu__panel-header p-4">
                        <div className="cart-menu__panel-title">ITEMS</div>
                    </div>
                    <div className="cart-menu__panel-body p-4">
                        <div className="cart-menu__divider"></div>
                            {!items || items.length === 0 && <p className="text-black-50 text-capitalize text-center">There is no items, let's add someone :)</p>}
                            {items && items.length > 0 &&
                                <>
                                    <ul className="cart-menu__items nav">
                                        {items.map(item => <li data-cart-menu-item key={item.productID}>
                                            <div className="row mb-4">
                                                <div className="col-6">{ item.title }</div>
                                                <div className="col-3">{ item.price } $</div>
                                                <div className="col-3 d-flex justify-content-between align-items-center">
                                                    <span role="button" className="btn btn-light btn-sm" onClick={() => { increaseCartItem(item.productID, item.count) }}><i className="bi bi-plus-lg"></i></span>
                                                    <span>{ item.count }</span>
                                                    <span role="button" className="btn btn-light btn-sm" onClick={() => { decreaseCartItem(item.productID, item.count) }}><i className="bi bi-dash-lg"></i></span>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col text-end">
                                                    <span role="button" className="btn btn-sm btn-danger" onClick={() => { deleteItem(item.productID) }}><i className="bi bi-trash"></i> Remove</span>
                                                </div>
                                            </div>
                                        </li>)}
                                    </ul>
                                    <div className="btn-holder">
                                        <Link href="/cart"><a role="btn" className="btn btn-dark">View Cart</a></Link>
                                    </div>
                                </>

                            }
                    </div>
                </div>
            </div>
        </div>
    );
};


export default CartMenu