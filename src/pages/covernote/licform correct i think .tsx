import { useEffect, useMemo, useState ,useCallback} from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useDebounce } from 'react-use';

import CovernoteFields from '@covernoteField/CovernoteFields';
import PolicyDetailsFields from '@covernoteField/PolicyAndInsuredDetailsFields';
import AgentSelectionFields from '@covernoteField/AgentSelectionFields';
import { FileUpload } from '@formFields/FileUpload';
import { Button } from '@/components/ui/button';
import { Form } from "@/components/ui/form";
import { FormInput } from '@formFields/FormInput';
import { FormSelect } from '@formFields/FormSelect';
import { DatePickerField } from '@formFields/DatePickerField';
import * as yup from "yup"

// Assuming `useFetchApplicationDetailByidQuery` is a custom hook or an API query
// import { useFetchApplicationDetailByidQuery } from '@/services/api'; // Adjust import based on actual location

import {
    // useFetchApplicationDetailByidQuery,
  } from "@/features/covernote/service";
  
  import { yupResolver } from "@hookform/resolvers/yup";

// API call to fetch application details (already being handled by the query hook)
const DEFAULT_VALUES = {
  covernote: '',
  issue_date: '',
  start_date: '',
  end_date: '',
  policy_no: '',
  insured_name: '',
  insured_address: '',
  insured_mobile_no: '',
  company: '',
  product_type: '',
  dob: '',
  premium_payment_mode: null,
  premium_expiry_date: '',
  si: '',
  net_premium: '',
  gst: '',
  total: '',
  payment_method: '',
  payment_received: '',
  upload: [],
};

const paymentModes = [
  { label: 'Monthly', value: 'monthly' },
  { label: 'Quarterly', value: 'quarterly' },
  { label: 'Yearly', value: 'yearly' },
];


const validationSchema = yup.object({
  covernote: yup.string()
    .required('Covernote is required')
    .max(255, 'Covernote cannot exceed 255 characters'),

  covernote_type: yup.number()
    .required('Covernote type is required')
    .integer('Covernote type must be a number')
    .positive('Covernote type must be a positive number'),
    // .test(
    //   'exists',
    //   'Covernote type must exist in the type table',
    //   async (value) => {
    //     // Customize for your "exists" check, typically an API call
    //     return await checkIfExistsInTypeTable(value);
    //   }
    // ),

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
    // .test(
    //   'exists',
    //   'Company must exist in the company table',
    //   async (value) => {
    //     // Customize for your "exists" check, typically an API call
    //     return await checkIfExistsInCompanyTable(value);
    //   }
    // ),

  agent_id: yup.number()
    .required('Agent ID is required')
    .integer('Agent ID must be an integer')
    .positive('Agent ID must be a positive integer'),
    // .test(
    //   'exists',
    //   'Agent must exist in the users table',
    //   async (value) => {
    //     // Customize for your "exists" check, typically an API call
    //     return await checkIfExistsInUsersTable(value);
    //   }
    // ),

  coverage_type: yup.number()
    .required('Coverage type is required')
    .integer('Coverage type must be an integer')
    .positive('Coverage type must be a positive number'),
    // .test(
    //   'exists',
    //   'Coverage type must exist in the coverage_type table',
    //   async (value) => {
    //     return await checkIfExistsInCoverageTypeTable(value);
    //   }
    // ),

  product_type: yup.number()
    .required('Product type is required')
    .integer('Product type must be an integer')
    .positive('Product type must be a positive number'),
    // .test(
    //   'exists',
    //   'Product type must exist in the products table',
    //   async (value) => {
    //     return await checkIfExistsInProductsTable(value);
    //   }
    // ),

  policy_type: yup.number()
    .required('Policy type is required')
    .integer('Policy type must be an integer')
    .positive('Policy type must be a positive number'),
    // .test(
    //   'exists',
    //   'Policy type must exist in the type table',
    //   async (value) => {
    //     return await checkIfExistsInTypeTable(value);
    //   }
    // ),

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
    // .test(
    //   'exists',
    //   'Payment mode must exist in the payment_mode table',
    //   async (value) => {
    //     return await checkIfExistsInPaymentModeTable(value);
    //   }
    // ),

  file: yup.mixed()
    .nullable(),
    // .test('fileType', 'Only jpg, bmp, or png files are allowed', (value) => {
    //   if (value) {
    //     const allowedTypes = ['image/jpeg', 'image/png', 'image/bmp'];
    //     return allowedTypes.includes(value.type);
    //   }
    //   return true; // No file uploaded, so skip validation
    // }),

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
const LicForm = () => {
// const resolver = useYupValidationResolver(validationSchema)
  const methods = useForm({ 
    defaultValues: DEFAULT_VALUES,  
    
    // resolver: yupResolver(validationSchema), 
    //  mode: "onChange",
     });
  const { control, handleSubmit, getValues, setValue  } = methods;
  // Calculate total based on net premium and GST
  const netPremium = useWatch({ control, name: 'net_premium' });
  const gst = useWatch({ control, name: 'gst' });
  const totalAmount = useMemo(() => {
    const total = parseFloat(netPremium || '0') + parseFloat(gst || '0');
    return total.toFixed(2);
  }, [netPremium, gst]);

  useEffect(() => {
    if (totalAmount !== getValues('total')) {
      setValue('total', totalAmount);
    }
  }, [totalAmount]);
//   console.log("errors",errors)
  // Calculate premium expiry date
  const startDate = useWatch({ control, name: 'start_date' });
  const paymentMode = useWatch({ control, name: 'premium_payment_mode' });

  useEffect(() => {
    if (!startDate || !paymentMode) return;

    const monthsToAdd = paymentMode === 'monthly' ? 1 : paymentMode === 'quarterly' ? 3 : 12;
    const newDate = new Date(startDate);
    newDate.setMonth(newDate.getMonth() + monthsToAdd);

    setValue('premium_expiry_date', newDate.toISOString().split('T')[0]);
  }, [startDate, paymentMode]);

  // Form submission logic (as per your earlier example)
  const onSubmit = async (data: any) => {
    console.log("Submitting:", data);
    // Handle the submission logic (like calling API, etc.)
  };

  return (
    <Form {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
       
        {/* Covernote, Policy, and Agent Fields */}
        <CovernoteFields control={control} />
        <PolicyDetailsFields control={control} />
        <AgentSelectionFields control={control} />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <DatePickerField name="dob" label="Date of Birth" control={control} />
          <FormSelect name="premium_payment_mode" label="Premium Payment Mode" control={control} options={paymentModes}  placeholder='Mode'/>
          <DatePickerField name="premium_expiry_date" label="Premium Expiry Date" control={control} />
          <FormInput name="si" label="SI" placeholder='SI' control={control} type="number" />
          <FormInput name="net_premium" label="Net Premium" control={control} type="number" />
          <FormInput name="gst" label="GST" control={control} type="number" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <FormInput name="total" label="Final Amount" control={control} type="number" />
          <FormSelect name="paymentmode" label="Payment Method" control={control} options={paymentModes} />
          <FormInput name="recivedpayment" label="Payment Received" control={control} type="number" />
        </div>

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
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default LicForm;
