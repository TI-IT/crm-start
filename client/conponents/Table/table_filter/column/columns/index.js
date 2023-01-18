import { format } from 'date-fns';
// import { FilterColumn } from '../filter/column';

export const COLUMNS = [
  {
    Header: 'Id',
    accessor: 'id',
    // Filter: FilterColumn,
    disableFilters: true,
  },
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'FirstName',
    accessor: 'firstName',
  },
  {
    Header: 'LastName',
    accessor: 'lastName',
  },
  {
    Header: 'Email',
    accessor: 'email',
  },
  {
    Header: 'Phone',
    accessor: 'phone',
    Cell: ({ value }) => {
      return value + ' text';
    },
  },
  {
    Header: 'Date',
    accessor: 'date_of_birth',
    Cell: ({ value }) => {
      return format(new Date(value), 'dd.MM.yyyy' + 'г.');
    },
  },
];
