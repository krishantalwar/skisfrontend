import {FormInput} from '@formFields/FormInput'
import { memo } from 'react'
import { FC } from 'react'

interface Props {
  control: any
}

const PolicyDetailsFields: FC<Props> = ({ control }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <FormInput name="pno" label="Policy No" placeholder="Enter policy number" control={control}/>
      <FormInput name="name" label="Insured Name" placeholder="Enter name" control={control}/>
      <FormInput name="address" label="Insured Address" placeholder="Enter address" control={control} />
      <FormInput name="phone" label="Mobile No" placeholder="Enter mobile" type="tel"control={control} />
    </div>
  )
}

export default memo(PolicyDetailsFields)
