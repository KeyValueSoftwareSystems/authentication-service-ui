import { DocumentNode } from 'graphql';
import { CSSProperties } from 'react';
export interface SearchBarProps {
  searchLabel: string;
  searchQuery: DocumentNode;
  setItemList: (data: any) => void;
  customSearchStyle?: CSSProperties;
  customBarStyle?: CSSProperties;
  customIconStyle?: CSSProperties;
}
