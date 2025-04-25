import { useEffect,useMemo } from 'react'
import { useForm ,useWatch } from 'react-hook-form'

import CovernoteFields from '@covernoteField/CovernoteFields'
import PolicyDetailsFields from '@covernoteField/PolicyAndInsuredDetailsFields'
import AgentSelectionFields from '@covernoteField/AgentSelectionFields'
import { FileUpload } from '@formFields/FileUpload'
import { Button } from '@/components/ui/button'
import { Form } from "@/components/ui/form"
import { FormInput } from '@formFields/FormInput'
import { FormSelect } from '@formFields/FormSelect'
import { DatePickerField } from '@formFields/DatePickerField'

// import { useAddMonthsToDate } from '@/hooks/hooks'


import { useProductQuery } from '@/features/gloabelService';
import { useAppDispatch } from '@/hooks/hooks';
import {
    useCovernoteExitsQuery,
    useLicInsertMutation
  } from "@/features/covernote/service";
  
import { setApiFieldErrors } from '@/lib/setApiFieldErrors'

import { showMessage } from "../../features/ui/globalMessageSlice"
import { showLoader,hideLoader } from "../../features/ui/LoaderOverlaySlice"
import * as yup from 'yup';
import { FormTextArea } from '@formFields/FormTextArea';
import { yupResolver } from '@hookform/resolvers/yup';


const DEFAULT_VALUES = {
    covernote: undefined,
    covernote_type: 4,
    start_date: undefined,
    end_date: undefined,
    issue_date: undefined,
    pno: undefined,
    name: undefined,
    address: undefined,
    phone: undefined,
    company_id: undefined,
    agent_id: undefined,
    product_type: undefined,
    policy_type: 4,
    remark: undefined,
    si: undefined,
    net_premium: undefined,
    gst: undefined,
    // gst_amount: undefined,
    total: undefined,
    final_amt: undefined,
    policy_info: undefined,
    see_status: false,
    status: true,
    paymentmode: undefined,
    file: undefined,
    recivedpayment: undefined,
    pre_payment_mode:undefined,
    pre_exp_date:undefined,

    dob:undefined
  };
  

  const paymentModes = [
    { label: 'Customer Cash', value: 1 },
    { label: 'Customer Online Payment', value: 2 },
    { label: 'SKIS Check', value: 3 },
    { label: 'SKIS Cash', value: 4 },
    { label: 'SKIS Online', value: 5 },
    { label: 'SKIS Cc', value: 6 }
  ];



const PremiumPaymentMode = [
  { label: 'Year', value: 12 },
  { label: 'Half-Yearly', value: 6 },
  { label: 'Quarterly', value: 3 },
  { label: 'Monthly', value: 1 },
];
const validationSchema = yup.object({
  covernote: yup.string()
    .required('Covernote is required')
    .max(255, 'Covernote cannot exceed 255 characters'),

  covernote_type: yup.number()
    .required('Covernote type is required')
    .integer('Covernote type must be a number')
    .positive('Covernote type must be a positive number'),

  start_date: yup.date().required('Start date is required'),

  end_date: yup.date()
    .required('End date is required')
    .min(yup.ref('start_date'), 'End date must be after or equal to start date'),

  issue_date: yup.date().required('Issue date is required'),
  dob: yup.date().required('DOB date is required'),

  // create_date: yup.date().required('Create date is required'),

  pno: yup.string()
    .required('Policy number is required')
    .max(50, 'Policy number cannot exceed 50 characters'),

  name: yup.string()
    .required('Name is required')
    .max(255, 'Name cannot exceed 255 characters'),

  address: yup.string()
    .required('Address is required')
    .max(500, 'Address cannot exceed 500 characters'),

  phone: yup.string()
    .required('Phone number is required')
    .matches(/^[0-9]{10,15}$/, 'Phone number must be between 10 and 15 digits'),

  company_id: yup.number()
    .required('Company ID is required')
    .integer('Company ID must be an integer')
    .positive('Company ID must be a positive integer'),

  agent_id: yup.number()
    .required('Agent ID is required')
    .integer('Agent ID must be an integer')
    .positive('Agent ID must be a positive integer'),


  product_type: yup.number()
    .required('Product type is required')
    .integer('Product type must be an integer')
    .positive('Product type must be a positive number'),


  policy_type: yup.number()
    .required('Policy type is required')
    .integer('Policy type must be an integer')
    .positive('Policy type must be a positive number'),

    pre_payment_mode: yup.number()
    .required('Policy type is required')
    .integer('Policy type must be an integer')
    .positive('Policy type must be a positive number'),
    
    pre_exp_date:yup.date()
    .required('pre_exp_date date is required')
    .min(yup.ref('start_date'), 'Pre Exp date must be after or equal to start date'),



  gst: yup.number()
    .required('GST value is required')
    .min(0, 'GST value cannot be negative'),


  final_amt: yup.number()
    .required('Final amount is required')
    .min(0, 'Final amount cannot be negative'),



  policy_info: yup.string()
    .nullable()
    .max(255, 'Policy information cannot exceed 255 characters'),

  see_status: yup.boolean().required('See status is required'),

  status: yup.boolean().required('Status is required'),

  paymentmode: yup.number()
    .required('Payment mode is required')
    .integer('Payment mode must be an integer')
    .positive('Payment mode must be a positive number'),

  file: yup.mixed()
    .nullable(),

  recivedpayment: yup.number().required('Received payment is required').integer('Received payment must be an integer'),
});

const LicForm = () => {
    const dispatch = useAppDispatch();
    const methods = useForm({
        defaultValues: DEFAULT_VALUES,
            resolver: yupResolver(validationSchema),
            mode: 'onChange',     
    })
    const { data: Product = [] } = useProductQuery(4);


    const { control, handleSubmit , getValues,setValue,setError,reset} = methods
    const net_premium = useWatch({ control, name: "net_premium" })
    const gst = useWatch({ control, name: "gst" })
    const start_date = useWatch({ control, name: "start_date" })
    const premium_payment_mode = useWatch({ control, name: "pre_payment_mode" })

    const [
        LicInsert,
        {
          // currentData,
          isFetching,
          isLoading,
          isSuccess,
          isError,
          error,
          status,
        },
      ] = useLicInsertMutation();
    
    const onSubmit = async (data: any) => {
        console.log(data)
        // Call API here
        dispatch(showLoader({
          isLoading:true
        }));
        try {
            await LicInsert(data).unwrap()
            dispatch(hideLoader());
            dispatch(showMessage({
              type: "success",
              title: "Insert",
              description: "Covernote Insert Sucessfully",
              show: true,
            }))
            reset(DEFAULT_VALUES)
        } catch (error) {
          dispatch(hideLoader());
          setApiFieldErrors(error, setError) // ✅ reusable error handler
        
        }
    }

    
  const paymentReceived = useMemo(() => {
    const total = (parseFloat(net_premium || "0") + parseFloat(gst || "0"))
    return total;
  }, [net_premium,gst ]);
    
    useEffect(() => {
        if (paymentReceived !== getValues('total')) {
        setValue("total", paymentReceived)
        setValue("final_amt", paymentReceived)
    }
    }, [paymentReceived])


    const premium_expiry_date = useMemo(() => {
        if (!start_date || !premium_payment_mode) return;
      console.log(start_date)

        const newDate = new Date(start_date)
         newDate.setMonth(newDate.getMonth() + premium_payment_mode) // hardcoded for now
         
        // const options = { day: 'numeric', month: 'long', year: 'numeric' };
        const formattedDate =  newDate.toLocaleDateString('en-US', {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        });
      return formattedDate
    }, [start_date,premium_payment_mode ]);
    
    useEffect(() => {

        if (premium_expiry_date !== getValues('pre_exp_date')) {
            setValue("pre_exp_date",premium_expiry_date) // e.g., 2024-05-01
        }
        
      }, [premium_expiry_date])


    return (
        <Form {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <CovernoteFields control={control} />
                <PolicyDetailsFields control={control} />
                <AgentSelectionFields control={control} productOptions={Product}/>
               
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <DatePickerField name="dob" label="Date of Birth" control={control} />

                    <FormSelect name="pre_payment_mode" label="Premium Payment Mode" control={control} options={PremiumPaymentMode} />
                
                    <FormInput name="pre_exp_date" label="Premium Expiry Date" control={control} placeholder="Premium Expiry Date"  />
                  

                    <FormInput name="si" label="SI" control={control} placeholder="SI" type="number" />
                    <FormInput name="net_premium" label="Net Premium" control={control} placeholder="Net Premium" type="number" />   
                    <FormInput name="gst" label="GST" control={control} placeholder="GST"   type="number"/>
                
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                
                    <FormInput name="total" label="Final Amount" control={control} placeholder="Final Amount" type="number" />
                
                    <FormSelect name="paymentmode" label="Payment Method" control={control} options={paymentModes} />
                

                    <FormInput name="recivedpayment" label="Payment Received" control={control} placeholder="Payment Received" type="number" />

          <FormInput name="file" label="File" control={control} type="file" />

                </div>

  <div className="grid  gap-4">


          <FormTextArea 
          control={control} 
          name='policy_info'
            label='Policy Info'
            placeholder='Policy Info'
          />
        </div>
                
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}

export default LicForm
