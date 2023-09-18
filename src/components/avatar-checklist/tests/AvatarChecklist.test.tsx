import { RecoilRoot } from 'recoil';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ApolloProvider } from '@apollo/client';
import '@testing-library/jest-dom';

import { GET_USERS } from '@/services/queries/userQueries';
import { selectAllValue } from '@/constants/filters';
import { AvatarChecklistComponent } from '../AvatarChecklist';
import client from '@/services/apolloClient';

const mockMapList = [
  {
    id: '1',
    phone: '000',
    email: 'johndoe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    middleName: 'J',
    status: 'Active',
    permissions: [
      { id: '1', name: 'P1', label: 'Permission 1' },
      { id: '2', name: 'P2', label: 'Permission 2' }
    ]
  },
  {
    id: '2',
    phone: '000',
    email: 'johndoe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    middleName: 'J',
    status: 'Active',
    permissions: [
      { id: '1', name: 'P1', label: 'Permission 1' },
      { id: '2', name: 'P2', label: 'Permission 2' }
    ]
  }
];

const mockCurrentCheckedItems = [
  {
    id: '2',
    phone: '000',
    email: 'johndoe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    middleName: 'J',
    status: 'Active',
    permissions: [
      { id: '1', name: 'P1', label: 'Permission 1' },
      { id: '2', name: 'P2', label: 'Permission 2' }
    ]
  }
];

describe('AvatarChecklistComponent', () => {
  const onChangeMock = jest.fn();
  const setItemListMock = jest.fn();
  const mockUseRecoil = jest.spyOn(require('recoil'), 'useRecoilValue');

  beforeEach(() => {
    onChangeMock.mockClear();
    setItemListMock.mockClear();
  });

  test('renders AvatarChecklistComponent with user avatars', () => {
    render(
      <RecoilRoot>
        <ApolloProvider client={client}>
          <AvatarChecklistComponent
            mapList={mockMapList}
            currentCheckedItems={mockCurrentCheckedItems}
            onChange={onChangeMock}
            setItemList={setItemListMock}
            searchQuery={GET_USERS}
          />
        </ApolloProvider>
      </RecoilRoot>
    );
    mockUseRecoil.mockReturnValue('');
    const checkbox = screen.getByTestId('select-all');
    const checkboxList = screen.getAllByTestId('indivitual-checkbox');

    expect(checkbox).toBeInTheDocument();
    expect(checkboxList).toHaveLength(2);
  });

  test('checks "Select All" checkbox when clicked and calls onChange', () => {
    render(
      <RecoilRoot>
        <ApolloProvider client={client}>
          <AvatarChecklistComponent
            mapList={mockMapList}
            currentCheckedItems={mockCurrentCheckedItems}
            onChange={onChangeMock}
            setItemList={setItemListMock}
            searchQuery={GET_USERS}
          />
        </ApolloProvider>
      </RecoilRoot>
    );

    const selectAllCheckbox = screen.getByTestId('select-all');

    if (!selectAllCheckbox) throw new Error('Checked icon is not present');

    fireEvent.click(selectAllCheckbox);

    waitFor(() => {
      expect(screen.getByTestId('select-all')).toHaveAttribute('value', selectAllValue);
      expect(onChangeMock).toHaveBeenCalledTimes(1);
    });
  });

  test('unchecks "Select All" checkbox when clicked again', () => {
    render(
      <RecoilRoot>
        <ApolloProvider client={client}>
          <AvatarChecklistComponent
            mapList={mockMapList}
            currentCheckedItems={mockCurrentCheckedItems}
            onChange={onChangeMock}
            setItemList={setItemListMock}
            searchQuery={GET_USERS}
          />
        </ApolloProvider>
      </RecoilRoot>
    );

    const selectAllCheckbox = screen.getByTestId('select-all');

    fireEvent.click(selectAllCheckbox);
    fireEvent.click(selectAllCheckbox);

    expect(selectAllCheckbox).not.toBeChecked();
  });

  test('matches snapshot', () => {
    const component = render(
      <RecoilRoot>
        <ApolloProvider client={client}>
          <AvatarChecklistComponent
            mapList={mockMapList}
            currentCheckedItems={mockCurrentCheckedItems}
            onChange={onChangeMock}
            setItemList={setItemListMock}
            searchQuery={GET_USERS}
          />
        </ApolloProvider>
      </RecoilRoot>
    );

    expect(component).toMatchSnapshot();
  });
});
