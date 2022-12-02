import { FC, useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";

import { Entity } from "../../types/generic";
import { User } from "../../types/user";
import "./styles.css";
import GroupCard from "../group-card/GroupCard";
import { ReactComponent as UnCheckedIcon } from "../../assets/icons/uncheckedicon.svg";
import { ReactComponent as CheckedIcon } from "../../assets/icons/checkedicon.svg";

interface ChecklistProps {
  name: String;
  mapList: Entity[] | User[];
  currentCheckedItems: Entity[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>, item?: any) => void;
}

export const ChecklistComponent: FC<ChecklistProps> = ({
  mapList,
  name,
  currentCheckedItems,
  onChange,
}) => {
  const [selectAll, setSelectAll] = useState<boolean>(false);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) setSelectAll(true);
    else setSelectAll(false);
    onChange(e);
  };

  useEffect(() => {
    if (mapList?.length === currentCheckedItems?.length) {
      setSelectAll(true);
    } else setSelectAll(false);
  }, [mapList, currentCheckedItems]);
  console.log(mapList);

  return (
    <div id="add-items">
      <div id="titlebar">
        <div id="titleChecklist"> {name} </div>
        <div id="selectall">
          <Checkbox
            value={"all"}
            onChange={handleSelectAll}
            checked={selectAll}
            className="custom-checkbox"
            icon={<UnCheckedIcon />}
            checkedIcon={<CheckedIcon />}
          />
          <span> Select All</span>
        </div>
      </div>
      <div id="component">
        {mapList?.map((item: any) => {
          return (
            <GroupCard
              group={item}
              currentCheckedItems={currentCheckedItems}
              onChange={onChange}
            />
          );
        })}
      </div>
    </div>
  );
};
