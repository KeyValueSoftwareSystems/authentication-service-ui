import { render, screen } from '@testing-library/react';
import ActionsCell from '../ActionsCell';
import { DELETE_GROUP } from '@/services/mutations/groupMutations';
import { GET_GROUPS } from '@/services/queries/groupQueries';
import { GridRowParams } from '@mui/x-data-grid';
import { DocumentNode } from 'graphql';
import { RecoilRoot } from 'recoil';
import { ApolloProvider } from '@apollo/client';
import client from '@/services/apolloClient';

describe('If ActionCell rendered correctly', () => {
  const onEdit = jest.fn();
  const fetchEntities = jest.fn();
  const actionsCellProps = {
    isEditVerified: false,
    isDeleteVerified: false,
    onEdit,
    entity: '',
    deleteMutation: DELETE_GROUP as DocumentNode,
    refetchQuery: GET_GROUPS as DocumentNode,
    params: {
      id: '3',
      row: {
        status: 'INVITED'
      }
    } as GridRowParams,
    fetchEntities
  };

  test('If snapshot rendered', () => {
    const component = render(
      <ApolloProvider client={client}>
        <RecoilRoot>
          <ActionsCell {...actionsCellProps} />
        </RecoilRoot>
      </ApolloProvider>
    );

    expect(component).toMatchSnapshot();
  });

  test('If tooltip not displayed in not edit verified actionsCell', () => {
    render(
      <ApolloProvider client={client}>
        <RecoilRoot>
          <ActionsCell {...actionsCellProps} />
        </RecoilRoot>
      </ApolloProvider>
    );
    try {
      screen.getByTestId('actions-cell-test-id');
    } catch (e) {
      return;
    }
    throw Error('Tooltip displayed');
  });
  test('If tooltip displayed in edit verified actionsCell', () => {
    render(
      <ApolloProvider client={client}>
        <RecoilRoot>
          <ActionsCell {...actionsCellProps} isEditVerified />
        </RecoilRoot>
      </ApolloProvider>
    );
    screen.getByTestId('actions-cell-test-id');
  });

  test('If delete tooltip displayed in delete verified actionsCell', () => {
    render(
      <ApolloProvider client={client}>
        <RecoilRoot>
          <ActionsCell {...actionsCellProps} isDeleteVerified />
        </RecoilRoot>
      </ApolloProvider>
    );
    screen.getByTestId('actions-cell-delete-tooltip');
  });

  test('If delete tooltip not displayed in not delete verified actionsCell', () => {
    render(
      <ApolloProvider client={client}>
        <RecoilRoot>
          <ActionsCell {...actionsCellProps} />
        </RecoilRoot>
      </ApolloProvider>
    );
    try {
      screen.getByTestId('actions-cell-delete-tooltip');
    } catch (e) {
      return;
    }
    throw Error('Tooltip displayed');
  });
});
