import { FC, useEffect } from "react";
import "./checklist.css";

interface ChecklistProps {
  name: String;
  mapList: any;
  currentIDs?: string[];
  onChange: (event: any, item: any) => void;
  onSelectAll: (event: any) => void;
}

export const ChecklistComponent: FC<ChecklistProps> = ({
  mapList,
  name,
  currentIDs=[],
  onChange,
  onSelectAll,
}) => {

  const isChecked = (id: string) => {
    if (currentIDs.map((item: any) => item).includes(id)) {
      return true;
    } else {
      return false;
    }
  };
  useEffect(() => {}, [currentIDs]);

  return (
    <div id="add-items">
      <div id="titlebar">
        <div id="titleChecklist"> {name} </div>
        <div id="selectall">
          <input
            type="checkbox"
            onChange={(event: any) => onSelectAll(event)}
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
                defaultChecked={isChecked(item.id)}
                onChange={(event: any) => onChange(event, item)}
              />
              <span className="checklistLabel">{item.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
