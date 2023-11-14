// import React, { Fragment } from 'react'
// import { useSelector } from 'react-redux'
// import { Route , Navigate, Routes} from 'react-router-dom'
// // import { Redirect } from 'react-router-dom';
// const ProtectedRoute = ({ component: Component, ...rest }) => {
//     const { loginuser, loading, isAuthenticated } = useSelector((state) => state.user)
//     // const navigate =useNavigate()
//     return (
//         <Fragment>
//             {/* //  <Routes> */}

//             {!loading && (
//                 <Routes>
//                 <Route
//                     {...rest}
//                     render={(props) => {
//                         if (!isAuthenticated) {
//                             return <Navigate to="/Login"  />
//                         }
//                         return <Component {...props} />
//                     }}
//                 />
//                 </Routes>

//             )}
//             {/* //  </Routes>    */}
//          </Fragment>

//     )
// }

// export default ProtectedRoute


// import { Router } from 'express'
import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Route, Navigate, Routes , BrowserRouter as Router } from 'react-router-dom'

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { loginuser, loading, isAuthenticated } = useSelector((state) => state.user)

    return (
        // <Fragment>
        //     {!loading && (
        //         <Router>
        //             <Routes>
        //                 <Route
        //                     {...rest}
        //                     render={(props) => {
        //                         if (!isAuthenticated) {
        //                             return <Navigate to="/Login" />
        //                         }
        //                         return <Component {...props} />
        //                     }}
        //                 />
        //             </Routes>
        //         </Router>
        //     )}
        // </Fragment>
        <>
        
        </>
    )
}

export default ProtectedRoute;