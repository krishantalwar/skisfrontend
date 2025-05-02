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
import AgentInput from '@/components/forms/components/Agent';

// Assuming `useCovernoteExitsQuery` is a custom hook or an API query
import {

    useAgentAddMutation
} from "@/features/agent/service";

import { yupResolver } from "@hookform/resolvers/yup";
import { showMessage } from "@/features/ui/globalMessageSlice"
import { showLoader ,hideLoader} from "@/features/ui/LoaderOverlaySlice"
import { useAppDispatch } from "@/hooks/hooks";


// API call to fetch application details (already being handled by the query hook)
const DEFAULT_VALUES = {
    name: undefined, // Provide an empty string as the default for a required string
    phone: undefined, // Keep undefined for now, but consider a default number if appropriate
    // password: undefined,
    parent_id: undefined
,};




const validationSchema = yup.object({
    name: yup.string()
    .required('name is required')
    .max(255, 'name cannot exceed 255 characters'),
    phone: yup.string()
        .required('Phone number is required')
        .matches(/^[0-9]{10,15}$/, 'Phone number must be between 10 and 15 digits'),
    parent_id: yup.number()
    // .required('Company ID is required')
    .integer('Parent ID must be an integer')
    .positive('Parent ID must be a positive integer'),
});


import { setApiFieldErrors } from '@/lib/setApiFieldErrors'


const LicForm = () => {
  const dispatch = useAppDispatch();
  // const resolver = useYupValidationResolver(validationSchema).
  const methods = useForm({
    defaultValues: DEFAULT_VALUES,
    resolver: yupResolver(validationSchema),
     mode: "onChange",
  });



  const { control, handleSubmit, getValues, setValue,setError,reset } = methods;



  const [
    AgentAdd,
    {
      // currentData,
      isFetching,
      isLoading,
      isSuccess,
      isError,
      error,
      status,
    },
  ] = useAgentAddMutation();

  // Form submission logic (as per your earlier example)
  const onSubmit = async (data: any) => {
    console.log("Submitting:", data);
    // Handle the submission logic (like calling API, etc.)
         dispatch(showLoader({
                    isLoading:true
                  }));
    try {
      await AgentAdd(data).unwrap()
      dispatch(hideLoader())
      dispatch(showMessage({
        type: "success",
        title: "Insert",
        description: "Agent Insert Sucessfully",
        show: true,
      }))
 
      reset(DEFAULT_VALUES)
    } catch (error) {
      dispatch(hideLoader())
      setApiFieldErrors(error, setError) // ✅ reusable error handler

    }
  };


  return (
    <Form {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* Covernote, Policy, and Agent Fields */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

          <FormInput name="name" label="Name" placeholder='Name' control={control} />
          <FormInput name="phone" label="Phone" placeholder='Phone' control={control} />

          <AgentInput name="parent_id" label="Parent Agent" control={control} />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default LicForm;
