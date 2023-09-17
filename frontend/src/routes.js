import Home from './Pages/Home/Home'
import CourseInfo from "./Pages/CourseInfo/CourseInfo"
import Category from './Pages/Category/Category'
import ArticleInfo from './Pages/ArticleInfo/ArticleInfo'
import Courses from './Pages/Courses/Courses'
import Login from './Pages/Login/Login'
import Register from './Pages/Register/Register'
import AllArticles from './Pages/AllArticles/AllArticles'


const routes = [
    { path: '/', element: <Home/> },
    { path: '/course-info/:courseName', element: <CourseInfo /> },
    { path: '/category/:categoryName/:page', element: <Category/> },
    { path: '/articleInfo/:articleName', element: <ArticleInfo/> }, 
    { path: '/courses/:page', element: <Courses/> } ,
    { path: '/login', element: <Login/> } ,
    { path: '/register', element: <Register/> } ,
    { path: '/articles/:page', element: <AllArticles/> } ,
]

export default routes