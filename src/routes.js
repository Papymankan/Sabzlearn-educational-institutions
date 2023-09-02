import Home from './Pages/Home/Home'
import CourseInfo from "./Pages/CourseInfo/CourseInfo"
import Category from './Pages/Category/Category'
import ArticleInfo from './Pages/ArticleInfo/ArticleInfo'
import Courses from './Pages/Courses/Courses'

const routes = [
    { path: '/', element: <Home/> },
    { path: '/courseInfo/:courseName', element: <CourseInfo /> },
    { path: '/category/:categoryName', element: <Category/> },
    { path: '/articleInfo/:articleName', element: <ArticleInfo/> }, 
    { path: '/courses', element: <Courses/> } 
]

export default routes