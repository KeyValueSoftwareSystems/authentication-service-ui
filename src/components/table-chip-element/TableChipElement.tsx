import { DocumentNode, useQuery } from "@apollo/client";
import { Chip } from "@mui/material";
import { FC } from "react";

interface TableChipElementProps {
  props: any;
  query: DocumentNode;
  itemList: any;
  setItemList: any;
}

const TableChipElement: FC<TableChipElementProps> = ({
  props,
  query,
  itemList,
  setItemList,
}) => {
  const { row } = props;

  useQuery(query, {
    variables: {
      id: row.id,
    },
    onCompleted: (data) => {
      setItemList(data);
    },
  });

  return (
    <>
      {itemList?.map((item: any) => (
        <Chip label={item?.name} key={item?.id} />
      ))}
    </>
  );
};
export default TableChipElement;
