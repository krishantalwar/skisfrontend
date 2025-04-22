import { useForm, FormProvider } from "react-hook-form";
import LicForms from "./LicForms";

const MotorFormWrapper = () => {
  const methods = useForm({
    defaultValues: { gst: "", si: "" },
  });

  return (
    <FormProvider {...methods}>
      <LicForms />
    </FormProvider>
  );
};

export default MotorFormWrapper;
