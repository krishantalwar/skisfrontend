// components/forms/CoverNoteForm.tsx
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@/components/ui/button";
// import { FormField } from "../ui/FormField";
import { useEffect, useState } from "react";
import { FormInput } from "@/components/forms/fields/FormInput";
import { FormSelect } from "./fields/FormSelect";
import { DatePickerField } from "./fields/DatePickerField";
import {FileUpload} from "./fields/FileUpload";

import { Form } from "@/components/ui/form";

const schema = yup.object().shape({
  covernote: yup.string().required("Covernote is required"),
  idate: yup.date().required("Issued date required"),
  sdate: yup.date().required("Start date required"),
  edate: yup.date().required("End date required"),
  pno: yup.string().required("Policy number required"),
  Iname: yup.string().required("Insured name required"),
  iaddress: yup.string().required("Address required"),
  imno: yup.string().length(10, "Enter valid 10 digit phone").required("Phone required"),
  company: yup.string().required("Select company"),
  agent: yup.string().required("Select agent"),
});

const insuranceCompanies = [
  { label: "ABC Insurance", value: "abc" },
  { label: "XYZ Insurance", value: "xyz" },
];


export const CoverNoteForm = () => {
  // const { register, handleSubmit, formState: { errors } } = useForm({
    const form = useForm({
    resolver: yupResolver(schema)
  });

  const [agents, setAgents] = useState<string[]>([]);

  useEffect(() => {
    // You can dynamically fetch this if needed
    setAgents(["AGENT A", "AGENT B", "AGENT C"]);
  }, []);

  const onSubmit = (data: any) => {
    console.log("Form Data", data);

    const files = Array.isArray(data.upload) ? data.upload : [data.upload]

    const formData = new FormData()
    files.forEach((file: any) => {
      formData.append('files[]', file.data)
    })

    // try {
    //   const res = await axios.post('/api/upload', formData, {
    //     headers: { 'Content-Type': 'multipart/form-data' },
    //   })
    //   console.log('Uploaded:', res.data)
    // } catch (err) {
    //   console.error('Upload failed:', err)
    // }
  };

  return (
    <Form {...form}>
    <form  onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl">
      <FormInput  label="Covernote" name="covernote"  control={form.control} />
      <DatePickerField  label="Issued Date" name="idate"   type="date" control={form.control}/>
      <DatePickerField  label="Start Date" name="sdate"  type="date" control={form.control} />
      <DatePickerField  label="End Date" name="edate"   type="date" control={form.control}/>
      <FormInput  label="Policy Number" name="pno"  control={form.control} />
      <FormInput  label="Insured Name" name="Iname" control={form.control}  />
      <FormInput  label="Insured Address" name="iaddress"  control={form.control} />
      <FormInput  label="Insured Phone" name="imno"   type="tel" control={form.control} minLength={3}
  maxLength={25}/>

      <FormSelect name="insuranceCompany" label="Insurance Company" placeholder="Insurance Company" control={form.control} options={insuranceCompanies} />
       
      <FileUpload
        name="upload"
        control={form.control}
        label="Upload Files"
        multiple={true}
        accept={['image/*', 'application/pdf']}
        maxFileSize={10* 1024 * 1024} // 2MB
        maxFiles={3}
        showProgress={true}
        showThumbnails={true}
      />

      <div className="col-span-full flex justify-end">
        <Button type="submit">Submit</Button>
      </div>
    </form>
    </Form>
  );
};
