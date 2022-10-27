import { FC, useEffect, useState } from "react";
import { Entity } from "../../types/generic";
import { User } from "../../types/user";
import { getFullName } from "../../utils/user";
import "./styles.css";
interface ChecklistProps {
  name: String;
  mapList: any;
  currentCheckedItems?: Entity[] | User[];
  onChange: (event: any, item?: any) => void;
}
export const ChecklistComponent: FC<ChecklistProps> = ({
  mapList,
  name,
  currentCheckedItems = [],
  onChange,
}) => {
  const [selectAll, setSelectAll] = useState<boolean>(false);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) setSelectAll(true);
    else setSelectAll(false);
    onChange(e);
  };

  const isChecked = (id: string) => {
    return currentCheckedItems.map((item) => item.id).includes(id);
  };

  useEffect(() => {
    if (mapList?.length === currentCheckedItems?.length) {
      setSelectAll(true);
    } else setSelectAll(false);
  }, [mapList, currentCheckedItems]);

  return (
    <div id="add-items">
      <div id="titlebar">
        <div id="titleChecklist"> {name} </div>
        <div id="selectall">
          <input
            type="checkbox"
            value={"all"}
            onChange={handleSelectAll}
            checked={selectAll}
          />
          <span> Select All</span>
        </div>
      </div>
      <div id="component">
        {mapList?.map((item: any) => {
          return (
            <div id="checkbox" key={item.id}>
              <input
                type="checkbox"
                key={item.id}
                checked={isChecked(item.id)}
                onChange={(e) => onChange(e, item)}
              />
              <span className="checklistLabel">
                {item.name ||
                  getFullName(item.firstName, item.middleName, item.lastName)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
