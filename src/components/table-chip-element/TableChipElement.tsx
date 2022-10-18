import { DocumentNode, useQuery } from "@apollo/client";
import { Chip } from "@mui/material";
import React, { FC, useEffect } from "react";
import CancelIcon from "@mui/icons-material/Cancel";

import "./styles.css";

const INITIALLY_VISIBLE_ITEMS = 3;
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

  const [allItems, setAllItems] = React.useState([]);
  const [initiallyVisibleItems, setInitiallyVisibleItems] = React.useState([]);
  const [hiddenItemsCount, setHiddenItemsCount] = React.useState("");
  const [isManyItems, setIsManyItems] = React.useState(false);  
  const [viewAllItems, setViewAllItems] = React.useState(false);

  useQuery(query, {
    variables: {
      id: row.id,
    },
    onCompleted: (data) => {
      if (element === "user") {
        setAllItems(data?.getUserGroups);
      } else if (element === "group") {
        setAllItems(data?.getGroupRoles);
      }
    },
  });
  useEffect(() => {
    if (allItems.length > 3) {
      setInitiallyVisibleItems(allItems.slice(0, INITIALLY_VISIBLE_ITEMS));
      setIsManyItems(true);
    }
  }, [allItems]);
  useEffect(() => {
    setHiddenItemsCount("+" + (allItems.length - INITIALLY_VISIBLE_ITEMS));
  }, [allItems]);
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
        ? initiallyVisibleItems?.map((item: any) => (
            <Chip label={item?.name} key={item?.id} id="chip" />
          ))
        : allItems?.map((item: any) => (
            <Chip label={item?.name} key={item?.id} id="chip" />
          ))}
      {viewAllItems && (
        <CancelIcon id="cancel-icon" onClick={handleReturnClick} />
      )}
      {isManyItems && !viewAllItems && (
        <Chip
          label={hiddenItemsCount}
          key="click-to-see-more"
          id="chip"
          onClick={handleClick}
        />
      )}
    </>
  );
};
export default TableChipElement;
