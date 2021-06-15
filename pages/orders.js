import Head from "next/head"
import Link from "next/link"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchOrders } from "../store/actions/ordersAction"

const Orders = () => {

    const dispatch = useDispatch()

    const { orders } = useSelector(state => state.orders)

    useEffect(() => {
        dispatch(fetchOrders())
    }, [])

    return (
        <>
            <Head>
                <title>Album | Orders</title>
            </Head>
            <section className="orders py-5 bg-light inner-page">
            <div className="container py-5">
                <div className="row">
                    <h1 className="mb-4">Your Orders History</h1>
                    {orders && orders.length > 0 && orders.map(order => <div className="col-12 mb-3" key={order.id}>
                        <div className="card">
                            <div className="card-header">
                                #{order.id}
                            </div>
                            <div className="card-body">
                                <ul className="nav">
                                    {order.items.map(item => <li key={item.productID}>
                                        <p>
                                            <strong>Item:</strong> {item.productID} | {item.title}
                                        </p>
                                        <p>
                                            <strong>Price:</strong> {item.price}
                                        </p>
                                        <p>
                                            <strong>Quantity:</strong> {item.count}
                                        </p>
                                    </li>)}
                                </ul>
                                <p><strong>Username:</strong> {order.firstName} {order.lastName}</p>
                                <p><strong>Address:</strong> {order.address}</p>
                                <p><strong>Email:</strong> {order.email}</p>
                                <p><strong>Phone Number:</strong> {order.phone}</p>
                            </div>
                        </div>
                    </div>)}
                    {orders && orders.length === 0 && <div className="col-12 mb-3">
                        <h1>You don't have orders yet!, <Link href="/"><a>let's shop</a></Link></h1>
                    </div>}
                </div>
            </div>
        </section>
        </>
    );
}
 
export default Orders;