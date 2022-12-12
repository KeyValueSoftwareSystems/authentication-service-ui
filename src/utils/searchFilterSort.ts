import { LazyQueryExecFunction, OperationVariables } from "@apollo/client";
import { FilterConditions, SortDirection } from "../services/constants";

export const searchFilterSort = (
  count: number,
  checkedGroups: never[],
  checkedStatus: never[],
  filterQuery: LazyQueryExecFunction<any, OperationVariables>,
  searchValue: string
) => {
  if (count === 1) {
    if (checkedGroups.length > 0 && checkedStatus.length > 0) {
      if (searchValue.length > 0) {
        filterQuery({
          variables: {
            value: searchValue,
            filter: {
              operands: [
                {
                  condition: FilterConditions.EQUALS,
                  field: "status",
                  value: checkedStatus,
                },
                {
                  condition: FilterConditions.EQUALS,
                  field: "group",
                  value: checkedGroups,
                },
              ],
            },
            sort: { field: "firstName", direction: SortDirection.ASC },
          },
        });
      } else {
        filterQuery({
          variables: {
            filter: {
              operands: [
                {
                  condition: FilterConditions.EQUALS,
                  field: "status",
                  value: checkedStatus,
                },
                {
                  condition: FilterConditions.EQUALS,
                  field: "group",
                  value: checkedGroups,
                },
              ],
            },
            sort: { field: "firstName", direction: SortDirection.ASC },
          },
        });
      }
    } else if (checkedGroups.length > 0) {
      if (searchValue.length > 0) {
        filterQuery({
          variables: {
            value: searchValue,
            filter: {
              operands: {
                condition: FilterConditions.EQUALS,
                field: "group",
                value: checkedGroups,
              },
            },
            sort: { field: "firstName", direction: SortDirection.ASC },
          },
        });
      } else {
        filterQuery({
          variables: {
            filter: {
              operands: {
                condition: FilterConditions.EQUALS,
                field: "group",
                value: checkedGroups,
              },
            },
            sort: { field: "firstName", direction: SortDirection.ASC },
          },
        });
      }
    } else if (checkedStatus.length > 0) {
      if (searchValue.length > 0) {
        filterQuery({
          variables: {
            value: searchValue,
            filter: {
              operands: {
                condition: FilterConditions.EQUALS,
                field: "status",
                value: checkedStatus,
              },
            },
            sort: { field: "firstName", direction: SortDirection.ASC },
          },
        });
      } else {
        if (searchValue.length > 0) {
          filterQuery({
            variables: {
              value: searchValue,
              filter: {
                operands: {
                  condition: FilterConditions.EQUALS,
                  field: "status",
                  value: checkedStatus,
                },
              },
              sort: { field: "firstName", direction: SortDirection.ASC },
            },
          });
        } else {
          filterQuery({
            variables: {
              filter: {
                operands: {
                  condition: FilterConditions.EQUALS,
                  field: "status",
                  value: checkedStatus,
                },
              },
              sort: { field: "firstName", direction: SortDirection.ASC },
            },
          });
        }
      }
    } else {
      if (searchValue.length > 0) {
        filterQuery({
          variables: {
            value: searchValue,
            sort: { field: "firstName", direction: SortDirection.ASC },
          },
        });
      } else {
        filterQuery({
          variables: {
            sort: { field: "firstName", direction: SortDirection.ASC },
          },
        });
      }
    }
  } else if (count === 2) {
    if (checkedGroups.length > 0 && checkedStatus.length > 0) {
      if (searchValue.length > 0) {
        filterQuery({
          variables: {
            value: searchValue,
            filter: {
              operands: [
                {
                  condition: FilterConditions.EQUALS,
                  field: "status",
                  value: checkedStatus,
                },
                {
                  condition: FilterConditions.EQUALS,
                  field: "group",
                  value: checkedGroups,
                },
              ],
            },
            sort: {
              field: "firstName",
              direction: SortDirection.DESC,
            },
          },
        });
      } else {
        filterQuery({
          variables: {
            filter: {
              operands: [
                {
                  condition: FilterConditions.EQUALS,
                  field: "status",
                  value: checkedStatus,
                },
                {
                  condition: FilterConditions.EQUALS,
                  field: "group",
                  value: checkedGroups,
                },
              ],
            },
            sort: {
              field: "firstName",
              direction: SortDirection.DESC,
            },
          },
        });
      }
    } else if (checkedGroups.length > 0) {
      if (searchValue.length > 0) {
        filterQuery({
          variables: {
            value: searchValue,
            filter: {
              operands: {
                condition: FilterConditions.EQUALS,
                field: "group",
                value: checkedGroups,
              },
            },
            sort: {
              field: "firstName",
              direction: SortDirection.DESC,
            },
          },
        });
      } else {
        filterQuery({
          variables: {
            filter: {
              operands: {
                condition: FilterConditions.EQUALS,
                field: "group",
                value: checkedGroups,
              },
            },
            sort: {
              field: "firstName",
              direction: SortDirection.DESC,
            },
          },
        });
      }
    } else if (checkedStatus.length > 0) {
      if (searchValue.length > 0) {
        filterQuery({
          variables: {
            value: searchValue,
            filter: {
              operands: {
                condition: FilterConditions.EQUALS,
                field: "status",
                value: checkedStatus,
              },
            },
            sort: {
              field: "firstName",
              direction: SortDirection.DESC,
            },
          },
        });
      } else {
        filterQuery({
          variables: {
            filter: {
              operands: {
                condition: FilterConditions.EQUALS,
                field: "status",
                value: checkedStatus,
              },
            },
            sort: {
              field: "firstName",
              direction: SortDirection.DESC,
            },
          },
        });
      }
    } else {
      if (searchValue.length > 0) {
        filterQuery({
          variables: {
            value: searchValue,
            sort: { field: "firstName", direction: SortDirection.DESC },
          },
        });
      } else {
        filterQuery({
          variables: {
            sort: { field: "firstName", direction: SortDirection.DESC },
          },
        });
      }
    }
  } else {
    if (checkedGroups.length > 0 && checkedStatus.length > 0) {
      if (searchValue.length > 0) {
        filterQuery({
          variables: {
            value: searchValue,
            filter: {
              operands: [
                {
                  condition: FilterConditions.EQUALS,
                  field: "status",
                  value: checkedStatus,
                },
                {
                  condition: FilterConditions.EQUALS,
                  field: "group",
                  value: checkedGroups,
                },
              ],
            },
          },
        });
      } else {
        filterQuery({
          variables: {
            filter: {
              operands: [
                {
                  condition: FilterConditions.EQUALS,
                  field: "status",
                  value: checkedStatus,
                },
                {
                  condition: FilterConditions.EQUALS,
                  field: "group",
                  value: checkedGroups,
                },
              ],
            },
          },
        });
      }
    } else if (checkedGroups.length > 0) {
      if (searchValue.length > 0) {
        filterQuery({
          variables: {
            value: searchValue,
            filter: {
              operands: {
                condition: FilterConditions.EQUALS,
                field: "group",
                value: checkedGroups,
              },
            },
          },
        });
      } else {
        filterQuery({
          variables: {
            filter: {
              operands: {
                condition: FilterConditions.EQUALS,
                field: "group",
                value: checkedGroups,
              },
            },
          },
        });
      }
    } else if (checkedStatus.length > 0) {
      if (searchValue.length > 0) {
        filterQuery({
          variables: {
            value: searchValue,
            filter: {
              operands: {
                condition: FilterConditions.EQUALS,
                field: "status",
                value: checkedStatus,
              },
            },
          },
        });
      } else {
        filterQuery({
          variables: {
            filter: {
              operands: {
                condition: FilterConditions.EQUALS,
                field: "status",
                value: checkedStatus,
              },
            },
          },
        });
      }
    } else {
      if (searchValue.length > 0) {
        filterQuery({
          variables: {
            value: searchValue,
          },
        });
      } else {
        filterQuery();
      }
    }
  }
};
