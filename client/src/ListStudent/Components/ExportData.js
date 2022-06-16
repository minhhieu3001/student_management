import React from "react";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

const ExportToExcel = ({ apiData, fileName }) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (apiData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(apiData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    console.log(data);
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <button
      className="btn btn-primary"
      onClick={(e) => exportToCSV(apiData, fileName)}
    >
      <span className="fa fa-file-export"> &nbsp;</span>Xuất file Excel
    </button>
  );
};

export default ExportToExcel;
