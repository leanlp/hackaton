import { User } from "../typings/index";
import { gql, useQuery } from '@apollo/client';
import { useEffect, useState } from "react";
import UserProfile from '../components/UserProfile';

const GET_TODOS = gql`
 query GetTodos{
       allTodos {
           id
           title
           description
           priority
           owner
           tags
           status
       }
 }
`;


export default function Profile() {

    const { loading, error, data } = useQuery( GET_TODOS );
    const [user, setUser] = useState();

    // useEffect( () => {
    //     if ( data ) setTodos( data.allTodos );
    // }, [data] );


    // if ( loading ) return <p>Loading...</p>;
    // if ( error ) {
    //     return <p>Error : {error.message}</p>;
    // }
    return {
        // todos.filter( ( todo ) => todo.status === "ready" ).map( ( todo: Todo, index ) => (
        //     <UserProfile key={todo.id}
        //         todo={todo}
        //         ownerAddress={ownerAddress}
        //         setState={setTodos}
        //         index={index}
        //         updateState={update}
        //         onUpdateTodo={onUpdateTodo} />

        // ) );
    };
}