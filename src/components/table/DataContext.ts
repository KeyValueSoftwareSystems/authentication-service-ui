import { createContext } from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DataContext = createContext({ setLoading: (loading: boolean) => {} });

export default DataContext;
