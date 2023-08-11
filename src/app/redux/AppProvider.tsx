'use client'
import { Provider } from "react-redux";
import {store} from "./store";

function AppProvider({ children } : any) {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}

export default AppProvider