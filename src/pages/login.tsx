import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion } from "framer-motion"
import { Eye, EyeOff } from "lucide-react"
import {useLoginMutation} from '@/features/auth/service'
import {useGetFinancialYearQuery} from '@/features/financialYear/service'
import { useForm, useWatch } from 'react-hook-form';
import {FormSelect} from '@formFields/FormSelect'
import { Form } from "@/components/ui/form";

import {FormInput} from '@formFields/FormInput'
import {setApiFieldErrors} from '@/lib/setApiFieldErrors'


export default function LoginForm() {
    const methods = useForm({ 
      defaultValues:{
        password:"",
        phone:"",
        financial_year:""
      }
     });
    const { control, handleSubmit, getValues, setValue,setError  } = methods;
    const [showPassword, setShowPassword] = useState(false)
    
    const { data=[], error:FinancialYearError, isLoading:FinancialYearIsLoading } = useGetFinancialYearQuery()
  const [
    updatePost,
    {
      // currentData,
      isFetching,
      isLoading,
      isSuccess,
      isError,
      error,
      status,
    },
  ] = useLoginMutation();

  const onSubmit = async (data: any) => {
    console.log("Submitting:", data);
    try {
      await updatePost(data).unwrap()
    } catch (error) {
      setApiFieldErrors(error, setError) // ✅ reusable error handler
    }
    // Handle the submission logic (like calling API, etc.)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-card shadow-xl rounded-2xl p-8 space-y-6 border"
      >
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-bold">Welcome Back</h2>
          <p className="text-muted-foreground">Login to your account</p>
        </div>

    <Form {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
       
        <div className="space-y-4">
          <div className="space-y-2">
            <FormSelect name="financial_year" label="Financial Year" placeholder="Financial Year" control={control} options={data}/>
          </div>

          <div className="space-y-2">
            <FormInput control={control}label="Phone"name="phone"placeholder="Phone" />

          </div>

          <div className="space-y-2">
            <div className="relative">
              <FormInput type={showPassword ? "text" : "password"} control={control}label="password"name="password"placeholder="••••••••" />
              <button
                type="button"
                onClick={() => setShowPassword(prev => !prev)}
                className="absolute right-2 top-1/2 -translate-y-1/0 text-muted-foreground"
                // className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <Button className="w-full">Sign In</Button>
        </div>
        </form>
        </Form>
        <p className="text-sm text-center text-muted-foreground">
          Don’t have an account? 
          {/* <a href="#" className="underline">Sign up</a> */}
        </p>
      </motion.div>
    </div>
  )
}