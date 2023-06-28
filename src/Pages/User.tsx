import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface IformData {
  _id?: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  age: number;
}

const User = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IformData>();

  // function to handle the form submit
  const onFormSubmit: SubmitHandler<IformData> = (data) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <div className="w-96 shadow-md p-4 rounded-md space-y-5">
        <h1 className="text-center text-2xl font-bold">
          <span className="text-teal-500">Add new</span> user
        </h1>

        {/* adding the form to take user input */}
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-2">
          {/* for user first name */}
          <section className="w-full">
            <label htmlFor="firstName" className="font-bold">
              First Name
              <input
                id="firstName"
                className={`px-2 py-1 border-2 w-full font-normal ${
                  errors.firstName
                    ? "focus:outline-red-500"
                    : "focus:outline-teal-600 "
                }`}
                type="text"
                placeholder="Vinay Pratap"
                {...register("firstName", {
                  required: {
                    value: true,
                    message: "Please enter your first name",
                  },
                  minLength: {
                    value: 3,
                    message: "First name should have atleast 3 characters",
                  },
                })}
              />
            </label>
            {errors.firstName && (
              <p className="text-red-500">{errors.firstName.message}</p>
            )}
          </section>

          {/* for user last name */}
          <section className="w-full">
            <label htmlFor="lastName" className="font-bold">
              Last Name
              <input
                id="lastName"
                className={`px-2 py-1 border-2 w-full font-normal ${
                  errors.lastName
                    ? "focus:outline-red-500"
                    : "focus:outline-teal-600 "
                }`}
                type="text"
                placeholder="Singh"
                {...register("lastName", {
                  required: {
                    value: true,
                    message: "Please enter your last name",
                  },
                  minLength: {
                    value: 3,
                    message: "last name should have atleast 3 characters",
                  },
                })}
              />
            </label>
            {errors.lastName && (
              <p className="text-red-500">{errors.lastName.message}</p>
            )}
          </section>

          {/* for user phone number */}
          <section className="w-full">
            <label htmlFor="phoneNumber" className="font-bold">
              Phone Number
              <input
                id="phoneNumber"
                className={`px-2 py-1 border-2 w-full font-normal ${
                  errors.phoneNumber
                    ? "focus:outline-red-500"
                    : "focus:outline-teal-600 "
                }`}
                type="number"
                placeholder="9874563210"
                {...register("phoneNumber", {
                  required: {
                    value: true,
                    message: "Please enter your phone number",
                  },
                  minLength: {
                    value: 10,
                    message: "Please enter a valid phone number",
                  },
                  maxLength: {
                    value: 10,
                    message: "Please enter a valid phone number",
                  },
                  pattern: {
                    value: /^(\+91[-\s]?)?[0]?(91)?[789]\d{9}$/,
                    message: "Please enter a valid phone number",
                  },
                })}
              />
            </label>
            {errors.phoneNumber && (
              <p className="text-red-500">{errors.phoneNumber.message}</p>
            )}
          </section>

          {/* for user age */}
          <section className="w-full">
            <label htmlFor="age" className="font-bold">
              Age
              <input
                id="age"
                className={`px-2 py-1 border-2 w-full font-normal ${
                  errors.age
                    ? "focus:outline-red-500"
                    : "focus:outline-teal-600 "
                }`}
                type="number"
                placeholder="22"
                {...register("age", {
                  required: {
                    value: true,
                    message: "Please enter your age",
                  },
                })}
              />
            </label>
            {errors.age && <p className="text-red-500">{errors.age.message}</p>}
          </section>

          {/* submit button */}
          <button
            type="submit"
            className="bg-teal-500 w-full text-white py-2 font-bold"
          >
            Add user
          </button>
        </form>
      </div>
    </div>
  );
};

export default User;
