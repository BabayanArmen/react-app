import { useForm, type SubmitHandler } from "react-hook-form"

type FormFields = {
    email: string;
    password: string;
    confirmPassword: string
}

export function ReactHookForm() {

    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<FormFields>({
        defaultValues: {
            email: "someemail@.mail"
        },
    });

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log(data);
    }

    return (
        <>
            <h3>Reack Hook Form</h3>

            <form onSubmit={handleSubmit(onSubmit)}>
                <input 
                    {...register("email", {
                        // required: true,
                        
                        // pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        
                        // validate: (value) => value.includes('@')

                        // validate: (value) => {
                        //     /// some logic
                        //     return value.includes('@') || "Input valid email"
                        // }
                        
                        // required: {
                        //     value: true,
                        //     message: "email is required"
                        // },

                        required: "Email is required",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "input valid email"
                        }
                    })} 
                    type="text" 
                    placeholder="Email"
                />
                {errors.email && (
                    <div>{errors.email.message}</div>
                )}
                
                <input 
                    {...register("password", {
                        required: "Password is required",
                        // minLength: 3,
                        validate: (value) => {
                            if (value.length < 3) {
                                return "password must have minimum 3 symbols"
                            } 
                        }
                    })} 
                    type="password" 
                    placeholder="Password"
                />
                {errors.password && (
                    <div>{errors.password.message}</div>
                )}

                <input
                {...register("confirmPassword", {
                    required: "This field is required",
                    validate: (value, formValues) => {
                        return value == formValues.password || "passwords do not match"
                    }
                })}
                    type="password"
                    placeholder="Confirm password" 
                />
                {errors.confirmPassword && (
                    <div>{errors.confirmPassword.message}</div>
                )}

                <button disabled={isSubmitting} type="submit">{isSubmitting ? "Loading" : 'Submit'}</button>
            </form>
        </>
    )
}

// npm install react-hook-form
// npm install @hookform/resolvers
// npm install zod