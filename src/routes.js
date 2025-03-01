import Login from '~/pages/Auth/Login'
import Signup from '~/pages/Auth/Signup'
import ForgotPassword from '~/pages/Auth/ForgotPassword'
import OTPConfirm from '~/pages/Auth/OTPConfirm'
import ResetPassword from '~/pages/Auth/ResetPassword'

import HomePage from '~/pages/Buyer/HomePage/HomePage'
import SearchPage from '~/pages/Buyer/SearchPage/SearchPage'
import UserInfo from '~/pages/Buyer/User/UserProfile/UserProfile'
import CartPage from '~/pages/Buyer/CartPage/CartPage'
import DetailProduct from '~/pages/Buyer/ProductDetailPage/ProductDetailPage'
import UserOrder from '~/pages/Buyer/User/UserOrder/UserOrder'
import Checkout from '~/pages/Buyer/CheckoutPage/CheckoutPage'

import ShopOverview from '~/pages/Seller/Dashboard/Dashboard'
import ShopProfle from '~/pages/Seller/Profile/Profile'
import ManageOrders from '~/pages/Seller/Orders/Orders'
import ManageProducts from '~/pages/Seller/Products/Products'
import AddProduct from '~/pages/Seller/Products/CreateForm/CreateForm'
import EditProduct from '~/pages/Seller/Products/Products'

import Account from '~/pages/Admin/Account/Account'
import LoginLog from '~/pages/Admin/LoginLog/LoginLog'
import Category from '~/pages/Admin/Categories/Categories'
import EditCategory from '~/pages/Admin/Categories/UpdateCategory/UpdateCategory'
import Product from '~/pages/Admin/Products/Products'
import AddProduct_Admin from '~/pages/Admin/Products/CreateProduct/CreateProduct'
import EditProduct_Admin from '~/pages/Admin/Products/UpdateProduct/UpdateProduct'
import User from '~/pages/Admin/Users/Users'
import AddUser from '~/pages/Admin/Users/CreateUser/CreateUser'
import EditUser from '~/pages/Admin/Users/UpdateUser/UpdateUser'
import Config from '~/pages/Admin/Config/Config'

import Page404 from '~/pages/Page404'

import systemConfig from '~/config/system'

export const routes = [
  // Các route dành cho khách hàng
  {
    path: '/',
    page: HomePage,
    isShowHeader: true,
    isAuthorized: true
  },
  {
    path: '/auth/login',
    page: Login,
    isShowHeader: false,
    isAuthorized: false
  },
  {
    path: '/auth/signup',
    page: Signup,
    isShowHeader: false,
    isAuthorized: false
  },
  {
    path: '/auth/forgot-password',
    page: ForgotPassword,
    isShowHeader: false,
    isAuthorized: false
  },
  {
    path: '/auth/otp-confirm',
    page: OTPConfirm,
    isShowHeader: false,
    isAuthorized: false
  },
  {
    path: '/auth/reset-password',
    page: ResetPassword,
    isShowHeader: false,
    isAuthorized: false
  },
  {
    path: '/cart',
    page: CartPage,
    isShowHeader: true,
    isAuthorized: true
  },
  {
    path: '/search',
    page: SearchPage,
    isShowHeader: true,
    isAuthorized: true
  },
  {
    path: '/user/info',
    page: UserInfo,
    isShowHeader: true,
    isAuthorized: true
  },
  {
    path: '/detailproduct/:productId',
    page: DetailProduct,
    isShowHeader: true,
    isAuthorized: true
  },
  {
    path: '/user/order',
    page: UserOrder,
    isShowHeader: true,
    isAuthorized: true
  },
  {
    path: '/checkout',
    page: Checkout,
    isShowHeader: true,
    isAuthorized: true
  },

  // Admin Routes
  {
    path: `${systemConfig.prefixAdmin}/account`,
    page: Account,
    role: 'admin',
    isAuthorized: true
  },
  {
    path: `${systemConfig.prefixAdmin}/login-log`,
    page: LoginLog,
    role: 'admin',
    isAuthorized: true
  },
  {
    path: `${systemConfig.prefixAdmin}/category`,
    page: Category,
    role: 'admin',
    isAuthorized: true
  },
  {
    path: `${systemConfig.prefixAdmin}/category/edit`,
    page: EditCategory,
    role: 'admin',
    isAuthorized: true
  },
  {
    path: `${systemConfig.prefixAdmin}/product`,
    page: Product,
    role: 'admin',
    isAuthorized: true
  },
  {
    path: `${systemConfig.prefixAdmin}/product/add`,
    page: AddProduct_Admin,
    role: 'admin',
    isAuthorized: true
  },
  {
    path: `${systemConfig.prefixAdmin}/product/edit`,
    page: EditProduct_Admin,
    role: 'admin',
    isAuthorized: true
  },
  {
    path: `${systemConfig.prefixAdmin}/user`,
    page: User,
    role: 'admin',
    isAuthorized: true
  },
  {
    path: `${systemConfig.prefixAdmin}/user/add`,
    page: AddUser,
    role: 'admin',
    isAuthorized: true
  },
  {
    path: `${systemConfig.prefixAdmin}/user/edit`,
    page: EditUser,
    role: 'admin',
    isAuthorized: true
  },
  {
    path: `${systemConfig.prefixAdmin}/config`,
    page: Config,
    role: 'admin',
    isAuthorized: true
  },

  // Các route dành cho người bán
  {
    path: '/shop/overview',
    page: ShopOverview,
    isShowHeader: false,
    isAuthorized: true,
    role: 'seller'
  },
  {
    path: '/shop/products/add',
    page: AddProduct,
    isShowHeader: false,
    isAuthorized: true,
    role: 'seller'
  },
  {
    path: '/shop/products',
    page: ManageProducts,
    isShowHeader: false,
    isAuthorized: true,
    role: 'seller'
  },
  {
    path: '/shop/orders',
    page: ManageOrders,
    isShowHeader: false,
    isAuthorized: true,
    role: 'seller'
  },
  {
    path: '/shop/profile',
    page: ShopProfle,
    isShowHeader: false,
    isAuthorized: true,
    role: 'seller'
  },
  {
    path: '/shop/products/edit',
    page: EditProduct,
    isShowHeader: false,
    isAuthorized: true,
    role: 'seller'
  },

  // 404
  {
    path: '*',
    page: Page404
  }
]
