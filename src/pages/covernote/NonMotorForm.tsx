import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import CovernoteFields from '@covernoteField/CovernoteFields';
import PolicyDetailsFields from '@covernoteField/PolicyAndInsuredDetailsFields';
import AgentSelectionFields from '@covernoteField/AgentSelectionFields';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { FormInput } from '@formFields/FormInput';
import { FormSelect } from '@formFields/FormSelect';
import { FormTextArea } from '@formFields/FormTextArea';

import { useProductQuery } from '@/features/gloabelService';
import { useAppDispatch } from '@/hooks/hooks';
import {
    useCovernoteExitsQuery,
    // useMotorInsertMutation,
    useNonMotorInsertMutation
  } from "@/features/covernote/service";
  
import { setApiFieldErrors } from '@/lib/setApiFieldErrors'

import { showLoader ,hideLoader} from "@/features/ui/LoaderOverlaySlice"
import { showMessage } from "../../features/ui/globalMessageSlice"
// --- Types ---
interface FormData {
  covernote: string;
  covernote_type: number;
  start_date: string | Date;
  end_date: string | Date;
  issue_date: string | Date;
  pno: string;
  name: string;
  address: string;
  phone: string;
  company_id: number;
  agent_id: number;
  product_type: number;
  policy_type: number;
  si: number;
  basic: number;
  gst: number;
  gst_amount: number;
  total: number;
  final_amt: number;
  policy_info?: string;
  see_status: boolean;
  status: boolean;
  paymentmode: number;
  file?: FileList;
  remark?: string;
  recivedpayment: number;
}

// --- Constants ---
// const DEFAULT_VALUES: Partial<FormData> = {
//   covernote_type: 1,
//   policy_type: 2,
//   see_status: false,
//   status: true,
// };

const DEFAULT_VALUES: Partial<FormData> = {
    covernote: undefined,
    covernote_type: 2,
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
    policy_type: 2,
    remark: undefined,
    si: undefined,
    basic: undefined,
    gst: undefined,
    gst_amount: undefined,
    total: undefined,
    final_amt: undefined,
    policy_info: undefined,
    see_status: false,
    status: true,
    paymentmode: undefined,
    file: undefined,
    recivedpayment: undefined,
  };
  

const paymentModes = [
  { label: 'Customer Cheque / Cash', value: 1 },
  { label: 'Customer Online Payment', value: 2 },
  { label: 'SKIS Check', value: 3 },
  { label: 'SKIS Cash', value: 4 },
  { label: 'SKIS Online', value: 5 },
  { label: 'SKIS Cc', value: 6 },
];

// const schema = yup.object({
//   covernote: yup.string().required().max(255),
//   covernote_type: yup.number().required().positive().integer(),
//   start_date: yup.date().required(),
//   end_date: yup.date().required().min(yup.ref('start_date')),
//   issue_date: yup.date().required(),
//   pno: yup.string().required().max(50),
//   name: yup.string().required().max(255),
//   address: yup.string().required().max(500),
//   phone: yup.string().required().matches(/^[0-9]{10,15}$/),
//   company_id: yup.number().required().positive().integer(),
//   agent_id: yup.number().required().positive().integer(),
//   product_type: yup.number().required().positive().integer(),
//   policy_type: yup.number().required().positive().integer(),
//   basic: yup.number().required().min(0),
//   gst: yup.number().required().min(0),
//   gst_amount: yup.number().required().min(0),
//   final_amt: yup.number().required().min(0),
//   total: yup.number().required().min(0),
//   policy_info: yup.string().nullable().max(255),
//   see_status: yup.boolean().required(),
//   status: yup.boolean().required(),
//   paymentmode: yup.number().required().positive().integer(),
//   file: yup.mixed().nullable(),
//   remark: yup.string().nullable(),
//   recivedpayment: yup.number().required().integer(),
// });

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

  basic: yup.number()
    .required('Basic value is required')
    .min(0, 'Basic value cannot be negative'),


  gst: yup.number()
    .required('GST value is required')
    .min(0, 'GST value cannot be negative'),

    gst_amount: yup.number()
    .required('GST value is required')
    .min(0, 'GST value cannot be negative'),


  final_amt: yup.number()
    .required('Final amount is required')
    .min(0, 'Final amount cannot be negative'),

    remark: yup.string()
    .nullable()
    .max(255, 'Remark information cannot exceed 255 characters'),


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

// --- Component ---
const MotorForm = () => {
  const dispatch = useAppDispatch();
  const methods = useForm<FormData>({
    defaultValues: DEFAULT_VALUES,
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  const { control, handleSubmit, getValues, setValue,setError,reset } = methods;
  const basic = useWatch({ control, name: 'basic' });
  const gst = useWatch({ control, name: 'gst' });

  const { data: Product = [] } = useProductQuery(2);

  useEffect(() => {
    const parsedBasic = parseFloat(basic || '0');
    const parsedGst = parseFloat(gst || '0');
    const gstAmount = (parsedBasic * parsedGst) / 100;
    const total = parsedBasic + gstAmount;

    if (total !== getValues('total')) {
      setValue('gst_amount', gstAmount);
      setValue('total', total);
      setValue('final_amt', total);
    }
  }, [basic, gst]);

//   const formatDate = (value: Date | string | undefined): string | undefined => {
//     return value ? new Date(value).toISOString().split('T')[0] : undefined;
//   };


const [
    NonMotorInsert,
    {
      // currentData,
      
      isLoading,
      isSuccess,
      isError,
      error,
      status,
    },
  ] = useNonMotorInsertMutation();


    const onSubmit = async (data: any) => {
      // console.log("Submitting:", data);
      // Handle the submission logic (like calling API, etc.)
            dispatch(showLoader({
                          isLoading:true
                        }));
      try {
        await NonMotorInsert(data).unwrap()
            dispatch(hideLoader())
        dispatch(showMessage({
          type: "success",
          title: "Insert",
          description: "Covernote Insert Sucessfully",
          show: true,
        }))
        reset(DEFAULT_VALUES)
      } catch (error) {
        setApiFieldErrors(error, setError) // ✅ reusable error handler
      }
    };

  return (
    <Form {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <CovernoteFields control={control} />
        <PolicyDetailsFields control={control} />
        <AgentSelectionFields control={control} productOptions={Product} />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <FormInput name="si" label="SI" control={control} type="number" />
          <FormInput name="basic" label="Basic" control={control} type="number" />
          <FormInput name="gst" label="GST" control={control} type="number" />
        </div>

        <FormTextArea control={control} name="remark" label="Remark" placeholder="Remark" />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <FormInput name="gst_amount" label="GST Amount" control={control} type="number" />
          <FormInput name="total" label="Final Amount" disabled={true} control={control} type="number" disabled />
          <FormSelect name="paymentmode" label="Payment Mode" control={control} options={paymentModes} />
          <FormInput name="recivedpayment" label="Payment Received" control={control} type="number" />
        </div>

        <FormTextArea control={control} name="policy_info" label="Policy Info" placeholder="Policy Info" />
        <FormInput name="file" label="File" control={control} type="file" />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default MotorForm;
