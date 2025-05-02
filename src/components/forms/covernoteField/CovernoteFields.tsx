// // components/forms/MotorForm/fields/CovernoteFields.tsx
// import { FC } from 'react'
// import { FormInput } from '@formFields/FormInput'
// import { DatePickerField } from '@formFields/DatePickerField'

// interface Props {
//   control: any
// }

// const CovernoteFields: FC<Props> = ({ control }) => {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//       <FormInput name="covernote" label="Covernote" control={control} placeholder="Enter covernote" />
//       <DatePickerField name="issue_date" label="Issued Date" control={control} />
//       <DatePickerField name="start_date" label="Start Date" control={control} />
//       <DatePickerField name="end_date" label="End Date" control={control} />
//     </div>
//   )
// }

// export default CovernoteFields


// import { FC, useEffect } from 'react';
// import { useFetchApplicationDetailByidQuery } from '@/features/covernote/slice';
// import { FormInput } from '@formFields/FormInput';
// import { DatePickerField } from '@formFields/DatePickerField';
// import { useDebounce } from 'react-use';

// interface Props {
//   control: any;
//   // setValue: (name: string, value: any) => void;
// }

// const CovernoteFields: FC<Props> = ({ control }) => {
//   // const covernote = control?.getValues('covernote') || ''; // Getting current value of covernote

//   // Debounced covernote value
//   const [debouncedCovernote] = useDebounce(covernote, 5000); // 1 second debounce delay

//   // Fetch application details based on debounced covernote value
//   const {
//     data: ApplicationDetail,
//     error: errorApplicationDetail,
//     isLoading: isLoadingApplicationDetail,
//     refetch: refetchApplicationDetail,
//   } = useFetchApplicationDetailByidQuery(debouncedCovernote, {
//     skip: !debouncedCovernote || debouncedCovernote.length === 0, // Skip the request if covernote is empty
//     refetchOnMountOrArgChange: true, // Refetch if covernote changes
//   });

//   // Update other form values based on the API response if needed
//   useEffect(() => {
//     if (ApplicationDetail) {
//       // Example of setting some fields based on the API response
//       // setValue('policy_no', ApplicationDetail.policy_no);
//       // setValue('insured_name', ApplicationDetail.insured_name);
//       // setValue('insured_address', ApplicationDetail.insured_address);
//     }
//   }, [ApplicationDetail]);

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//       <FormInput name="covernote" label="Covernote" control={control} placeholder="Enter covernote" />
//       <DatePickerField name="issue_date" label="Issued Date" control={control} />
//       <DatePickerField name="start_date" label="Start Date" control={control} />
//       <DatePickerField name="end_date" label="End Date" control={control} />

//       {/* Loading and error states */}
//       {isLoadingApplicationDetail && <div>Loading application details...</div>}
//       {errorApplicationDetail && <div className="text-red-500">{errorApplicationDetail.message}</div>}

//       {ApplicationDetail && (
//         <div>
//           <h3>Application Details</h3>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CovernoteFields;


// import { FC, useEffect, useState } from 'react';
// import { FormInput } from '@formFields/FormInput';
// import { DatePickerField } from '@formFields/DatePickerField';
// import { useDebounce } from 'use-debounce';

import { useWatch } from 'react-hook-form'; // Importing useWatch to observe form values

import { FC, useEffect ,useState} from 'react';
import { useCovernoteExitsQuery } from '@/features/covernote/service';
import { FormInput } from '@formFields/FormInput';
import { DatePickerField } from '@formFields/DatePickerField';
import { useDebounce } from 'react-use';
import { showMessage } from "../../../features/ui/globalMessageSlice"

import { useAppDispatch } from "@/hooks/hooks";

interface Props {
  control: any;
}

const CovernoteFields: FC<Props> = ({ control }) => {
   const dispatch = useAppDispatch();
  // Use useWatch to observe the covernote field from the form
  const covernote = useWatch({ control, name: 'covernote' });

// Debounced state to avoid frequent API calls
const [debouncedCovernote, setDebouncedCovernote] = useState<string | null>(null);

const [, cancel] = useDebounce(
  () => {
    if (covernote) {
      setDebouncedCovernote(covernote);
    } else {
      setDebouncedCovernote(null);
    }
  },
  1000,
  [covernote]
);

// Fetch data when debounced value is set
const { data, error, isLoading, isFetching ,isUninitialized ,isError,  } = useCovernoteExitsQuery(debouncedCovernote || '', {
  skip: !debouncedCovernote, // Skip the query if the covernote is empty
  refetchOnMountOrArgChange: true,
    // global configuration for the api
    refetchOnFocus: true,
    // global configuration for the api
    refetchOnReconnect: true,
});

if(data?.data!=null){
  dispatch(showMessage({
    type: "error",
    title: "API Error",
    description: "Covernote already exist",
    show: true,
  }))
}

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {/* Input for covernote */}
      
      <div className='space-y-1 col-span-1'>
      {/* Loading/Error States */}
        {isLoading && (
      <span className="text-sm text-muted-foreground">Loading Covernote details...</span>
    )}
    {isFetching && (
      <span className="text-sm text-muted-foreground">Fetching Covernote details...</span>
    )}
    {/* {isUninitialized && (
      <span className="text-sm text-muted-foreground">Covernote details not yet initialized...</span>
    )} */}
    {error && (
      <span className="text-sm text-red-500">Error. Covernote already exist. You can not insert data. Please connect with team. </span>
     
    )}

      <FormInput name="covernote" label="Covernote" control={control} placeholder="Enter covernote" />
      
      </div>


      {/* Date Fields */}
      <FormInput type='date' name="issue_date" label="Issued Date" control={control} />
      <FormInput type='date' name="start_date" label="Start Date" control={control} />
      <FormInput type='date' name="end_date" label="End Date" control={control} />

    </div>
  );
};

export default CovernoteFields;
