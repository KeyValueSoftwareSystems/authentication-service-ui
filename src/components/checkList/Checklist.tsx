import { FC } from "react";
import { RecoilState, useRecoilState } from "recoil";
import "./Checklist.css";

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

  const handleChange = (event: any,item: any) => {
    if (event.target.checked) {
      if (atomKey[0] === "") {
        setState([item.id]);
      } else {
        setState([...atomKey, item.id]);
      }
    } else {
      removeItem(item.id);
    }
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
      <div id="component">
        {mapList.map((item: any) => {
          return (
            <div id="checkbox" key={item.id}>
              <input
                type="checkbox"
                key={item.id}
                defaultChecked={isChecked(item.id)}
                onChange={(event: any) => handleChange(event,item)}
              />
              <span className="checklistLabel">{item.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
