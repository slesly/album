import Header from '@/components/Layout/Header'
import Footer from './Layout/Footer'
import CartMenu from "./CartMenu";
import { useState } from 'react';

const Layout = ({ children }) => {
    const [cartOpenProp, useCartOpenProp] = useState(false);
  return ( 
    <main>

      <Header
        cartOpenProp={(state) => useCartOpenProp(state)}
      />

      {children}

      <Footer />

      <CartMenu
        cartOpenProp={cartOpenProp}
        cartCloseProp={(state) => useCartOpenProp(state)}
      />

    </main>
  );
}
 
export default Layout;