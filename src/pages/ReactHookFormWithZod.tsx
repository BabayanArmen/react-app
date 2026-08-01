import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";

export function ReactHookFormWithZod() {

    const schema = z.object({
        email: z.email("Input valid email"),
        password: z.string().min(8, "At least 8 chatacters"),
        isAdmin: z.boolean().optional(),
        age: z.number().optional()
    })
    .refine(
        (data) => !(data.isAdmin && (data.age == null || data.age == undefined)),
        // (data) => !data.isAdmin || data.age != null,
        {
            message: "Age is requierd for admins",
            path: ["age"]
        }
    )

    type FormFields = z.infer<typeof schema>;

    const { register, handleSubmit, formState: { errors, isSubmitting }, watch, trigger } = useForm<FormFields>({
        defaultValues: {
            email: "a@a.a",
            isAdmin: false
        },
        resolver: zodResolver(schema)
    })

    // useEffect(() => {
    //     const subscription = watch(() => {
    //         trigger();
    //     });
    //     return () => subscription.unsubscribe();
    // }, [watch]);

    const submit: SubmitHandler<FormFields> = async (data) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log(data);
    }

    return (
        <>
            <h3>React Hook Form (Zod)</h3>

            <form onSubmit={handleSubmit(submit)}>
                <input
                    {...register("email")}
                    type="text"
                    placeholder="email"
                />
                {errors.email && (
                    <span>{errors.email.message}</span>
                )}

                <input
                    {...register("password")}
                    type="password"
                    placeholder="password"
                />
                {errors.password && (
                    <span>{errors.password.message}</span>
                )}

                <input
                    {...register("isAdmin")} 
                    type="checkbox" 
                />

                <input
                    {...register("age", { 
                        setValueAs: (value) => value === "" ? undefined : Number(value)
                     })} 
                    type="number" 
                />
                {errors.age && (
                    <span>{errors.age.message}</span>
                )}

                <button disabled={isSubmitting} type="submit">
                    {isSubmitting ? 'Loading' : 'Submit'}
                </button>
            </form>
        </>
    )

}