import Home from './Pages/Home/Home'
import CourseInfo from "./Pages/CourseInfo/CourseInfo"
import Category from './Pages/Category/Category'
import ArticleInfo from './Pages/ArticleInfo/ArticleInfo'
import Courses from './Pages/Courses/Courses'
import Login from './Pages/Login/Login'
import Register from './Pages/Register/Register'
import AllArticles from './Pages/AllArticles/AllArticles'
import Contact from './Pages/Contact/Contact'
import Search from './Pages/Search/Search'
import AdminPanel from './Pages/AdminPanel/AdminPanel'
import AdminUsers from './Pages/AdminPanel/AdminUsers/AdminUsers'
import AdminCourses from './Pages/AdminPanel/AdminCourses/AdminCourses'
import AdminCategory from './Pages/AdminPanel/AdminCategory/AdminCategory'
import AdminContact from './Pages/AdminPanel/AdminContact/AdminContact'
import AdminArticles from './Pages/AdminPanel/AdminArticles/AdminArticles'
import AdminSessions from './Pages/AdminPanel/AdminSessions/AdminSessions'
import Session from './Pages/Session/Session'
import AdminMenus from './Pages/AdminPanel/AdminMenus/AdminMenus'
import AdminComments from './Pages/AdminPanel/AdminComments/AdminComments'
import AdminOffs from './Pages/AdminPanel/AdminOffs/AdminOffs'
import AdminMain from './Pages/AdminPanel/AdminMain/AdminMain'
import UserPanel from './Pages/UserPanel/UserPanel'
import UserMain from './Pages/UserPanel/UserMain/UserMain'
import UserOrders from './Pages/UserPanel/UserOrders/UserOrders'
import UserCourses from './Pages/UserPanel/UserCourses/UserCourses'
import UserTickets from './Pages/UserPanel/UserTickets/UserTickets'
import SendTicket from './Pages/UserPanel/UserTickets/SendTicket/SendTicket'
import TicketAnswer from './Pages/UserPanel/TicketAnswer/TicketAnswer'
import EditAccount from './Pages/UserPanel/EditAccount/EditAccount'
import PrivateRoute from './Components/PrivateRoute/PrivateRoute'
import AdminTickets from './Pages/AdminPanel/AdminTickets/AdminTickets'
import AdminEvents from './Pages/AdminPanel/AdminEvents/AdminEvents'
import NotFoundPage from './Pages/404Page/NotFoundPage'
import NotFoundPageUser from './Pages/UserPanel/404Page/NotFoundPageUser'


const routes = [
    { path: '/', element: <Home /> },
    { path: '/course-info/:courseName', element: <CourseInfo /> },
    { path: '/category/:categoryName/:page', element: <Category /> },
    { path: '/articleInfo/:articleName', element: <ArticleInfo /> },
    { path: '/courses/:page', element: <Courses /> },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
    { path: '/articles/:page', element: <AllArticles /> },
    { path: '/contact', element: <Contact /> },
    { path: '/search/:value', element: <Search /> },
    { path: '/:courseName/:sessionID', element: <Session /> },

    {
        path: '/admin-panel/*', element: <PrivateRoute><AdminPanel /></PrivateRoute>, children: [
            { path: 'users', element: <AdminUsers /> },
            { path: '', element: <AdminMain /> },
            { path: 'courses', element: <AdminCourses /> },
            { path: 'categories', element: <AdminCategory /> },
            { path: 'contact', element: <AdminContact /> },
            { path: 'articles', element: <AdminArticles /> },
            { path: 'sessions', element: <AdminSessions /> },
            { path: 'menus', element: <AdminMenus /> },
            { path: 'comments', element: <AdminComments /> },
            { path: 'offs', element: <AdminOffs /> },
            { path: 'tickets', element: <AdminTickets /> },
            { path: 'events', element: <AdminEvents /> },
        ]
    },

    {
        path: '/user-panel/*', element: <UserPanel />, children: [
            { path: '', element: <UserMain /> },
            { path: 'orders', element: <UserOrders /> },
            { path: 'courses', element: <UserCourses /> },
            { path: 'tickets', element: <UserTickets /> },
            { path: 'send-ticket', element: <SendTicket /> },
            { path: 'tickets/answer/:id', element: <TicketAnswer /> },
            { path: 'edit-account', element: <EditAccount /> },
            { path: '*', element: <NotFoundPageUser /> },
        ]
    }
    ,
    { path: '*', element: <NotFoundPage /> },
]

export default routes