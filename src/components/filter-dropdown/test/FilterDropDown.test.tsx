import { render } from '@testing-library/react';
import FilterDropdown from '../FilterDropDown';
import { GET_GROUPS } from '@/services/queries/groupQueries';
import { RecoilRoot } from 'recoil';
import { ApolloProvider } from '@apollo/client';
import client from '@/services/apolloClient';

describe('If Filter dropdown rendered correctly', () => {
  const setItemList = jest.fn();
  const onApply = jest.fn();
  const setCheckedFilters = jest.fn();
  const filterDropDownProps = {
    filterQuery: GET_GROUPS,
    setItemList,
    field: '',
    open: false,
    anchorEl: null,
    onApply,
    filterName: [],
    currentFilters: [[]],
    filters: [[]],
    checkedFilters: [[]],
    setCheckedFilters: [setCheckedFilters],
    viewFiltersVerified: [false]
  };

  test('If snapshot rendered', () => {
    const component = render(
      <ApolloProvider client={client}>
        <RecoilRoot>
          <FilterDropdown {...filterDropDownProps} />
        </RecoilRoot>
      </ApolloProvider>
    );

    expect(component).toMatchSnapshot();
  });
});
