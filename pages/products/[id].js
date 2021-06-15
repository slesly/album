import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCartItem, changeCartItem, deleteCartItem } from '../../store/actions/cartAction';
import { fetchProducts } from '../../store/actions/productsAction';

const Product = () => {

    const router = useRouter()
    const dispatch = useDispatch()
    const { products } = useSelector(state => state.products)
    const { items } = useSelector(state => state.cart)

    const [ product, setProduct ] = useState(null)
    const [ isItemAdded, useIsItemAdded ] = useState(null)

    useEffect(() => {
        dispatch(fetchProducts())
    }, [])

    useEffect(() => {
        if(products) {
            setProduct(products.find(item => item.id === router.query.id))
        }
    }, [products])


    useEffect(() => {
        if (product) {
            const itemAdd = items.find(item => item.productID === product.id)
            useIsItemAdded(itemAdd)
        }
    }, [items, product])


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

    const addItemToCart = item => {
        dispatch(addCartItem(item))
    }

    return (
        <>
            <Head>
                {product && <title>Album | {product.title}</title>}
            </Head>
            <section className="py-5 inner-page">
            <div className="product container">
                <div className="row">
                    {product &&
                        <>
                            <div className="col-lg-5 position-relative">
                                <Image src={product.image} alt={product.title} layout="fill" objectFit="contain" />
                            </div>
                            <div className="col-lg-7">
                                <h4>{product.title}</h4>
                                <p className="text-secondary">Price: {product.price} $</p>
                                <p className="card-text">{product.description}</p>
                                <hr />
                                <div className="d-flex justify-content-between align-items-center">
                                    {!isItemAdded &&
                                        <div className="btn-group">
                                            <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => { addItemToCart(product) }}>Add To Cart</button>
                                        </div>
                                    }
                                    {isItemAdded &&
                                        <>
                                            <div className="btn-group">
                                                <Link href="/checkout"><a type="button" className="btn btn-sm btn-outline-secondary">Continue to checkout</a></Link>
                                            </div>
                                            <div className="input-group w-auto">
                                                <button className="btn btn-sm btn-outline-secondary" type="button" onClick={() => { increaseCartItem(isItemAdded.productID, isItemAdded.count) }}><i className="bi bi-plus-lg"></i></button>
                                                <input type="number" min="0" value={isItemAdded.count} readOnly />
                                                <button className="btn btn-sm btn-outline-secondary" type="button" onClick={() => { decreaseCartItem(isItemAdded.productID, isItemAdded.count) }}><i className="bi bi-dash-lg"></i></button>
                                            </div>
                                        </>
                                    }
                                </div>
                            </div>
                        </>
                    }
                </div>
            </div>
        </section>
        </>
    );
}

Product.getInitialProps = ({query}) => {
    return {query}
}

export default Product;