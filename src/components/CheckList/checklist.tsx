import { FC } from "react";
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

  const removeGroup = (item: string) => {
    const itemIndex = atomKey.findIndex((e: any) => e === item);
    setState([...atomKey.slice(0, itemIndex), ...atomKey.slice(itemIndex + 1)]);
  };

  const handleChange = (event: any, item: any) => {
    if (event.target.checked && !currentIDs.includes(item.id)) {
      if (atomKey[0] === "") {
        setState([item.id]);
      } else {
        setState([...atomKey, item.id]);
      }
    } else {
      removeGroup(item.id);
    }
    console.log(atomKey);
  };

  const isChecked = (id: string) => {
    if (currentIDs.includes(id)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div id="add-groups">
      <div id="titleChecklist"> {name} </div>
      {mapList.map((item: any) => {
        return (
          <div id="checkbox">
            
              <input
                type="checkbox"
                key={item.id}
                defaultChecked={isChecked(item.id)}
                onChange={(event: any) => handleChange(event, item)}
              />
              <span className="checklistLabel">
              {item.name}
            </span>
          </div>
        );
      })}
    </div>
  );
};
