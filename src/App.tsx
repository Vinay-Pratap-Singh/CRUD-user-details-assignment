import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./Redux/store";
import { useEffect, useState } from "react";
import { IuserDetails, getAllUsers } from "./Redux/userSlice";
import DeleteModal from "./Components/DeleteModal";
import { SubmitHandler, useForm } from "react-hook-form";

interface Isearch {
  searchedName: string;
}

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { users } = useSelector((state: RootState) => state.user);
  const [userToBeDisplayed, setUserToBeDisplayed] =
    useState<IuserDetails[]>(users);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idToBeDeleted, setIdToBeDeleted] = useState("");

  const { register, handleSubmit } = useForm<Isearch>({
    defaultValues: { searchedName: "" },
  });

  // function to handle search
  const handleSearch: SubmitHandler<Isearch> = (data) => {
    if (data.searchedName === "") {
      setUserToBeDisplayed(users);
      return;
    }
    const newData = users.filter((user: IuserDetails) => {
      return (
        user?.firstName
          .toLowerCase()
          .includes(data.searchedName.toLowerCase()) ||
        user?.lastName.toLowerCase().includes(data.searchedName.toLowerCase())
      );
    });
    setUserToBeDisplayed(newData);
  };

  // getting the user's data
  useEffect(() => {
    (async () => {
      await dispatch(getAllUsers());
      setUserToBeDisplayed(users);
    })();
  }, []);

  return (
    <div className="space-y-5 mt-5">
      <h1 className="text-center text-2xl font-bold">
        Welcome to the <span className="text-teal-500">Admin Dashboard</span>
      </h1>

      {/* adding the table to display user details */}
      <div className="flex flex-col mx-5">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-2">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden space-y-5">
              <div className="w-full flex items-center justify-between">
                {/* adding the search functionality */}
                <form
                  onSubmit={handleSubmit(handleSearch)}
                  className="border-2 border-black rounded-md focus-within:border-teal-500"
                >
                  <input
                    type="text"
                    placeholder="Search user"
                    className=" px-3 py-1 focus:outline-none rounded-md"
                    {...register("searchedName")}
                  />
                  <button className="px-3 py-1 border-l-2 border-black font-medium">
                    Search
                  </button>
                </form>

                {/* button to add new user */}
                <Link to={"/user/add"}>
                  <button className="px-3 py-1 border-2 border-black rounded-md font-medium hover:border-teal-500">
                    Add new user
                  </button>
                </Link>
              </div>

              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      S.No.
                    </th>
                    <th scope="col" className="px-6 py-4">
                      First Name
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Last Name
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Phone Number
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Age
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {userToBeDisplayed.length === 0 ? (
                    <tr className="font-medium text-center">
                      <td
                        colSpan={6}
                        className="whitespace-nowrap px-6 py-4 font-medium"
                      >
                        Oops! there is no user
                      </td>
                    </tr>
                  ) : (
                    userToBeDisplayed.map((user: IuserDetails, index) => {
                      return (
                        <tr
                          key={user?._id}
                          className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-200"
                        >
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            {index < 10 ? "0" + (index + 1) : index + 1}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {user?.firstName}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {user?.lastName}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {user?.phoneNumber}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {user?.age}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 flex items-center gap-5">
                            {/* adding the edit button */}
                            <button
                              className="hover:text-yellow-500"
                              onClick={() =>
                                navigate("/user/update", {
                                  state: { ...user },
                                })
                              }
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                />
                              </svg>
                            </button>

                            {/* adding the delete button */}
                            <button
                              className="hover:text-red-500"
                              onClick={() => {
                                setIdToBeDeleted(user?._id!);
                                setIsModalOpen(true);
                              }}
                            >
                              {" "}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
              {isModalOpen && (
                <DeleteModal
                  key={idToBeDeleted}
                  isModalOpen={isModalOpen}
                  setIsModalOpen={setIsModalOpen}
                  userID={idToBeDeleted}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
