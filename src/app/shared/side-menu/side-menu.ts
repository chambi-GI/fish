import { SideMenuItem } from "./side-menu.model";

export const MENU: SideMenuItem[] = [
  // {
  //     id: 1,
  //     label: 'Home',
  //     link: '/',
  // },
  {
    id: 2,
    label: 'MENUITEMS.SHOP.TEXT',
    subItems: [
      {
        id: 1,
        label: 'MENUITEMS.SHOP.LIST.Shoplayouts',
        subChild: [
          {
            id: 1,
            label: 'MENUITEMS.SHOP.LIST.ShopGridLeftSidebar',
            link: '/shop/800a-b935-1c5a246b7ef6',
            parentId: 4
          },
          {
            id: 2,
            label: 'MENUITEMS.SHOP.LIST.ShopGridRightSidebar',
            link: '/shop/grid-rs',
            parentId: 4
          },
          {
            id: 3,
            label: 'MENUITEMS.SHOP.LIST.ShopGridFiltersonTop',
            link: '/shop/grid-ft',
            parentId: 4
          },
          {
            id: 4,
            label: 'MENUITEMS.SHOP.LIST.ShopListLeftSidebar',
            link: '/shop/list-ls',
            parentId: 4
          },
          {
            id: 5,
            label: 'MENUITEMS.SHOP.LIST.ShopListRightSidebar',
            link: '/shop/list-rs',
            parentId: 4
          },
          {
            id: 6,
            label: 'MENUITEMS.SHOP.LIST.ShopListFiltersonTop',
            link: '/shop/list-ft',
            parentId: 4
          }
        ]
      },
      {
        id: 2,
        label: 'MENUITEMS.SHOP.LIST.Marketplace',
        subChild: [
          {
            id: 1,
            label: 'MENUITEMS.SHOP.LIST.SingleItemPage',
            fulllink: 'https://themes.themesbrand.com/chambi/angular/marketplace/single',
          },
          {
            id: 2,
            label: 'MENUITEMS.SHOP.LIST.VendorPage',
            fulllink: 'https://themes.themesbrand.com/chambi/angular/marketplace/vendor',
          },
          {
            id: 3,
            label: 'MENUITEMS.SHOP.LIST.Cart',
            fulllink: 'https://themes.themesbrand.com/chambi/angular/marketplace/cart',
          },
          {
            id: 4,
            label: 'MENUITEMS.SHOP.LIST.Checkout',
            fulllink: 'https://themes.themesbrand.com/chambi/angular/marketplace/checkout',
          }
        ]
      },
      {
        id: 3,
        label: 'MENUITEMS.SHOP.LIST.Grocerystore',
        subChild: [
          {
            id: 1,
            label: 'MENUITEMS.SHOP.LIST.ProductCatalog',
            link: '/grocery/product-catalog',
          },
          {
            id: 2,
            label: 'MENUITEMS.SHOP.LIST.SingleProductPage',
            link: '/grocery/single-product',
          },
          {
            id: 3,
            label: 'MENUITEMS.SHOP.LIST.Checkout',
            link: '/grocery/checkout',
          }
        ]
      },
      {
        id: 4,
        label: 'MENUITEMS.SHOP.LIST.FoodDelivery',
        subChild: [
          {
            id: 1,
            label: 'MENUITEMS.SHOP.LIST.CategoryPage',
            fulllink: 'https://themes.themesbrand.com/chambi/angular/food/category',
          },
          {
            id: 2,
            label: 'MENUITEMS.SHOP.LIST.SingleItem',
            fulllink: 'https://themes.themesbrand.com/chambi/angular/food/restaurants',
          },
          {
            id: 3,
            label: 'MENUITEMS.SHOP.LIST.Cart',
            fulllink: 'https://themes.themesbrand.com/chambi/angular/food/cart',
          },
          {
            id: 4,
            label: 'MENUITEMS.SHOP.LIST.Checkout',
            fulllink: 'https://themes.themesbrand.com/chambi/angular/food/checkout',
          }
        ]
      },
      {
        id: 6,
        label: 'MENUITEMS.SHOP.LIST.Shoppages',
        subChild: [
          {
            id: 1,
            label: 'MENUITEMS.SHOP.LIST.ShopCategories',
            link: '/shop/categories',
          },
          {
            id: 2,
            label: 'MENUITEMS.SHOP.LIST.ProductPagev1',
            link: '/shop/single-v1',
          },
          {
            id: 3,
            label: 'MENUITEMS.SHOP.LIST.ProductPagev2',
            link: '/shop/single-v2',
          },
          {
            id: 4,
            label: 'MENUITEMS.SHOP.LIST.Cart',
            link: '/shop/cart',
          },
          {
            id: 5,
            label: 'MENUITEMS.SHOP.LIST.CheckoutDetails',
            link: '/shop/checkout-details',
          },
          {
            id: 6,
            label: 'MENUITEMS.SHOP.LIST.CheckoutShipping',
            link: '/shop/checkout-shipping',
          },
          {
            id: 7,
            label: 'MENUITEMS.SHOP.LIST.CheckoutPayment',
            link: '/shop/checkout-payment',
          },
          {
            id: 8,
            label: 'MENUITEMS.SHOP.LIST.CheckoutReview',
            link: '/shop/checkout-review',
          },
          {
            id: 9,
            label: 'MENUITEMS.SHOP.LIST.CheckoutComplete',
            link: '/shop/checkout-complete',
          },
          {
            id: 10,
            label: 'MENUITEMS.SHOP.LIST.OrderTracking',
            link: '/shop/order-tracking',
          },
          {
            id: 11,
            label: 'MENUITEMS.SHOP.LIST.ProductComparison',
            link: '/shop/comparison',
          }
        ]
      }
    ]
  },
  {
    id: 3,
    label: 'MENUITEMS.ACCOUNT.TEXT',
    subItems: [
      {
        id: 1,
        label: 'MENUITEMS.ACCOUNT.LIST.ShopUserAccount',
        subChild: [
          {
            id: 1,
            label: 'MENUITEMS.ACCOUNT.LIST.OrdersHistory',
            link: '/account/orders'
          },
          {
            id: 2,
            label: 'MENUITEMS.ACCOUNT.LIST.ProfileSettings',
            link: '/account/profile'
          },
          {
            id: 3,
            label: 'MENUITEMS.ACCOUNT.LIST.AccountAddresses',
            link: '/account/address'
          },
          {
            id: 4,
            label: 'MENUITEMS.ACCOUNT.LIST.PaymentMethods',
            link: '/account/payment'
          },
          {
            id: 5,
            label: 'MENUITEMS.ACCOUNT.LIST.Wishlist',
            link: '/account/wishlist'
          },
          {
            id: 6,
            label: 'MENUITEMS.ACCOUNT.LIST.MyTickets',
            link: '/account/tickets'
          },
          {
            id: 7,
            label: 'MENUITEMS.ACCOUNT.LIST.SingleTicket',
            link: '/account/single-ticket'
          }
        ]
      },
      {
        id: 2,
        label: 'MENUITEMS.ACCOUNT.LIST.VendorDashboard',
        subChild: [
          {
            id: 1,
            label: 'MENUITEMS.ACCOUNT.LIST.Settings',
            fulllink: 'https://themes.themesbrand.com/chambi/angular/marketplace/setting'
          },
          {
            id: 2,
            label: 'MENUITEMS.ACCOUNT.LIST.Purchases',
            lfulllink: 'https://themes.themesbrand.com/chambi/angular/marketplace/purchase'
          },
          {
            id: 3,
            label: 'MENUITEMS.ACCOUNT.LIST.Favorites',
            fulllink: 'https://themes.themesbrand.com/chambi/angular/marketplace/favorites'
          },
          {
            id: 4,
            label: 'MENUITEMS.ACCOUNT.LIST.Sales',
            fulllink: 'https://themes.themesbrand.com/chambi/angular/marketplace/sales'
          },
          {
            id: 5,
            label: 'MENUITEMS.ACCOUNT.LIST.Products',
            fulllink: 'https://themes.themesbrand.com/chambi/angular/marketplace/product'
          },
          {
            id: 6,
            label: 'MENUITEMS.ACCOUNT.LIST.AddNewProduct',
            fulllink: 'https://themes.themesbrand.com/chambi/angular/marketplace/addproduct'
          },
          {
            id: 7,
            label: 'MENUITEMS.ACCOUNT.LIST.Payouts',
            fulllink: 'https://themes.themesbrand.com/chambi/angular/marketplace/payout'
          }
        ]
      },
      {
        id: 4,
        label: 'MENUITEMS.ACCOUNT.LIST.SignIn',
        link: '/account/signin'
      },
      {
        id: 5,
        label: 'MENUITEMS.ACCOUNT.LIST.PasswordRecovery',
        link: '/account/password-recovery'
      },
    ]
  },
  {
    id: 4,
    label: 'MENUITEMS.PAGES.TEXT',
    subItems: [
      {
        id: 2,
        label: 'MENUITEMS.PAGES.LIST.AboutUs',
        link: '/pages/about'
      },
      {
        id: 3,
        label: 'MENUITEMS.PAGES.LIST.Contacts',
        link: '/pages/contacts'
      },
      {
        id: 4,
        label: 'MENUITEMS.PAGES.LIST.HelpCenter',
        subChild: [
          {
            id: 1,
            label: 'MENUITEMS.PAGES.LIST.HelpCenter',
            link: '/pages/topic'
          },
          {
            id: 2,
            label: 'MENUITEMS.PAGES.LIST.SingleTopic',
            link: '/pages/single-topic'
          },
          {
            id: 3,
            label: 'MENUITEMS.PAGES.LIST.SubmitRequest',
            link: '/pages/submit-request'
          }
        ]
      },
      {
        id: 5,
        label: 'MENUITEMS.PAGES.LIST.404NotFound',
        subChild: [
          {
            id: 1,
            label: 'MENUITEMS.PAGES.LIST.404SimpleText',
            link: '/pages/404-simple'
          },
          {
            id: 2,
            label: 'MENUITEMS.PAGES.LIST.404Illustration',
            link: '/pages/404-illustration'
          }
        ]
      },
    ]
  },
  {
    id: 5,
    label: 'MENUITEMS.BLOGS.TEXT',
    subItems: [
      {
        id: 1,
        label: 'MENUITEMS.BLOGS.LIST.BlogListLayouts',
        subChild: [
          {
            id: 1,
            label: 'MENUITEMS.BLOGS.LIST.ListwithSidebar',
            link: '/blogs/list-sidebar'
          },
          {
            id: 2,
            label: 'MENUITEMS.BLOGS.LIST.ListnoSidebar',
            link: '/blogs/list'
          }
        ]
      },
      {
        id: 2,
        label: 'MENUITEMS.BLOGS.LIST.BlogGridLayouts',
        subChild: [
          {
            id: 1,
            label: 'MENUITEMS.BLOGS.LIST.GridwithSidebar',
            link: '/blogs/grid-sidebar'
          },
          {
            id: 2,
            label: 'MENUITEMS.BLOGS.LIST.GridnoSidebar',
            link: '/blogs/grid'
          }
        ]
      },
      {
        id: 3,
        label: 'MENUITEMS.BLOGS.LIST.SinglePostLayouts',
        subChild: [
          {
            id: 1,
            label: 'MENUITEMS.BLOGS.LIST.ArticlewithSidebar',
            link: '/blogs/single-sidebar'
          },
          {
            id: 2,
            label: 'MENUITEMS.BLOGS.LIST.ArticlenoSidebar',
            link: '/blogs/single'
          }
        ]
      },
    ]
  },
];

