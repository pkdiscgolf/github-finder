import { createContext, useReducer } from "react";
import { useParams } from "react-router-dom";
import githubReducer from "./GithubReducer";

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({children}) => {
    const initialState={
        users: [],
        loading: false
    }

    const [state, dispatch] = useReducer(githubReducer, initialState)

    //get initial users for testing
    const fetchUsers = async () => {
        setLoading()
        const response = await fetch(`${GITHUB_URL}/users`, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
            },
        })

        const data = await response.json()
        
        dispatch({
            type: 'GET_USERS',
            payload: data
        })
    }

    //clear button
    const clearUsers = () => dispatch({type: 'CLEAR_USERS'})
    //dispatch an action that sets array to empty clears users out of state
    //bring function into user search from context
    //call function when you click


    //get search results
    const searchUsers = async (text) => {
        setLoading()

        const params = new URLSearchParams({
            q: text
        })

        const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
            },
        })

        const {items} = await response.json()
        
        dispatch({
            type: 'GET_USERS',
            payload: items
        })
    }

    //set loading
    const setLoading = () => dispatch({type: 'SET_LOADING'})

    return (
        <GithubContext.Provider value={{
            users: state.users,
            loading: state.loading,
            searchUsers,
            clearUsers
        }}>
            {children}
        </GithubContext.Provider>
        )
}

export default GithubContext 