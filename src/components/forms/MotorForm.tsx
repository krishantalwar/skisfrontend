import { useForm } from 'react-hook-form'

import CovernoteFields from './covernoteField/CovernoteFields'
import PolicyDetailsFields from './covernoteField/PolicyAndInsuredDetailsFields'

import InsuredDetailsFields from './covernoteField/InsuredDetailsFields'

import AgentSelectionFields from './covernoteField/AgentSelectionFields'

// import VehicleDetailsFields from './covernoteField/VehicleDetailsFields'
// import InsuredDetailsFields from './covernoteField/InsuredDetailsFields'
import {FileUpload} from './fields/FileUpload'



import { Button } from '@/components/ui/button'
import { Form } from "@/components/ui/form"

const MotorForm = () => {
  const methods = useForm({
  })

  const { control, handleSubmit } = methods

  const onSubmit = (data: any) => {
    console.log(data)
    // Call API here
  }

  return (
    <Form {...methods}>
    <form onSubmit={handleSubmit(onSubmit)}  className="space-y-6">
      <CovernoteFields control={control} />
         <PolicyDetailsFields control={control} />
      <InsuredDetailsFields control={control} />
      <AgentSelectionFields control={control} />
      {/* <VehicleDetailsFields control={control} /> */}
      {/* <InsuredDetailsFields control={control} /> */}

    
      <FileUpload
        name="upload"
        control={control}
        label="Upload Files"
        multiple={true}
        accept={['image/*', 'application/pdf']}
        maxFileSize={10* 1024 * 1024} // 2MB
        maxFiles={3}
        showProgress={true}
        showThumbnails={true}
      />
      <Button type="submit">Submit</Button>
    </form>
    </Form>
  )
}

export default MotorForm
