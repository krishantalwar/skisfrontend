import * as XLSX from "xlsx"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"


function getValueByPath(obj: any, path: string) {
  // console.log(path)
  // console.log(path.split('.'))
  // console.log("obj",obj)
  // console.log(path.split('.').reduce((acc, part) => acc?.[part], obj))
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
      return row[col.accessorKey]
    })
  )

  autoTable(doc, {
    head: [columns.map(col => col.header)],
    body: tableData,
  })

  doc.save(`${fileName}.pdf`)
}



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
