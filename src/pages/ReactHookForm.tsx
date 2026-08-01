import { useForm, type SubmitHandler } from "react-hook-form"

type FormFields = {
    email: string;
    password: string
}

export function ReactHookForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormFields>();

    const onSubmit: SubmitHandler<FormFields> = (data) => {
        console.log(data);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input 
                {...register("email", {
                    // required: true,
                    // pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    // validate: (value) => value.includes('@')
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
            <button type="submit">Submit</button>
        </form>
    )
}