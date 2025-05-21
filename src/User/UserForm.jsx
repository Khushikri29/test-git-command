import { useContext } from 'react';
import UserContext from './UserStore';

const UserForm = () => {
    const { UserInfo, onChangeHandler, addHandler } = useContext(UserContext);

    const onChange = (e) => {
        const freshUserInfo = {
            ...UserInfo,
            [e.target.name]: e.target.value,
        };
        onChangeHandler(freshUserInfo);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8">
                <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">Join DevStreak 🚀</h2>
                <form
                    className="space-y-6"
                    onSubmit={(e) => {
                        e.preventDefault();
                        addHandler();
                    }}
                >
                    {['name', 'email', 'age'].map((field) => (
                        <div key={field} className="relative z-0 w-full group">
                            <input
                                type={field === 'age' ? 'number' : field}
                                name={field}
                                id={field}
                                value={UserInfo[field]}
                                onChange={onChange}
                                className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
                                placeholder=" "
                                required
                            />
                            <label
                                htmlFor={field}
                                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                {field.charAt(0).toUpperCase() + field.slice(1)}
                            </label>
                        </div>
                    ))}

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
                    >
                        Add Info
                    </button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-500">
                    You can edit your info by clicking on any field
                </p>
            </div>
        </div>
    );
};

export default UserForm;
