import { FC, useState } from "react";
import { useParams } from "react-router-dom";
import { RecoilState, useRecoilState } from "recoil";
import "./checklist.css";

interface ChecklistProps {
  name: String;
  mapList: any;
  atomName: RecoilState<any>;
  currentIDs: string[];
}

export const ChecklistComponent: FC<ChecklistProps> = ({
  mapList,
  name,
  atomName,
  currentIDs,
}) => {

  const [atomKey, setState] = useRecoilState(atomName);

  const removeItem = (item: string) => {
    const itemIndex = atomKey.findIndex((e: any) => e === item);
    setState([...atomKey.slice(0, itemIndex), ...atomKey.slice(itemIndex + 1)]);
  };

  const handleChange = (event: any, item: any) => {
    if (event.target.checked) {
      if (!currentIDs.includes(item.id)) {
        if (atomKey[0] === "") {
          setState([item.id]);
        } else {
          setState([...atomKey, item.id]);
        }
      }
      } else {
        removeItem(item.id);
        currentIDs = currentIDs.filter((id) => item.id !== id);
      }

  };

  const {id}=useParams();
  const [checkAll, setChecked] = useState(false);

  const isChecked = (id: string) => {
    if (currentIDs.includes(id)) {
      console.log("true")
      return true;
    } else {
      return false;
    }
  };

  const handleSelectAll = (event: any) => {
    if (event.target.checked) {
      setChecked(true);
    } else {
      setChecked(false);
    }
    mapList.map((item:any)=>handleChange(event,item));
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
                checked={isChecked(item.id)||checkAll}
                onChange={(event: any) => handleChange(event, item)}
              />
              <span className="checklistLabel">{item.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
