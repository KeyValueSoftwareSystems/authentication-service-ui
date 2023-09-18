import { GridRowId, GridRowParams } from '@mui/x-data-grid';
import { DocumentNode } from 'graphql';

interface fetchEntityParam {
  page: number;
}

export interface ActionsCellProps {
  isEditVerified: boolean;
  isDeleteVerified: boolean;
  onEdit: (id: GridRowId) => void;
  entity: string;
  deleteMutation: DocumentNode;
  refetchQuery: DocumentNode;
  params: GridRowParams;
  fetchEntities: (data: fetchEntityParam) => void;
}
