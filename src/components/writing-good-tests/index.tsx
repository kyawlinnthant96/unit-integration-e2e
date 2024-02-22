import {useForm} from "react-hook-form";
import * as z from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import {useState} from "react";

const validationSchema = z.object({
    inputOne: z.number(),
    inputTwo: z.number()
})

function WritingGoodTest() {
    const [operationValue, setOperationValue] = useState(0)
    const {handleSubmit, formState: {errors}, register} = useForm<z.infer<typeof validationSchema>>({
        resolver: zodResolver(validationSchema),
        defaultValues: {
            inputOne: 0,
            inputTwo: 0
        }
    })

    const submitHandler = (data: z.infer<typeof validationSchema>) => {
        setOperationValue(data.inputOne + data.inputTwo)
        console.log(data)
    }

    return (
        <div className="w-full min-h-screen flex justify-center">
            <div className="my-4">
                <form onSubmit={handleSubmit(submitHandler)}>
                    <div className="relative flex flex-col gap-2">
                        <label>Input One</label>
                        <input className="p-2 rounded-md bg-slate-200 text-black" {...register('inputOne', {
                            valueAsNumber: true
                        })}
                        />
                        {errors.inputOne && (
                            <span className="text-red-500 text-sm">{errors.inputOne.message}</span>
                        )}
                    </div>
                    <div className="relative flex flex-col gap-2">
                        <label>Input Two</label>
                        <input className="p-2 rounded-md bg-slate-200 text-black" {...register('inputTwo', {
                            valueAsNumber: true
                        })}
                        />
                        {errors.inputTwo && (
                            <span className="text-red-500 text-sm">{errors.inputTwo.message}</span>
                        )}
                    </div>
                    <button type="submit"
                            className="mt-4 bg-blue-500 text-white font-semibold text-md w-full p-2 rounded-md">
                        Submit
                    </button>
                </form>

                <div className="mt-4 underline">result: {operationValue}</div>
            </div>
        </div>
    );
}

export default WritingGoodTest;