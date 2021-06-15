import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCartItem } from '../store/actions/cartAction';

const Album = ({ products }) => {
    const [ isGrid, useISGrid ] = useState(true)

    const dispatch = useDispatch()

    const addItemToCart = item => {
        dispatch(addCartItem(item))
    }

    return (
        <div className="album py-5 bg-light">
            <div className="container">
                <div className="row mb-4">
                    <div className="col-12">
                        <strong className="me-3">View in:</strong>
                        <button className={`me-2 btn btn-${isGrid ? 'warning' : 'secondary'}`} role="button" onClick={() => {useISGrid(true)}}>
                            Grid <i className="bi bi-grid"></i>
                        </button>
                        <button className={`btn btn-${!isGrid ? 'warning' : 'secondary'}`} role="button" onClick={() => {useISGrid(false)}}>
                            List <i className="bi bi-view-stacked"></i>
                        </button>
                    </div>
                </div>
                <div className={`row row-cols-1 g-3${isGrid ? ' row-cols-sm-2 row-cols-md-3' : ' list-view'}`}>
                    {!products && <p>Loading Products...</p>}
                    {products && products.map(product =>
                        <div className="col" key={product.id}>
                            <div className="card shadow-sm">
                                <Image src={product.image} alt={product.title} className="product-img" width="100%" height={225} />
                                <div className="card-body">
                                    <Link href={`/products/${product.id}`}>
                                        <a className="text-decoration-none text-dark">
                                            <h4 className="text-truncate">{product.title}</h4>
                                        </a>
                                    </Link>
                                    <p className="card-text text-truncate text-secondary">{product.description}</p>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="btn-group">
                                        <Link href={`/products/${product.id}`}><a type="button" className="btn btn-sm btn-dark"><i className="bi bi-eye"></i> View</a></Link>
                                        <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => { addItemToCart(product) }}><i className="bi bi-cart"></i> Add To Cart</button>
                                        </div>
                                        <small className="badge bg-warning text-dark">Price: {product.price} $</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Album;