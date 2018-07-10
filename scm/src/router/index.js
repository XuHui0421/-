import Vue from 'vue'
import Router from 'vue-router'
import cookie from '../assets/js/utils'
import System from '../components/page/system' //系统
// import Financing from '../components/page/financing'

//---------------------------供应商------------------------------------
import Apply from '../components/page/supplier/Apply' //应收账款融资
import Sdata from '../components/page/supplier/data' //数据中心
import Scorecompany from '../components/page/supplier/corecompany' //核心企业
import ScompanyDetail from '../components/page/supplier/companyDetail' //核心企业详情
import Sbank from '../components/page/supplier/bank' //银行
import SbankDetail from '../components/page/supplier/bankDetail' //银行详情
import Sbill from '../components/page/supplier/bill' //票据清单
import SbillDetail from '../components/page/supplier/billDetail' //票据详情
import SfinanceList from '../components/page/supplier/financeList' //融资清单
import SfinanceDetail from '../components/page/supplier/financeDetail' //融资详情
import SserviceFee from '../components/page/supplier/serviceFee' //服务费
import Scontract from '../components/page/supplier/contract' //合同清单
import ScontractDetail from '../components/page/supplier/contractDetail' //合同详情


//---------------------------银行---------------------------------------
import BankIndex from '../components/page/bank/bankIndex' //银行首页
import BankBusiness from '../components/page/bank/business' //客户
import BankBusinessDetail from '../components/page/bank/businessDetail' //客户详情
import Bankdata from '../components/page/bank/data' //数据中心
import BankContract from '../components/page/bank/contract' //合同
import BankContractDetail from '../components/page/bank/contractDetail' //合同详情
import FinanceHistory from '../components/page/bank/financeHistory' //融资历史
import BankFinanceDetail from '../components/page/bank/financeDetail' //融资详情
import FinanceLoan from '../components/page/bank/financeLoan' //融资放款

//---------------------------核心企业-----------------------------------
import Business from '../components/page/business/business' //客户
import BusinessDetail from '../components/page/business/businessDetail' //客户
import Confirm from '../components/page/business/confirm' //确权
import ConfirmDetail from '../components/page/business/confirmDetail' //确权详情
import ConfirmFinance from '../components/page/business/confirmFinance' //确权详情
import Bdata from '../components/page/business/data' //数据中心
import Bbank from '../components/page/business/bank' //银行
import BbankDetail from '../components/page/business/bankDetail' //银行详情
import Bbill from '../components/page/business/bbill' //票据清单
import BbillDetail from '../components/page/business/bbillDetail' //票据详情
import BfinManage from '../components/page/business/finManage' //财务管理
import Bpurchase from '../components/page/business/purchase' //采购管理
import Bcontract from '../components/page/business/contract' //合同清单
import BcontractDetail from '../components/page/business/contractDetail' //合同详情




//---------------------------通用---------------------------------------
import NotFound from '../components/notFound' //404
import Login from '../components/login' //登录
import ForgetPass from '../components/forgetPass' //忘记密码
import Index from '../components/page/index' //首页
// import Detail from '../components/page/detail'
import Safe from '../components/page/safe' //安全
import Logs from '../components/page/logs' //日志
import UserInfo from '../components/page/userInfo' //个人信息
import CompanyInfo from '../components/page/companyInfo' //企业信息
import CodeRule from '../components/page/codeRule' //编码规则
import Message from '../components/page/message' //企业信息

Vue.use(Router)



const router = new Router({
  routes: [{
      path: '/',
      name: 'Default',
      meta: {
        requireAuth: true,
      },
    }, {
      path: '/index',
      name: 'Index',
      meta: {
        requireAuth: true,
      },
      component: Index
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/notFound',
      name: 'NotFound',
      component: NotFound
    },
    {
      path: '/forgetPass',
      name: 'ForgetPass',
      component: ForgetPass
    },
    {
      path: '/system',
      name: 'System',
      meta: {
        requireAuth: true,
      },
      component: System
    },
    {
      path: '/safe',
      name: 'Safe',
      meta: {
        requireAuth: true,
      },
      component: Safe
    },
    {
      path: '/logs',
      name: 'Logs',
      meta: {
        requireAuth: true,
      },
      component: Logs
    },
    {
      path: '/companyInfo',
      name: 'CompanyInfo',
      meta: {
        requireAuth: true,
      },
      component: CompanyInfo
    },
    {
      path: '/codeRule',
      name: 'CodeRule',
      meta: {
        requireAuth: true,
      },
      component: CodeRule
    },
    {
      path: '/message',
      name: 'Message',
      meta: {
        requireAuth: true,
      },
      component: Message
    },
    {
      path: '/apply',
      name: 'Apply',
      meta: {
        requireAuth: true,
      },
      component: Apply
    },

    {
      path: '/sdata',
      name: 'Sdata',
      meta: {
        requireAuth: true,
      },
      component: Sdata
    },
    {
      path: '/scorecompany',
      name: 'Scorecompany',
      meta: {
        requireAuth: true,
      },
      component: Scorecompany
    },
    {
      path: '/scompanyDetail/:id',
      name: 'ScompanyDetail',
      meta: {
        requireAuth: true,
      },
      component: ScompanyDetail
    },
    {
      path: '/sbank',
      name: 'Sbank',
      meta: {
        requireAuth: true,
      },
      component: Sbank
    },
    {
      path: '/sbankDetail/:id',
      name: 'SbankDetail',
      meta: {
        requireAuth: true,
      },
      component: SbankDetail
    },
    {
      path: '/sbill',
      name: 'Sbill',
      meta: {
        requireAuth: true,
      },
      component: Sbill
    },
    {
      path: '/sbillDetail/:id',
      name: 'SbillDetail',
      meta: {
        requireAuth: true,
      },
      component: SbillDetail
    },
    {
      path: '/sfinanceList',
      name: 'SfinanceList',
      meta: {
        requireAuth: true,
      },
      component: SfinanceList
    },
    {
      path: '/sfinanceDetail/:id',
      name: 'SfinanceDetail',
      meta: {
        requireAuth: true,
      },
      component: SfinanceDetail
    },
    {
      path: '/sserviceFee',
      name: 'SserviceFee',
      meta: {
        requireAuth: true,
      },
      component: SserviceFee
    },
    {
      path: '/scontract',
      name: 'Scontract',
      meta: {
        requireAuth: true,
      },
      component: Scontract
    },
    {
      path: '/scontractDetail/:id',
      name: 'ScontractDetail',
      meta: {
        requireAuth: true,
      },
      component: ScontractDetail
    },
    {
      path: '/userInfo',
      name: 'UserInfo',
      meta: {
        requireAuth: true,
      },
      component: UserInfo
    },
    {
      path: '/business',
      name: 'Business',
      meta: {
        requireAuth: true,
      },
      component: Business
    },
    {
      path: '/businessDetail/:id',
      name: 'BusinessDetail',
      meta: {
        requireAuth: true,
      },
      component: BusinessDetail
    },
    {
      path: '/confirm',
      name: 'Confirm',
      meta: {
        requireAuth: true,
      },
      component: Confirm
    },
    {
      path: '/confirmFinance/:id',
      name: 'ConfirmFinance',
      meta: {
        requireAuth: true,
      },
      component: ConfirmFinance
    },
    {
      path: '/confirmDetail/:id/:supplieId/:supplidName',
      name: 'ConfirmDetail',
      meta: {
        requireAuth: true,
      },
      component: ConfirmDetail
    },
    {
      path: '/bdata',
      name: 'Bdata',
      meta: {
        requireAuth: true,
      },
      component: Bdata
    },
    {
      path: '/bbank',
      name: 'Bbank',
      meta: {
        requireAuth: true,
      },
      component: Bbank
    },
    {
      path: '/bbankDetail/:id',
      name: 'BbankDetail',
      meta: {
        requireAuth: true,
      },
      component: BbankDetail
    },
    {
      path: '/bbill',
      name: 'Bbill',
      meta: {
        requireAuth: true,
      },
      component: Bbill
    },
    {
      path: '/bbillDetail/:id',
      name: 'BbillDetail',
      meta: {
        requireAuth: true,
      },
      component: BbillDetail
    },
    {
      path: '/bfinManage',
      name: 'BfinManage',
      meta: {
        requireAuth: true,
      },
      component: BfinManage
    },
    {
      path: '/bpurchase',
      name: 'Bpurchase',
      meta: {
        requireAuth: true,
      },
      component: Bpurchase
    },
    {
      path: '/bcontract',
      name: 'Bcontract',
      meta: {
        requireAuth: true,
      },
      component: Bcontract
    },
    {
      path: '/bcontractDetail/:id',
      name: 'BcontractDetail',
      meta: {
        requireAuth: true,
      },
      component: BcontractDetail
    },
    {
        path: '/bankIndex',
        name: 'BankIndex',
        meta: {
          requireAuth: true,
        },
        component: BankIndex
    },
    {
        path: '/bankBusiness',
        name: 'BankBusiness',
        meta: {
          requireAuth: true,
        },
        component: BankBusiness
    },
    {
        path: '/bankBusinessDetail/:id',
        name: 'BankBusinessDetail',
        meta: {
          requireAuth: true,
        },
        component: BankBusinessDetail
    },
    {
        path: '/bankdata',
        name: 'Bankdata',
        meta: {
          requireAuth: true,
        },
        component: Bankdata
    },
    {
        path: '/bankContract',
        name: 'BankContract',
        meta: {
          requireAuth: true,
        },
        component: BankContract
    },
    {
        path: '/bankContractDetail/:id',
        name: 'BankContractDetail',
        meta: {
          requireAuth: true,
        },
        component: BankContractDetail
    },
    {
        path: '/financeHistory',
        name: 'FinanceHistory',
        meta: {
          requireAuth: true,
        },
        component: FinanceHistory
    },
    {
        path: '/bankFinanceDetail/:id',
        name: 'BankFinanceDetail',
        meta: {
          requireAuth: true,
        },
        component: BankFinanceDetail
    },
    {
        path: '/financeLoan',
        name: 'FinanceLoan',
        meta: {
          requireAuth: true,
        },
        component: FinanceLoan
    },


  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) { //如果未匹配到路由
    next({
      path: '/notFound'
    })
  } else {
    next(); //如果匹配到正确跳转
  }
  if (to.matched.some(res => res.meta.requireAuth)) { // 判断是否需要登录权限
    if (cookie.getCookie('user')) { // 判断是否登录
      next()
    } else { // 没登录则跳转到登录界面
      next({
        path: '/login'
      })
    }
  } else {
    next()
  }
})
export default router
