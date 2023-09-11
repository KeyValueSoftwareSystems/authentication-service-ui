import { fireEvent, render, screen } from '@testing-library/react';
import { ApolloProvider } from '@apollo/client';
import '@testing-library/jest-dom';

import client from '@/services/apolloClient';
import { StatusChip } from '../StatusChip';

const mockRow = {
  id: '1',
  status: 'INVITED',
  inviteToken: 'example-token'
};

declare global {
  interface Window {
    refreshInviteToken: jest.Mock;
  }
}

jest.mock('../StatusChip', () => ({
  ...jest.requireActual('../StatusChip'),
  refreshInviteToken: jest.fn()
}));

describe('StatusChip Component', () => {
  test('renders the chip element', () => {
    render(
      <ApolloProvider client={client}>
        <StatusChip row={mockRow} />
      </ApolloProvider>
    );

    const chipElement = screen.getByTestId('chip');
    const statusLabel = screen.getByText('Invited');

    expect(chipElement).toBeInTheDocument();
    expect(statusLabel).toBeInTheDocument();
  });

  it('renders the RefreshIcon and ContentCopyIcon when status is INVITED', () => {
    render(
      <ApolloProvider client={client}>
        <StatusChip row={mockRow} />
      </ApolloProvider>
    );

    const refreshIcon = screen.getByTestId('refresh');
    const copyIcon = screen.getByTestId('copy');

    expect(refreshIcon).toBeInTheDocument();
    expect(copyIcon).toBeInTheDocument();
  });

  it('does not renders the RefreshIcon and ContentCopyIcon when status is INVITED', () => {
    const mockRow1 = {
      id: '1',
      status: 'ACTIVE',
      inviteToken: 'example-token'
    };

    render(
      <ApolloProvider client={client}>
        <StatusChip row={mockRow1} />
      </ApolloProvider>
    );

    const refreshIcon = screen.queryByTestId('refresh');
    const copyIcon = screen.queryByTestId('copy');

    expect(refreshIcon).not.toBeInTheDocument();
    expect(copyIcon).not.toBeInTheDocument();
  });

  it('copies the invite link when Copy Invite Link icon is clicked', () => {
    const writeTextMock = jest.fn();

    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: writeTextMock }
    });

    render(
      <ApolloProvider client={client}>
        <StatusChip row={mockRow} />
      </ApolloProvider>
    );

    const copyIcon = screen.getByTestId('copy');

    fireEvent.click(copyIcon);

    // Assert that the clipboard writeText function was called with the invite link
    expect(writeTextMock).toHaveBeenCalledTimes(1);

    // Clean up the spy
    writeTextMock.mockRestore();
  });

  test('matches snapshot', () => {
    const component = render(
      <ApolloProvider client={client}>
        <StatusChip row={mockRow} />
      </ApolloProvider>
    );

    expect(component).toMatchSnapshot();
  });
});
