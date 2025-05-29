import * as XLSX from "xlsx"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
// import { saveAs } from "file-saver"


function getValueByPath(obj: any, path: string) {
  // console.log(path)
  // console.log(path.split('.'))
  // console.log("obj",obj)
  // console.log(path.split('.').reduce((acc, part) => acc?.[part], obj))
  
  if(path=="payments"){
    console.log("obj",obj)
    console.log(obj?.['payments'])
    const payments = obj?.['payments'] || [];
    const total = payments.reduce((sum, p) => sum + (p.amount || 0),0);
    return total;
  }
  return path.split('.').reduce((acc, part) => acc?.[part], obj);

}
export function exportToExcel(data: any[], columns: { header: string; accessorKey: string }[], fileName: string) {
  const worksheetData = data.map(row => {
    const obj: Record<string, any> = {}
    columns.forEach(col => {
      obj[col.header] = getValueByPath(row, col.accessorKey) ?? '' 
    })
    return obj
  })

  const worksheet = XLSX.utils.json_to_sheet(worksheetData)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1")
  XLSX.writeFile(workbook, `${fileName}.xlsx`)
}

export function exportToPDF(data: any[], columns: { header: string; accessorKey: string }[], fileName: string) {
  const doc = new jsPDF()

  const tableData = data.map(row =>
    columns.map(col => {
      // return row[col.accessorKey]
     return  getValueByPath(row, col.accessorKey) ?? '' 
    })
  )

  autoTable(doc, {
    head: [columns.map(col => col.header)],
    body: tableData,
  })

  doc.save(`${fileName}.pdf`)
}

// export function groupExportToExcel(groupedData: any[], fileName: string, columns: { header: string; accessorKey: string }[]) {
//   const allRows = []

//   groupedData.forEach((group) => {
//     // Add a row to indicate the agent
//     allRows.push({ "Agent Name": group.agentName })

//     // Add all records for this agent
//     group.records.forEach((record) => {
//       allRows.push(record)
//     })

//     // Add subtotal row
//     allRows.push({
//       basic: group.basicTotal,
//       total: group.grandTotal,
//     })

//     // Empty row for spacing
//     allRows.push({})
//   })

//   // Create worksheet and workbook
//   const worksheet = XLSX.utils.json_to_sheet(allRows)
//   const workbook = XLSX.utils.book_new()
//   XLSX.utils.book_append_sheet(workbook, worksheet, "Agent Report")

//   // Create file and download
//   const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" })
//   const data = new Blob([excelBuffer], { type: "application/octet-stream" })
//   saveAs(data, `${fileName}.xlsx`)
// }


// export function groupExportToPDF(groupedData: any[], fileName: string, columns: { header: string; accessorKey: string }[]) {
//   const doc = new jsPDF()
// console.log("sss")
//   console.log("groupedData",groupedData)
//   groupedData.forEach((group, idx) => {
//     if (idx > 0) doc.addPage()

//     doc.setFontSize(14)
//     doc.text(`Agent: ${group.agentName}`, 14, 20)

//     // Prepare table data
//     const tableData = group.records.map((row) =>
//       columns.map((col) => row[col.accessorKey])
//     )

//     const tableHeaders = columns.map((col) => col.header)

//     autoTable(doc, {
//       startY: 30,
//       head: [tableHeaders],
//       body: tableData,
//     })

//     // Add subtotal
//     autoTable(doc, {
//       startY: doc.lastAutoTable.finalY + 10,
//       head: [['', '', '', '', '', '', '', '', '', '', 'Subtotal Basic', 'Subtotal Total']],
//       body: [[
//         '', '', '', '', '', '', '', '', '', '',
//         group.basicTotal,
//         group.grandTotal
//       ]],
//       styles: { fillColor: [22, 160, 133] },
//     })
//   })

//   doc.save(`${fileName}.pdf`)
// }



  // const handlePDFExport = () => {
  //   const doc = new jsPDF();
  //   const tableColumn = columns.map((col) => col.header).concat("Agent Name");
  //   const tableRows = [];

  //   data.forEach((agent) => {
  //     agent.covernoteDetails.forEach((cover) => {
  //       const row = columns.map((col) => cover[col.accessorKey] || "");
  //       row.push(agent.name);
  //       tableRows.push(row);
  //     });
  //   });

  //   autoTable(doc, {
  //     head: [tableColumn],
  //     body: tableRows,
  //     styles: { fontSize: 8 },
  //     headStyles: { fillColor: [41, 128, 185] },
  //   });

  //   doc.save(`${fileName}.pdf`);
  // };

// --------------------------


// import * as XLSX from "xlsx"
// import jsPDF from "jspdf"
// import autoTable from "jspdf-autotable"
// import { ExportColumn } from "@/components/table/ExportMenu"

// export function exportToExcel<T>(data: T[], columns: ExportColumn[], fileName: string) {
//   const sheetData = data.map((row) =>
//     columns.reduce((acc, col) => {
//       acc[col.header] = (row as any)[col.accessorKey]
//       return acc
//     }, {} as Record<string, any>)
//   )

//   const worksheet = XLSX.utils.json_to_sheet(sheetData)
//   const workbook = XLSX.utils.book_new()
//   XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1")
//   XLSX.writeFile(workbook, `${fileName}.xlsx`)
// }

// export function exportToPDF<T>(data: T[], columns: ExportColumn[], fileName: string) {
//   const doc = new jsPDF()
//   const headers = columns.map((col) => col.header)
//   const rows = data.map((row) =>
//     columns.map((col) => (row as any)[col.accessorKey])
//   )

//   autoTable(doc, {
//     head: [headers],
//     body: rows,
//   })

//   doc.save(`${fileName}.pdf`)
// }
