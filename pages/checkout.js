import { Formik, Form, Field } from 'formik';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { addOrder } from '../store/actions/ordersAction'
import { emprtyCart, fetchCartItems } from '../store/actions/cartAction'
import { useRouter } from 'next/dist/client/router';
import { useEffect } from 'react';
import Link from 'next/link';

const Checkout = () => {

    const router = useRouter()
    const dispatch = useDispatch()

    const { items } = useSelector(state => state.cart)

    useEffect(() => {
        dispatch(fetchCartItems())
    }, [])

    const handleSubmit = (values, {resetForm}) => {
        dispatch(addOrder(values))
        .then(dispatch(emprtyCart()))
        .then(resetForm())
        .then(router.push('/'))
    }

    const phoneRegExp = /^01[0125][0-9]{8}$/gm
     const SignupSchema = Yup.object().shape({
        firstName: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('First Name is Required'),
        lastName: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Last Name is Required'),
        address: Yup.string()
            .required('Address is Required'),
        phone: Yup.string()
            .matches(phoneRegExp, 'Invalid Phone Number')
            .required('Phone Number is Required'),
        email: Yup.string().email('Invalid Email')
            .required('Email is Required')

    });

    return (
        <>
            <Head>
                <title>Album | Checkout</title>
            </Head>
            <section className="py-5 bg-light inner-page">
                <div className="container">
                    {items && items.length > 0 && <div className="row">
                        <div className="col-12">
                            <Formik
                                initialValues={{
                                    firstName: '',
                                    lastName: '',
                                    address: '',
                                    phone: '',
                                    email: '',
                                }}
                                validationSchema={SignupSchema}
                                onSubmit={(values, states) => {handleSubmit(values, states)}}
                                >
                                {({ errors, touched }) => (
                                <Form className="bg-white p-4 border rounded">
                                    <div className="row">
                                        <div className="col-12">
                                            <h1 className="text-center">Order Details</h1>
                                        </div>
                                    </div>
                                    <hr className="bg-secondary" />
                                    <div className="row mb-3">
                                        <div className="col-lg-6">
                                            <label htmlFor="firstName">First Name</label>
                                            <Field name="firstName" id="firstName" className="form-control" />
                                            {errors.firstName && touched.firstName ? (
                                                <div className="text-danger">{errors.firstName}</div>
                                            ) : null}
                                        </div>
                                        <div className="col-lg-6">
                                            <label htmlFor="lastName">Last Name</label>
                                            <Field name="lastName" id="lastName" className="form-control" />
                                            {errors.lastName && touched.lastName ? (
                                                <div className="text-danger">{errors.lastName}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-12">
                                            <label htmlFor="address">Address</label>
                                            <Field name="address" id="address" className="form-control" />
                                            {errors.address && touched.address ? (
                                                <div className="text-danger">{errors.address}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-lg-6">
                                            <label htmlFor="phone">Phone Number</label>
                                            <div className="input-group mb-3">
                                                <span className="input-group-text">Egypt +2</span>
                                                <Field name="phone" id="phone" className="form-control" />
                                            </div>
                                            {errors.phone && touched.phone ? <div className="text-danger">{errors.phone}</div> : null}
                                        </div>
                                        <div className="col-lg-6">
                                            <label htmlFor="email">Email</label>
                                            <Field name="email" id="email" type="email" className="form-control" />
                                            {errors.email && touched.email ? <div className="text-danger">{errors.email}</div> : null}
                                        </div>
                                    </div>
                                    <div className="row justify-content-center mt-5">
                                    <div className="col-lg-4">
                                            <button type="submit" className="btn btn-dark w-100">Order Now!</button>
                                    </div>
                                    </div>
                                </Form>
                                )}
                            </Formik>
                        </div>
                    </div>}
                    {!items || items.length === 0 && <div className="row">
                        <div className="col-12 py-5">
                            <h1>It seems you didn't choose items to checkout, <Link href="/"><a>Continue Shopping</a></Link></h1>
                        </div>
                    </div>}
                </div>
            </section>
        </>
    );
}
 
export default Checkout;