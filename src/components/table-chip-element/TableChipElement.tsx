import { Chip } from "@mui/material";
import React, { FC } from "react";
import CancelIcon from "@mui/icons-material/Cancel";

import "./styles.css";

const DEFAULT_SIZE = 6;
interface TableChipElementProps {
  rowItems: any;
  columnName: string;
}

const TableChipElement: FC<TableChipElementProps> = ({
  rowItems,
  columnName
}) => {
  const { row } = rowItems;
  console.log(row)
  const [viewAllItems, setViewAllItems] = React.useState(false);

  const handleClick = () => {
    setViewAllItems(true);
  };

  const handleReturnClick = () => {
    setViewAllItems(false);
  };

  return (
    <>
        {!viewAllItems && (
        <>
          {row[columnName]?.map((item:any, i:number) => i < DEFAULT_SIZE && <Chip label={item?.name} key={item?.id} id="chip" />)}
          {row[columnName].length > DEFAULT_SIZE && (
               <Chip
               label={`+${row[columnName].length-DEFAULT_SIZE}`}
               key="click-to-see-more"
               id="chip"
               onClick={handleClick}
             />
          )}
        </>
      )}
      {viewAllItems && (
        <>
          {row[columnName]?.map((item:any) => (
            <Chip label={item?.name} key={item?.id} id="chip" />
          ))}
          <CancelIcon id="cancel-icon" onClick={handleReturnClick} />
        </>
      )}

    </>
  );
};
export default TableChipElement;
