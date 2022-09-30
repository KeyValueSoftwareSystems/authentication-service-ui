import { CheckBox } from "@mui/icons-material";
import { Checkbox, checkboxClasses, withStyles } from "@mui/material";
import { FC, useState } from "react";
import "./checklist.css";
interface ChecklistProps {
  name: String;
  mapList: any;
  currentIDs?: string[];
  onChange: (event: any, item: any) => void;
}
export const ChecklistComponent: FC<ChecklistProps> = ({
  mapList,
  name,
  currentIDs = [],
  onChange,
}) => {
  const [checkAll, setChecked] = useState(false);
  const isChecked = (id: string) => {
    if (currentIDs.includes(id)) {
      return true;
    } else {
      return false;
    }
  };
  console.log(currentIDs);
  const handleSelectAll = (event: any) => {
    if (event.target.checked) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  };
  return (
    <div id="add-groups">
      <div id="titlebar">
        <div id="titleChecklist"> {name} </div>
        <div id="selectall">
          <input
            type="checkbox"
            onChange={(event: any) => handleSelectAll(event)}
          />
          <span> Select All</span>
        </div>
      </div>
      <div id="component">
        {mapList.map((item: any) => {
          return (
            <div id="checkbox" key={item.id}>
              <input
                type="checkbox"
                key={item.id}
                checked={checkAll || isChecked(item.id)}
                defaultChecked={isChecked(item.id)}
                onChange={(e) => onChange(e, item)}
              />
              <span className="checklistLabel">{item.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
