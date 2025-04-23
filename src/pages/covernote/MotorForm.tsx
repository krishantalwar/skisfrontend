import { useEffect, useMemo, useState, useCallback } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useDebounce } from 'react-use';

import CovernoteFields from '@covernoteField/CovernoteFields';
import PolicyDetailsFields from '@covernoteField/PolicyAndInsuredDetailsFields';
import AgentSelectionFields from '@covernoteField/AgentSelectionFields';
// import { FileUpload } from '@formFields/FileUpload';
import { Button } from '@/components/ui/button';
import { Form } from "@/components/ui/form";
import { FormInput } from '@formFields/FormInput';
import { FormSelect } from '@formFields/FormSelect';
// import { DatePickerField } from '@formFields/DatePickerField';
import * as yup from "yup"
// import { MultiSelect } from '@/components/ui/multi-select';
import { FormMultiSelect } from '@formFields/FormMultiSelect';
import { FormTextArea } from '@formFields/FormTextArea';

// Assuming `useCovernoteExitsQuery` is a custom hook or an API query
import {
  useCovernoteExitsQuery,
  useMotorInsertMutation
} from "@/features/covernote/service";

import { yupResolver } from "@hookform/resolvers/yup";

import { showMessage } from "@/features/ui/globalMessageSlice"
import { showLoader ,hideLoader} from "@/features/ui/LoaderOverlaySlice"
import { useAppDispatch } from "@/hooks/hooks";


// API call to fetch application details (already being handled by the query hook)
const DEFAULT_VALUES = {
  covernote: undefined, // Provide an empty string as the default for a required string
  covernote_type: 1, // Keep undefined for now, but consider a default number if appropriate
  start_date: undefined,
  end_date: undefined,
  issue_date: undefined,
  pno: undefined, // Provide an empty string
  name: undefined, // Provide an empty string
  address: undefined, // Provide an empty string
  phone: undefined, // Provide an empty string
  company_id: undefined, // Keep undefined for now, but consider a default number
  agent_id: undefined,   // Keep undefined for now, but consider a default number
  coverage_type: undefined,
  product_type: undefined,
  policy_type: 1,
  veh_no: undefined, // Provide an empty string
  model: undefined, // Provide an empty string
  make: undefined, // Provide an empty string
  yom: new Date().getFullYear(),
  cubic_cap: undefined,
  dec_value: undefined,
  basic: undefined,
  ncb: undefined,
  pa: undefined,
  da: undefined,
  act: undefined,
  gst: undefined,
  final_amt: undefined,
  total: undefined,
  // add_on: [],
  add_on: yup.array().of(yup.string()).nullable(), // Or yup.number() if your values are numbers

  policy_info: undefined,
  see_status: false,
  status: true,
  paymentmode: undefined,
  file: undefined,
  recivedpayment: undefined,
};



const coverageTypeOptions=[
  { label: 'Standalone OD', value: 1 },
  { label: 'Standalone TP', value: 2 },
  { label: 'Fully Policy', value: 3 },
]
const NcbOptions = [
  { label: '0%', value: 0 },
  { label: '20%', value: 20 },
  { label: '25%', value: 25 },
  { label: '35%', value: 35 },
  { label: '45%', value: 45 },
  { label: '50%', value: 50 },

];

const paymentModes = [
  { label: 'Customer Cheque / Cash', value: 1 },
  { label: 'Customer Online Payment', value: 2 },
  { label: 'SKIS Check', value: 3 },
  { label: 'SKIS Cash', value: 4 },
  { label: 'SKIS Online', value: 5 },
  { label: 'SKIS Cc', value: 6 },

];


const addONOptions = [
  { label: 'DEPRICIATION COVER', value: "DEPRICIATION COVER" },
  { label: 'CONSUMABLES', value: "CONSUMABLES" },
  { label: 'ENGINE PROTECT', value: "ENGINE PROTECT" },
  { label: 'TYRE PROTECT', value: "TYRE PROTECT" },
  { label: 'KEY PROTECT', value: "KEY PROTECT" },
  { label: 'RTI', value: "RTI" },
  { label: 'RSA', value: "RSA" },
  { label: 'LOPB', value: "LOPB" },
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

  coverage_type: yup.number()
    .required('Coverage type is required')
    .integer('Coverage type must be an integer')
    .positive('Coverage type must be a positive number'),


  product_type: yup.number()
    .required('Product type is required')
    .integer('Product type must be an integer')
    .positive('Product type must be a positive number'),


  policy_type: yup.number()
    .required('Policy type is required')
    .integer('Policy type must be an integer')
    .positive('Policy type must be a positive number'),

  veh_no: yup.string()
    .required('Vehicle number is required')
    .max(20, 'Vehicle number cannot exceed 20 characters'),

  model: yup.string()
    .required('Model is required')
    .max(100, 'Model cannot exceed 100 characters'),

  make: yup.string()
    .required('Make is required')
    .max(100, 'Make cannot exceed 100 characters'),

  yom: yup.number()
    .required('Year of manufacture is required')
    .integer('Year must be a valid integer')
    .min(1900, 'Year must be after 1900')
    .max(new Date().getFullYear(), `Year must be at or before the current year`),

  cubic_cap: yup.number()
    .required('Cubic capacity is required')
    .min(0, 'Cubic capacity cannot be negative'),

  dec_value: yup.number()
    .required('Declared value is required')
    .min(0, 'Declared value cannot be negative'),

  basic: yup.number()
    .required('Basic value is required')
    .min(0, 'Basic value cannot be negative'),

  ncb: yup.number()
    .required('NCB value is required')
    .min(0, 'NCB cannot be negative')
    .max(100, 'NCB cannot exceed 100'),

  pa: yup.number()
    .required('Personal accident value is required')
    .min(0, 'Personal accident value cannot be negative'),

  da: yup.number()
    .required('Damage assessment value is required')
    .min(0, 'Damage assessment value cannot be negative'),

  act: yup.number()
    .required('Act value is required')
    .min(0, 'Act value cannot be negative'),

  gst: yup.number()
    .required('GST value is required')
    .min(0, 'GST value cannot be negative'),

  final_amt: yup.number()
    .required('Final amount is required')
    .min(0, 'Final amount cannot be negative'),

  add_on: yup.array().nullable(), // Handling nullable array

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

//   const useYupValidationResolver = (validationSchema) =>
//     useCallback(
//       async (data) => {
//         try {
//           const values = await validationSchema.validate(data, {
//             abortEarly: false,
//           })

//           return {
//             values,
//             errors: {},
//           }
//         } catch (errors) {
//           return {
//             values: {},
//             errors: errors.inner.reduce(
//               (allErrors, currentError) => ({
//                 ...allErrors,
//                 [currentError.path]: {
//                   type: currentError.type ?? "validation",
//                   message: currentError.message,
//                 },
//               }),
//               {}
//             ),
//           }
//         }
//       },
//       [validationSchema]
//     )
import { useProductQuery } from '@/features/gloabelService';
import { setApiFieldErrors } from '@/lib/setApiFieldErrors'


const LicForm = () => {
  const dispatch = useAppDispatch();
  // const resolver = useYupValidationResolver(validationSchema).
  const methods = useForm({
    defaultValues: DEFAULT_VALUES,
    resolver: yupResolver(validationSchema),
     mode: "onChange",
  });
  const { data: Product = [], error: ProductError, isLoading: ProductIsLoading } = useProductQuery(1)



  const { control, handleSubmit, getValues, setValue,formState: { errors },setError } = methods;
  // Calculate total based on net premium and GST
  const basic = useWatch({ control, name: 'basic' });
  const pa = useWatch({ control, name: 'pa' });
  const da = useWatch({ control, name: 'da' });
  const act = useWatch({ control, name: 'act' });
  const gst = useWatch({ control, name: 'gst' });

  // const policy_info = useWatch({ control, name: 'policy_info' });

  const totalAmount = useMemo(() => {
    const total = parseFloat(basic || "0") +
      parseFloat(gst || '0') + parseFloat(pa || '0') +
      parseFloat(da || '0') + parseFloat(act || '0')
    return total;
  }, [basic, gst, pa, da, act]);

  useEffect(() => {
    if (totalAmount !== getValues('total')) {
      setValue('final_amt', totalAmount);
      setValue('total', totalAmount);
    }
  }, [totalAmount]);



  const [
    MotorInsert,
    {
      // currentData,
      isFetching,
      isLoading,
      isSuccess,
      isError,
      error,
      status,
    },
  ] = useMotorInsertMutation();

  // Form submission logic (as per your earlier example)
  const onSubmit = async (data: any) => {
    console.log("Submitting:", data);
    // Handle the submission logic (like calling API, etc.)
    try {
      await MotorInsert(data).unwrap()
      dispatch(showMessage({
        type: "success",
        title: "Insert",
        description: "Covernote Insert Sucessfully",
        show: true,
      }))
      dispatch(showLoader({
        isLoading:true
      }))
    } catch (error) {
      setApiFieldErrors(error, setError) // ✅ reusable error handler
      dispatch(hideLoader())
    }
  };


  return (
    <Form {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* Covernote, Policy, and Agent Fields */}
        <CovernoteFields control={control} />
        <PolicyDetailsFields control={control} />
        <AgentSelectionFields control={control} productOptions={Product} />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <FormSelect name="coverage_type" label="Coverage Type" control={control} options={coverageTypeOptions} />


          <FormInput name="veh_no" label="Veh.No" placeholder='Veh.No' control={control} />
          <FormInput name="make" label="Make" placeholder='Make' control={control} />
          <FormInput name="model" label="Model" placeholder='Model' control={control} />

          <FormInput name="yom" label="Year Of Manufacture" placeholder='Year Of Manufacture' control={control} type="number" />
          <FormInput name="cubic_cap" label="Cubic Cap" control={control} type="number" />
          <FormInput name="dec_value" label="I.D.V" control={control} type="number" />
          <FormInput name="basic" label="Basic" control={control} type="number" />

          <FormSelect name="ncb" label="NCB" control={control} options={NcbOptions} />

          <FormInput name="pa" label="PA" placeholder='PA' control={control} type="number" />
          <FormInput name="da" label="PAid Driver" placeholder='PAid Driver' control={control} type="number" />
          <FormInput name="act" label="Third Party" placeholder='Third Party' control={control} type="number" />
          <FormInput name="gst" label="GST" control={control} type="number" />

          <FormInput name="total" label="Final Amount" control={control}  disabled={true} type="number" />
          
          <FormSelect name="paymentmode" label="Payment Method" control={control} options={paymentModes} />

          <FormInput name="recivedpayment" label="Payment Received" control={control} type="number" />


          <FormMultiSelect
            control={control}
            name="add_on"
            label="Add on"
            options={addONOptions}
            animation={0.4}
            maxCount={2}
          />

          <FormInput name="file" label="File" control={control} type="file" />
          {/* <FormMultiSelect name="add_on" label="Add on" control={control} options={paymentModes}  /> */}

        </div>

        <div className="grid  gap-4">


          <FormTextArea 
          control={control} 
          name='policy_info'
            label='Policy Info'
            placeholder='Policy Info'
          />
        </div>
        {/* 
        <FileUpload
          name="upload"
          control={control}
          label="Upload Files"
          multiple
          accept={['image/*', 'application/pdf']}
          maxFileSize={10 * 1024 * 1024}
          maxFiles={3}
          showProgress
          showThumbnails
        /> */}

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default LicForm;
