// components/forms/NonMotorForm.tsx
import { Button } from "@/components/ui/button"
import { FormInput } from "@/components/forms/fields/FormInput"
import { Form } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { FileUpload } from "@/components/forms/fields/FileUpload"

const nonMotorSchema = z.object({
  gstamuont: z.string(),
  totoal: z.string(),
  paymentmode: z.string().min(1),
  recivedpayment: z.string().min(1),
  pinof: z.string(),
  file: z.any(),
})

export type NonMotorFormValues = z.infer<typeof nonMotorSchema>

export const NonMotorForm = () => {
  const form = useForm<NonMotorFormValues>({
    resolver: zodResolver(nonMotorSchema),
    defaultValues: {
      gstamuont: "",
      totoal: "",
      paymentmode: "",
      recivedpayment: "",
      pinof: "",
      file: [],
    },
  })

  const onSubmit = (data: NonMotorFormValues) => {
    console.log("Non Motor Submit", data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <FormInput control={form.control} name="gstamuont" label="GST Amount" placeholder="GST Amount" readOnly />
          <FormInput control={form.control} name="totoal" label="Final Amount" placeholder="FINAL AMOUNT" readOnly />
          <div>
            <label className="text-sm font-medium mb-2 block">Payment Method</label>
            <Select onValueChange={(val) => form.setValue("paymentmode", val)} defaultValue={form.getValues("paymentmode")}>
              <SelectTrigger>
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Customer Cheque / Cash</SelectItem>
                <SelectItem value="2">Customer Online Payment</SelectItem>
                <SelectItem value="3">SKIS Check</SelectItem>
                <SelectItem value="4">SKIS Cash</SelectItem>
                <SelectItem value="5">SKIS Online</SelectItem>
                <SelectItem value="6">SKIS Cc</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <FormInput control={form.control} name="recivedpayment" label="Received Payment" placeholder="Receive payment" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Policy Info</label>
            <Textarea {...form.register("pinof")} placeholder="Policy Info" />
          </div>
          <FileUpload
            control={form.control}
            name="file"
            label="Choose File"
            multiple
            showThumbnails
            accept={["image/*", ".pdf", ".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx", ".txt"]}          
          />



        </div>

        <Button type="submit" className="w-full">Insert</Button>
      </form>
    </Form>
  )
}
