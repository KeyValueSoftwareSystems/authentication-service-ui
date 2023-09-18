import React from 'react';
import { RecoilRoot } from 'recoil';
import { ApolloProvider } from '@apollo/client';
import { fireEvent, screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';

import client from '@/services/apolloClient';
import SearchBar from '../SearchBar';

describe('SearchBar Component', () => {
  const { parse } = require('graphql');

  // Define a dummy GraphQL query as a string
  const dummyQuery = `
    query {
      dummyField
    }
  `;
  const searchLabel = 'Search something';
  const setItemList = jest.fn();
  const customSearchStyle = { backgroundColor: 'red' };
  const customBarStyle = { border: '2px solid blue' };
  const customIconStyle = { color: 'green' };

  const SearchBarComponent = () => (
    <RecoilRoot>
      <ApolloProvider client={client}>
        <SearchBar
          searchLabel={searchLabel}
          setItemList={setItemList}
          searchQuery={dummyDocumentNode}
          customSearchStyle={customSearchStyle}
          customBarStyle={customBarStyle}
          customIconStyle={customIconStyle}
        />
      </ApolloProvider>
    </RecoilRoot>
  );

  // Parse the dummy query into a DocumentNode
  const dummyDocumentNode = parse(dummyQuery);

  test('snapshot test for SearchBar component', () => {
    const component = render(<SearchBarComponent />);

    expect(component).toMatchSnapshot();
  });
  test('renders the search bar with placeholder', () => {
    render(<SearchBarComponent />);

    const searchBar = screen.getByPlaceholderText(searchLabel);
    const searchIcon = screen.getByTestId('search-icon');

    expect(searchBar).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();
  });

  test('handles search input and triggers onChange event', () => {
    render(<SearchBarComponent />);

    const searchBar = screen.getByPlaceholderText(searchLabel);

    fireEvent.change(searchBar, { target: { value: 'test query' } });

    expect(searchBar).toHaveValue('test query');
  });
});
