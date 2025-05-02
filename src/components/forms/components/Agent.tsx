// components/forms/MotorForm/fields/AgentSelectionFields.tsx
import { FC } from 'react'
import { FormSelect } from '@formFields/FormSelect'

interface Props {
  control: any,
  name:any,
  label:any
}
import { useCompanyQuery ,useAgentQuery } from '@/features/gloabelService';


const AgentSelectionFields: FC<Props> = ({ control,name,label}) => {

  const { data: Agent=[], error:AgentError, isLoading:AgentIsLoading } = useAgentQuery()
  

  return (
    // <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <FormSelect name={name} label={label} control={control} options={Agent} />
    // </div>
  )
}

export default AgentSelectionFields
