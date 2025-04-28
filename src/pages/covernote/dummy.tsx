

import { AgentGroupTable } from "@/components/table/AgentGroupTable"

const apiResponse = [
    {
      agentName: "NAVEEN BEDI",
      covernoteNo: "3005/389715390/00/000",
      productName: "TWO WHEELER",
      startDate: "2025-04-13",
      expDate: "2026-04-12",
      vechNo: "PB02DB2174",
      companyName: "ICICI LOMBARD GENERAL INSURANCE CO.LTD",
      insuredName: "RAMAN SHARMA",
      make: "TVS",
      model: "JUPITER BS VI",
      yearOfMF: 2016,
      decValue: 26000,
      basic: 280,
      total: 1173,
    },
    {
      agentName: "KUMAR HARDWARE",
      covernoteNo: "3001/389718882/00/000",
      productName: "PRIVATE CAR",
      startDate: "2025-04-14",
      expDate: "2026-04-13",
      vechNo: "PB02R0069",
      companyName: "ICICI LOMBARD GENERAL INSURANCE CO.LTD",
      insuredName: "INDICA CONVEYORS",
      make: "TOYOTA",
      model: "FORTUNER G",
      yearOfMF: 2010,
      decValue: 54857,
      basic: 2692,
      total: 12613,
    },
    {
      agentName: "WARDROBE",
      covernoteNo: "4095/388531374/00/000",
      productName: "FIRE POLICY",
      startDate: "2025-04-11",
      expDate: "2026-04-10",
      vechNo: "",
      companyName: "ICICI LOMBARD GENERAL INSURANCE CO.LTD",
      insuredName: "WARDROBE",
      make: "",
      model: "",
      yearOfMF: "",
      decValue: 43768,
      basic: 0,
      total: 51646,
    },
    {
      agentName: "WARDROBE",
      covernoteNo: "1017/388527551/00/000",
      productName: "LAGHU UDHYAM SURAKSHA POLICY+SCR 250CR",
      startDate: "2025-04-11",
      expDate: "2026-04-10",
      vechNo: "",
      companyName: "ICICI LOMBARD GENERAL INSURANCE CO.LTD",
      insuredName: "WARDROBE",
      make: "",
      model: "",
      yearOfMF: "",
      decValue: 220660,
      basic: 220660,
      total: 260379,
    },
    {
      agentName: "WARDROBE",
      covernoteNo: "4002/388527858/00/000",
      productName: "BURGLARY/THEFT",
      startDate: "2025-04-11",
      expDate: "2026-04-10",
      vechNo: "",
      companyName: "ICICI LOMBARD GENERAL INSURANCE CO.LTD",
      insuredName: "WARDROBE",
      make: "",
      model: "",
      yearOfMF: "",
      decValue: 7585,
      basic: 7585,
      total: 8950,
    },
  ]
  
function groupByAgent(data: typeof apiResponse) {
    const groupMap = new Map<string, { records: typeof apiResponse, basicTotal: number, grandTotal: number }>()
  
    data.forEach((item) => {
      if (!groupMap.has(item.agentName)) {
        groupMap.set(item.agentName, { records: [], basicTotal: 0, grandTotal: 0 })
      }
      const group = groupMap.get(item.agentName)!
      group.records.push(item)
      group.basicTotal += Number(item.basic || 0)
      group.grandTotal += Number(item.total || 0)
    })
  
    const groupedData = Array.from(groupMap.entries()).map(([agentName, group]) => ({
      agentName,
      records: group.records,
      basicTotal: group.basicTotal,
      grandTotal: group.grandTotal,
    }))
  
    const grandBasic = groupedData.reduce((sum, group) => sum + group.basicTotal, 0)
    const grandFinalTotal = groupedData.reduce((sum, group) => sum + group.grandTotal, 0)
  
    return { groupedData, grandBasic, grandFinalTotal }
  }
  

export default function UserTable() {


    const { groupedData, grandBasic, grandFinalTotal } = groupByAgent(apiResponse)
    return (
        <AgentGroupTable
  groupedData={groupedData}
  grandBasic={grandBasic}
  grandFinalTotal={grandFinalTotal}
  columns={[
    { header: "Covernote No", accessorKey: "covernoteNo" },
    { header: "Product Name", accessorKey: "productName" },
    { header: "Start Date", accessorKey: "startDate" },
    { header: "Exp. Date", accessorKey: "expDate" },
    { header: "Vech. No", accessorKey: "vechNo" },
    { header: "Company Name", accessorKey: "companyName" },
    { header: "Insured Name", accessorKey: "insuredName" },
    { header: "Make", accessorKey: "make" },
    { header: "Model", accessorKey: "model" },
    { header: "Year of MF", accessorKey: "yearOfMF" },
    { header: "Dec. Value", accessorKey: "decValue" },
    { header: "Basic", accessorKey: "basic" },
    { header: "Total", accessorKey: "total" },
  ]}
  fetchAllData={() => Promise.resolve(apiResponse)} // Dummy for now
  fileName="covernote_export"
/>

    );

}