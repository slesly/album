import Head from 'next/head'
import Link from 'next/link'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCartItem, fetchCartItems } from '../store/actions/cartAction'

const Cart = () => {
    const dispatch = useDispatch()
    const { items } = useSelector(state => state.cart)

    useEffect(() => {
        dispatch(fetchCartItems())
    }, [])

    const deleteItem = id => {
        dispatch(deleteCartItem(id))
    }


    return (
        <>
            <Head>
                <title>Album | Cart</title>
            </Head>
            <section className="inner-page py-5">
            <div className="container py-5">
                <div className="row pt-5 pb-3">
                    <div className="col-12">
                        <h1>Cart Details</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <table className="table table-hover table-bordered">
                            <thead>
                                <tr className="table-dark">
                                    <td>Item ID</td>
                                    <td>Item Details</td>
                                    <td>Item Count</td>
                                    <td>Item Price</td>
                                    <td>Total Price</td>
                                    <td>Actions</td>
                                </tr>
                            </thead>
                            <tbody>
                                {!items || items.length === 0 && <tr><td colSpan="6" className="text-center">There is no items, let's <Link href="/"><a>continue shopping</a></Link></td></tr>}
                                {items && items.length > 0 && items.map(item => 
                                    <tr key={item.productID}>
                                        <td>{ item.productID }</td>
                                        <td><Link href={`/products/${item.productID}`}>{ item.title }</Link></td>
                                        <td>{ item.count }</td>
                                        <td>{ item.price }</td>
                                        <td>{ item.count * Number(item.price) } $</td>
                                        <td><i role="button" className="bi bi-trash" onClick={() => {deleteItem(item.productID)}}></i></td>
                                    </tr>    
                                )}
                            </tbody>
                            <tfoot>
                                <tr className="table-light">
                                    <td scope="row">Order Total:</td>
                                    <td colSpan="5" className="text-end"><strong>{items && items.reduce((a, b) => a + (b.price || 0), 0) } $</strong></td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 text-end">
                        {items && items.length > 0 && <Link href="/checkout"><a className="btn btn-lg btn-dark">Checkout Now</a></Link>}
                    </div>
                </div>
            </div>
        </section>
        </>
    );
}

 
export default Cart;