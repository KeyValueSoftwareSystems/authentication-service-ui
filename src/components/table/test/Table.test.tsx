import { render } from '@testing-library/react';
import TableList from '../Table';
import { columns } from '@/utils/roles';
import { GridRowsProp } from '@mui/x-data-grid';
import { DELETE_GROUP } from '@/services/mutations/groupMutations';
import { GET_GROUPS } from '@/services/queries/groupQueries';
import { RecoilRoot } from 'recoil';
import { ApolloProvider } from '@apollo/client';
import client from '@/services/apolloClient';

describe('If table rendered correctly', () => {
  const handleRowClick = jest.fn();
  const onEdit = jest.fn();
  const onAdd = jest.fn();
  const setItemList = jest.fn();
  const tableProps = {
    field: '',
    rows: {} as GridRowsProp,
    columns,
    count: 10,
    setItemList,
    onAdd,
    onEdit,
    buttonLabel: 'Button',
    searchLabel: 'Search',
    deleteMutation: DELETE_GROUP,
    refetchQuery: GET_GROUPS,
    handleRowClick
  };

  test('If snapshot rendered', () => {
    const component = render(
      <ApolloProvider client={client}>
        <RecoilRoot>
          <TableList {...tableProps} />
        </RecoilRoot>
      </ApolloProvider>
    );

    expect(component).toMatchSnapshot();
  });
});
