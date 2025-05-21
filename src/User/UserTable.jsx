import { useContext } from 'react';
import UserContext from './UserStore';
import { EditText, EditTextarea } from 'react-edit-text';

const UserTable = () => {
    const { list, deleteHandler} = useContext(UserContext);
    return (
        <div className="flex items-center justify-center m-5">
            <table className="divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase">ID</th>
                        <th className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase">Name</th>
                        <th className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase">Email</th>
                        <th className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase">Age</th>
                        <th className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase">Delete</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {list?.map((item, i) => (
                        <tr key={i}>
                            <td className="px-6 py-4 text-sm font-medium text-gray-800">{i + 1}</td>
                            <td className=" text-sm text-gray-800"><EditText className="px-6 py-4 text-sm text-gray-800" defaultValue={item.name} inline/></td>
                            <td className=" text-sm text-gray-800"><EditText className="px-6 py-4 text-sm text-gray-800" defaultValue={item.email} inline/></td>
                            <td className=" text-sm text-gray-800"> <EditText className="px-6 py-4 text-sm text-gray-800" defaultValue={item.age} inline/></td>
                            <td onClick={()=>deleteHandler(item.id)} className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                <a className="text-red-500 hover:text-red-700" href="#">Delete</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default UserTable