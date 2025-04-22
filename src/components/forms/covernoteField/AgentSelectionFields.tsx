// components/forms/MotorForm/fields/AgentSelectionFields.tsx
import { FC } from 'react'
import { FormSelect } from '@formFields/FormSelect'

interface Props {
  control: any,
  productOptions:any
}
import { useCompanyQuery ,useAgentQuery } from '@/features/gloabelService';


const AgentSelectionFields: FC<Props> = ({ control ,productOptions=[]}) => {

  const { data: Company=[], error:CompanyError, isLoading:CompanyLoading } = useCompanyQuery()
  const { data: Agent=[], error:AgentError, isLoading:AgentIsLoading } = useAgentQuery()
  

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <FormSelect name="company_id" label="Company" control={control} options={Company} />
      <FormSelect name="agent_id" label="Agent" control={control} options={Agent} />
      <FormSelect name="product_type" label="Product" control={control} options={productOptions} />

    </div>
  )
}

export default AgentSelectionFields
