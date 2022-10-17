import { DocumentNode, useQuery } from "@apollo/client";
import { Chip } from "@mui/material";
import React, { FC, useEffect } from "react";
import CancelIcon from "@mui/icons-material/Cancel";

import "./styles.css";

const DEFAULT_SIZE = 3;
interface TableChipElementProps {
  props: any;
  query: DocumentNode;
  element: string;
}

const TableChipElement: FC<TableChipElementProps> = ({
  props,
  query,
  element,
}) => {
  const { row } = props;

  const [itemList, setItemList] = React.useState([]);
  const [smallerItemList, setSmallerItemList] = React.useState([]);
  const [isManyItems, setIsManyItems] = React.useState(false);
  const [count, setCount] = React.useState("");
  const [viewAllItems, setViewAllItems] = React.useState(false);

  useQuery(query, {
    variables: {
      id: row.id,
    },
    onCompleted: (data) => {
      if (element === "user") {
        setItemList(data?.getUserGroups);
      } else if (element === "group") {
        setItemList(data?.getGroupRoles);
      }
    },
  });
  useEffect(() => {
    if (itemList.length > 3) {
      setSmallerItemList(itemList.slice(0, DEFAULT_SIZE));
      setIsManyItems(true);
    }
  }, [itemList]);
  useEffect(() => {
    setCount("+" + (itemList.length - DEFAULT_SIZE));
  }, [itemList]);
  const handleClick = () => {
    setViewAllItems(true);
    setIsManyItems(false);
  };
  const handleReturnClick = () => {
    setIsManyItems(true);
    setViewAllItems(false);
  };
  return (
    <>
      {isManyItems
        ? smallerItemList?.map((item: any) => (
            <Chip label={item?.name} key={item?.id} id="chip" />
          ))
        : itemList?.map((item: any) => (
            <Chip label={item?.name} key={item?.id} id="chip" />
          ))}
      {viewAllItems && (
        <CancelIcon id="cancel-icon" onClick={handleReturnClick} />
      )}
      {isManyItems && !viewAllItems && (
        <Chip
          label={count}
          key="click-to-see-more"
          id="chip"
          onClick={handleClick}
        />
      )}
    </>
  );
};
export default TableChipElement;
