import { DocumentNode } from "graphql";

export interface TableToolBarProps {
  field: string;
  buttonLabel: string;
  text: string;
  searchLabel: string;
  searchQuery: DocumentNode;
  setItemList: any;
  isAddVerified?: boolean;
  onAdd?: () => void;
}
