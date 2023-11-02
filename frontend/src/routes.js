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
    { path: '/search/:value', element: <Search/> } ,

    { path: '/admin-panel/*', element: <AdminPanel/> , children : [
        { path: 'users', element: <AdminUsers/>} , 
        { path: 'courses', element: <AdminCourses/>} , 
        { path: 'categories', element: <AdminCategory/>} , 
        { path: 'contact', element: <AdminContact/>} , 
        { path: 'articles', element: <AdminArticles/>} , 
        { path: 'sessions', element: <AdminSessions/>} , 
    ] } 
]

export default routes