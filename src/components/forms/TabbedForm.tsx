// pages/CovernoteForm.tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MotorForm from "@/components/forms/MotorForm"
import { NonMotorForm } from "@/components/forms/NonMotorForm"


export default function CovernoteForm() {
  return (
    <div className="p-4">

      <Tabs defaultValue="motor" className="w-full">
        <TabsList className="w-full bg-white">
          <TabsTrigger value="motor" className="flex-1">Motor</TabsTrigger>
          <TabsTrigger value="nonmotor" className="flex-1">NON Motor</TabsTrigger>
        </TabsList>

        <TabsContent value="motor">
          <MotorForm />
        </TabsContent>

        <TabsContent value="nonmotor">
          <NonMotorForm />
        </TabsContent>
      </Tabs>

    </div>
  )
}
