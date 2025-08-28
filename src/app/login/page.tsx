'use client'
import GoogleIcon from "@/assets/icons/google";
import Button from "@/components/button/button";
import Input from "@/components/input/input";
import { AuthContext } from "@/context/authContext";
import { loginSchema } from "@/schema/auth";
import { Envelope, LockKey, Spinner } from "@phosphor-icons/react";
import { Formik } from "formik";
import Link from "next/link";
import { useContext } from "react";

export default function Loginpage() {
    const { signIn, socialSignIn, loading } = useContext(AuthContext)
    
    return (
        <div className="flex absolute top-0 left-0 w-full h-full bg-white dark:bg-dark z-[50]">
            <div className="w-[55%] h-full bg-cover bg-center bg-radial-[at_50%_75%] from-fuchsia-800 to-primary to-90%"></div>

            <div className="min-h-[400px] flex pt-4 md:px-[12%] sm:items-center justify-between">

                <div className="flex w-full">
                    <div className="sm:w-[500px] mx-auto w-full p-12">
                        
                        <div className="flex flex-col gap-6 md:p-[5%] p-2">
                            <div>
                                <h1 className="font-medium text-[20px]">Sign in</h1>
                                <p className="mt-2 mb-3">Sign in with your credentials to get back into the app</p>
                            </div>

                            <Button size="md" onClick={() => socialSignIn("Google")} className="w-full gap-2"><GoogleIcon width={16} /> Signin with Google</Button>

                            <p>OR</p>

                            <Formik
                                initialValues={{ email: '', password: ''}}
                                validationSchema={loginSchema}
                                onSubmit={( values, { setSubmitting }) => {
                                    signIn(values.email, values.password);
                                    setSubmitting(false);
                                }}
                                >
                                {({
                                    values,
                                    errors,
                                    touched,
                                    handleChange,
                                    handleSubmit,
                                    isSubmitting,
                                }) => (

                                    <form onSubmit={handleSubmit} className="flex flex-col w-full gap-6 ">
                                        
                                        <Input name="email" label="" value={values.email} onChange={handleChange} type="email" error={touched.email ? errors.email : ""} placeholder="Email Address" leftIcon={<Envelope size={16}/>}/>

                                        <Input name="password" label="" value={values.password} onChange={handleChange} type={"password"} error={touched.password ? errors.password : ""} placeholder="Password" leftIcon={<LockKey size={16}/>}/>

                                        <Button size="md" className="bg-primary w-full">{ (isSubmitting || loading) ? <Spinner size={16} className="animate-spin" /> : "Login"}</Button>

                                    </form>
                                )}
                            </Formik>
                            
                            <p className="text-center">Don&apos;t have an account? <Link href={"/register"} className="text-primary">Create account</Link></p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
