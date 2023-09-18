import { render, screen } from '@testing-library/react';
import TableToolBar from '../TableToolBar';
import { GET_GROUPS } from '@/services/queries/groupQueries';
import { RecoilRoot } from 'recoil';
import { ApolloProvider } from '@apollo/client';
import client from '@/services/apolloClient';
import '@testing-library/jest-dom';

describe('If Table toolbar rendered correctly', () => {
  const setItemList = jest.fn();
  const tableToolbarProps = {
    field: 'field',
    searchLabel: 'Search',
    buttonLabel: 'Button',
    setItemList,
    searchQuery: GET_GROUPS
  };

  test('If snapshot rendered', () => {
    const component = render(
      <ApolloProvider client={client}>
        <RecoilRoot>
          <TableToolBar {...tableToolbarProps} />
        </RecoilRoot>
      </ApolloProvider>
    );

    expect(component).toMatchSnapshot();
  });

  test('If toolbar displayed if add is not verified', () => {
    render(
      <ApolloProvider client={client}>
        <RecoilRoot>
          <TableToolBar {...tableToolbarProps} isAddVerified={false} />
        </RecoilRoot>
      </ApolloProvider>
    );

    screen.getByTestId('toolbar-button-test-id');
  });

  test('If button label displayed if add is not verified', () => {
    render(
      <ApolloProvider client={client}>
        <RecoilRoot>
          <TableToolBar {...tableToolbarProps} isAddVerified={false} />
        </RecoilRoot>
      </ApolloProvider>
    );

    const element = screen.getByTestId('toolbar-button');

    expect(element).toHaveTextContent('Button');
  });
});
