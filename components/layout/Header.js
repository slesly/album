import Link from 'next/link';
import Image from 'next/image';
import { useSelector } from 'react-redux'

const Header = ({ cartOpenProp }) => {

  const { quantity } = useSelector(state =>  state.cart)

  const cartToggle = () => {
    cartOpenProp(true);
  };

    return (
      <header>
        <div className="navbar navbar-dark bg-dark shadow-sm">
          <div className="container">
            <Link href="/" className="navbar-brand d-flex align-items-center">
              <a className="fs-2 text-decoration-none text-warning text-uppercase"><i className="bi bi-bag-check"></i> Album</a>
            </Link>
            <div className="left d-flex align-items-center">
              <div className="user me-5">
                <div className="avatar d-flex align-items-center">
                  <Image src="/img/avatar.jpg" alt="User Name" className="rounded-circle" width={40} height={40} />
                  <span className="text-white"> Mohamed ElSlesly</span>
                </div>
              </div>
              <button className="btn cart-btn p-0 position-relative" type="button" onClick={cartToggle}>
                <i className="bi bi-bag text-white"></i>
                {quantity && <span className="badge rounded-pill bg-warning text-dark">{ quantity }</span>}
              </button>
            </div>
          </div>
        </div>
      </header>
    );
}
 
export default Header;