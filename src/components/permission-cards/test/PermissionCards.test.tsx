import { render } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import PermissionCards from '../PermissionCards';
import { ApolloProvider } from '@apollo/client';
import client from '@/services/apolloClient';

describe('If permission cards rendered correctlt', () => {
  test('If snapshot rendered', () => {
    const component = render(
      <ApolloProvider client={client}>
        <RecoilRoot>
          <PermissionCards />
        </RecoilRoot>
      </ApolloProvider>
    );

    expect(component).toMatchSnapshot();
  });
});
