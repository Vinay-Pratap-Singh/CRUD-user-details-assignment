import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { addNewUser, updateUser } from "../Redux/userSlice";

interface IformData {
  _id?: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  age: number;
}

const User = () => {
  const { operation } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { loading } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<IformData>({
    defaultValues:
      operation === "update"
        ? {
            _id: state?._id,
            age: state?.age,
            firstName: state?.firstName,
            lastName: state?.lastName,
            phoneNumber: state?.phoneNumber,
          }
        : {},
  });

  // function to handle the form submit
  const onFormSubmit: SubmitHandler<IformData> = async (data) => {
    // checking for request type
    if (operation === "add") {
      const res = await dispatch(addNewUser(data));

      if (res?.payload?.data) {
        reset();
      } else {
        const { age, firstName, lastName, phoneNumber, _id } = watch();
        reset({ age, firstName, lastName, phoneNumber, _id });
      }
    } else {
      const res = await dispatch(updateUser(data));

      if (res?.payload?.data) {
        reset();
        navigate("/");
      } else {
        const { age, firstName, lastName, phoneNumber, _id } = watch();
        reset({ age, firstName, lastName, phoneNumber, _id });
      }
    }
  };

  // checking invalid route
  useEffect(() => {
    if (operation !== "add" && operation !== "update") {
      navigate("/");
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <div className="w-96 shadow-md p-4 rounded-md space-y-5">
        <h1 className="text-center text-2xl font-bold">
          <span className="text-teal-500">
            {operation === "add" ? "Add new" : "Update"}
          </span>{" "}
          user
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
                type="text"
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
                  min: { value: 10, message: "Minimum age is 10" },
                })}
              />
            </label>
            {errors.age && <p className="text-red-500">{errors.age.message}</p>}
          </section>

          {/* submit button */}
          <button
            type="submit"
            disabled={loading}
            className="bg-teal-500 w-full text-white py-2 font-bold"
          >
            {operation === "add" ? "Add user" : "Update user"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default User;
