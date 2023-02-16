import { SetterOrUpdater } from 'recoil';

export interface FilterProps {
  itemList: string[] | never[];
  onAddFilter: (
    name: string,
    e: React.ChangeEvent<HTMLInputElement>,
    checkedItems: string[],
    setCheckedItems: React.Dispatch<React.SetStateAction<string[]>>
  ) => void;
  checkedItems: string[];
  setCheckedItems: SetterOrUpdater<string[]>;
  handleCheckedItems: (item: string, checkedItems: string[]) => boolean;
}
