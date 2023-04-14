import {Routes, Route} from 'react-router-dom';
import {useEffect, useState} from "react";
import PageRoutes from '../constants/page_routes';
import SignUp from '../SignUp';
import SignIn from '../SignIn';
import AccidentPronePage from '../home';

export const AppRoutes = () => {

    const [isLogin, setLogin] = useState(false);

    useEffect(() => {
        // const loginUserSubscription = loginUser$.subscribe((user) => {
        //     user ? setLogin(true) : setLogin(false);
        // });
        // return () => {
        //     loginUserSubscription.unsubscribe();
        // }
    }, []);

    return (
        <>
            <Routes>
                <Route path={PageRoutes.SIGN_UP} element={<SignUp/>}/>
                <Route path={PageRoutes.SIGN_IN} element={<SignIn/>}/>
                <Route path={PageRoutes.HOME} element={<AccidentPronePage/>}/>
                {/* {
                    isLogin ?
                        <Route path={"/"} element={<RestrictedRoute/>}>
                            <Route path={PageRoutes.HOME_PAGE} element={<Home/>}/>
                            <Route path={PageRoutes.USERS_PAGE} element={<Userslist/>}/>
                            <Route path={PageRoutes.PERMISSIONS_PAGE} element={<PermissionsListView/>}/>
                            <Route path={PageRoutes.ROLES_PAGE} element={<ViewRolesComponent/>}/>
                        </Route>
                        :
                        null
                } */}

            </Routes>
        </>
    )
}
