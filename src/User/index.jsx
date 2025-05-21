import UserForm from "./UserForm";
import UserContext from "./UserStore";
import UserTable from "./UserTable";
import { useState } from "react";

const User = () => {

    const [UserInfo, setUserInfo] = useState({
        name: "",
        email: "",
        age: "",
    });

    const [list, setlist] = useState([]);

    const onChangeHandler = (info) => { 
        setUserInfo(info);
    };
    
    const addHandler = () => {
        setlist((prev) => [{...UserInfo, id: Date.now()}, ...prev]);
        setUserInfo({
            name: "",
            email: "",
            age: ""
        });
    }
    const deleteHandler=(id)=>{
        const filteredList = list.filter((item) => item.id !== id);
        setlist(filteredList);
    }
    return (
        <UserContext.Provider
            value={{
                UserInfo,
                list,
                onChangeHandler,
                addHandler,
                deleteHandler
            }}
        >
            <div>
                <UserForm />
                <UserTable />
            </div>
        </UserContext.Provider>
    )
}
export default User;