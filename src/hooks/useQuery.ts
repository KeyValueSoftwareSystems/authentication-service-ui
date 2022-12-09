import {
  useQuery,
  ApolloError,
  DocumentNode,
  BaseMutationOptions,
  OperationVariables,
  DefaultContext,
  ApolloCache,
} from "@apollo/client";
import { useSetRecoilState } from "recoil";
import { apiRequestAtom, toastMessageAtom } from "../states/apiRequestState";

export const useCustomQuery = (
  query: DocumentNode,
  onComplete: (
    data: any,
    clientOptions?:
      | BaseMutationOptions<
          any,
          OperationVariables,
          DefaultContext,
          ApolloCache<any>
        >
      | undefined
  ) => void,
  variables?: any,
  skip?: boolean | undefined
) => {
  const setToastMessage = useSetRecoilState(toastMessageAtom);
  const setApiSuccess = useSetRecoilState(apiRequestAtom);
  const { loading, data, error } = useQuery(query, {
    skip: skip,
    variables: variables,
    onCompleted: (data) => {
      onComplete(data);
    },
    onError: (error: ApolloError) => {
      setToastMessage(error.message);
      setApiSuccess(false);
    },
    fetchPolicy: "network-only",
  });
  return { loading, data, error };
};
