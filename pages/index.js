import Head from 'next/head'
import JumpStart from '../components/JumpStart'
import Album from '../components/Album'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../store/actions/productsAction'

 const Home = () => {

  const dispatch = useDispatch()
  const { products } = useSelector(state => state.products)
  const [ searchedProducts, setSearchedProducts ] = useState(products)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  useEffect(() => {
    setSearchedProducts(products)
  }, [products])

  const handleSearch = e => {
    const keywords = e.target.value
    const filteredProducts = products.filter(product => product.title.includes(keywords))
    setSearchedProducts(filteredProducts)
  }

  return (
    <>
      <Head>
        <title>Album | Products App</title>
        <meta name="description" content="Products App Task" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <JumpStart handleSearch={handleSearch} />

      <Album products={searchedProducts} />
    </>
  )
}
export default Home