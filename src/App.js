import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home';
import About from './pages/about/About';
import Contact from './components/contact/Contact';
import SignUp from './pages/auth/signup/SignUp';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/auth/login/Login';
import ResetPassword from './pages/auth/resetPassword/ResetPassword';
import { AuthProvider } from './context/AuthContext';
import Account from './pages/account/Account';
import AdminPanel from './components/admin/adminPanel/AdminPanel';
import AdminLogin from './components/admin/adminLogin/AdminLogin';
import 'bootstrap/dist/css/bootstrap.min.css';
import EditAdminProducts from './components/admin/editAdminProducts/EditAdminProducts';
import { ProductProvider } from './context/ProductContext';
import { FlashSalesContext, FlashSalesProvider } from './context/FlashSalesContext';
import WishList from './components/wishlist/WishList';
import { FavoritesProvider } from './context/FavoritesContext';
import Cart from './components/cart/Cart';
import { CartProvider } from './context/CartContext';
import Checkout from './components/checkout/Checkout';
import { BestSellingProductsProvider } from './context/BestSellingProductsContext';
import { ExploreOurProductsProvider } from './context/ExploreOurProductsContext';
import CategoryPage from './components/categoryPage/CategoryPage';
import ProductDetails from './components/productDetails/ProductDetails';
import NotFound from './pages/notfound/NotFound';
import CustomerAdmin from './components/admin/customerAdmin/CustomerAdmin';

function App() {
  return (
    <div className="App">
      <ExploreOurProductsProvider>
        <BestSellingProductsProvider>
          <ProductProvider>
            <AuthProvider>
              <FlashSalesProvider>
                <FavoritesProvider>
                  <CartProvider>
                    <BrowserRouter>
                      <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/about' element={<About />} />
                        <Route path='/contact' element={<Contact />} />
                        <Route path='/signup' element={<SignUp />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/resetpassword' element={<ResetPassword />} />
                        <Route path='/myaccount' element={<Account />} />
                        <Route path='/adminlogin' element={<AdminLogin />} />
                        <Route path='/admin' element={<AdminPanel />} />
                        <Route path='/editAdminProducts' element={<EditAdminProducts />} />
                        <Route path='/wishlist' element={<WishList />} />
                        <Route path='/cart' element={<Cart />} />
                        <Route path='/checkout' element={<Checkout />} />
                        <Route path='/category/:categoryName' element={<CategoryPage />} />
                        <Route path='/product/:productId' element={<ProductDetails />} />
                        <Route path='*' element={<NotFound/>}/>
                        <Route path='/customerAdmin' element={<CustomerAdmin/>}/>
                      </Routes>
                    </BrowserRouter>
                    <ToastContainer
                      position="top-right"
                      autoClose={5000}
                      hideProgressBar={false}
                      newestOnTop={false}
                      closeOnClick
                      rtl={false}
                      pauseOnFocusLoss
                      draggable
                      pauseOnHover
                      theme="light"
                    />
                  </CartProvider>
                </FavoritesProvider>
              </FlashSalesProvider>
            </AuthProvider>
          </ProductProvider>
        </BestSellingProductsProvider>
      </ExploreOurProductsProvider>
    </div>
  );
}

export default App;