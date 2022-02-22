import { createContext, useReducer } from "react";
import { useParams } from "react-router-dom";
import githubReducer from "./GithubReducer";

const GithubContext = createContext()

export const GithubProvider = ({children}) => {
    const initialState={
        users: [],
        loading: false,
        user: {},
        repos: []
    }

    const [state, dispatch] = useReducer(githubReducer, initialState)

    //get initial users for testing
    // const fetchUsers = async () => {
    //     setLoading()
    //     const response = await fetch(`${GITHUB_URL}/users`, {
    //         headers: {
    //             Authorization: `token ${GITHUB_TOKEN}`,
    //         },
    //     })

    //     const data = await response.json()
        
    //     dispatch({
    //         type: 'GET_USERS',
    //         payload: data
    //     })
    // }

    //clear button
    // const clearUsers = () => dispatch({type: 'CLEAR_USERS'})
    //dispatch an action that sets array to empty clears users out of state
    //bring function into user search from context
    //call function when you click


    return (
        <GithubContext.Provider value={{
            ...state,
            dispatch
        }}>
            {children}
        </GithubContext.Provider>
        )
}

export default GithubContext 