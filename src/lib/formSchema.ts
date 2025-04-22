// lib/formSchema.ts
import * as yup from "yup";

export const formSchema = yup.object({
  policyNo: yup.string().required("Policy Number is required"),
  insuredName: yup.string().required("Insured Name is required"),
  periodFrom: yup.string().required("Period From is required"),
  periodTo: yup.string().required("Period To is required"),
  insuranceCompany: yup.string().required("Insurance Company is required"),
});
