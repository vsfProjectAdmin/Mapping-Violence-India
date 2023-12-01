import { useForm } from "react-hook-form";

const Contact = () => {
  const {
    register,
    formState: { errors },
  } = useForm();

  return (
      <div className="container mx-auto p-4 bg-main my-48 w-1/2 rounded-lg">
        {/* HEADINGS */}
        <div>
          <h2 className="font-playfair font-semibold text-4xl text-secondary">
            SUBMIT FEEDBACK
          </h2>
          <div className="flex md:justify-end my-5"></div>
        </div>

        {/* FORM */}
        <div className="mt-10">
          <form
            className="space-y-5"
            action={`https://formsubmit.co/${process.env.REACT_APP_EMAIL}`}
            method="POST"
          >
            <input
              className="w-full border border-gray-600 p-3 rounded-md"
              type="text"
              placeholder="NAME"
              {...register("name", {
                required: "This field is required.",
                maxLength: {
                  value: 100,
                  message: "Max length is 100 characters",
                },
              })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}

            <input
              className="w-full border border-gray-600 p-3 rounded-md"
              type="email"
              placeholder="EMAIL"
              {...register("email", {
                required: "This field is required.",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}

            <textarea
              className="w-full border border-gray-600 p-3 rounded-md"
              placeholder="MESSAGE"
              rows="4"
              {...register("message", {
                required: "This field is required.",
                maxLength: {
                  value: 2000,
                  message: "Max length is 2000 characters",
                },
              })}
            />
            {errors.message && (
              <p className="text-red-500 text-sm">{errors.message.message}</p>
            )}

            <button
              className="p-3 bg-secondary hover:bg-yellow-400 transition duration-300"
              type="submit"
            >
              SEND ME A MESSAGE
            </button>
          </form>
        </div>
      </div>
  );
};

export default Contact;
