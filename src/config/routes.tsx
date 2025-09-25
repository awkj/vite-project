import React from 'react'
import AccountDetailsPage from '../pages/AccountDetailsPage'
import BannedUsersPage from '../pages/BannedUsersPage'
import BillingPage from '../pages/BillingPage'
import CalendarPage from '../pages/CalendarPage'
import GeneralPage from '../pages/GeneralPage'
import InvoicesPage from '../pages/InvoicesPage'
import SecurityPage from '../pages/SecurityPage'
import { PATHS } from './paths'

// 定义路由接口
interface Route {
  path: string
  component: React.ElementType
}

// 定义应用的所有路由
const routes: Route[] = [
  {
    path: PATHS.HOME,
    component: GeneralPage,
  },
  {
    path: PATHS.BANNED_USERS,
    component: BannedUsersPage,
  },
  {
    path: PATHS.CALENDAR,
    component: CalendarPage,
  },
  {
    path: PATHS.BILLING,
    component: BillingPage,
  },
  {
    path: PATHS.INVOICES,
    component: InvoicesPage,
  },
  {
    path: PATHS.ACCOUNT_DETAILS,
    component: AccountDetailsPage,
  },
  {
    path: PATHS.SECURITY,
    component: SecurityPage,
  }
]

export default routes