const App = () => {
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
                <form action="" className="border-2 border-black rounded-md">
                  <input
                    type="text"
                    placeholder="Search user"
                    className=" px-3 py-1 focus:outline-none rounded-md"
                  />
                  <button className="px-3 py-1 border-l-2 border-black font-medium">
                    Search
                  </button>
                </form>

                {/* button to add new user */}
                <button className="px-3 py-1 border-2 border-black rounded-md font-medium">
                  Add new user
                </button>
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
                  <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-200">
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      01
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      Vinay Pratap
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">Singh</td>
                    <td className="whitespace-nowrap px-6 py-4">9087654321</td>
                    <td className="whitespace-nowrap px-6 py-4">22</td>
                    <td className="whitespace-nowrap px-6 py-4 flex items-center gap-5">
                      {/* adding the edit button */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>

                      {/* adding the delete button */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
