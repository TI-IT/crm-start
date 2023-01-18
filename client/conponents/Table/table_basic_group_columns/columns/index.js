import { format } from 'date-fns';

export const GROUP_COLUMNS = [
  {
    Header: 'Id',
    accessor: 'id',
  },
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'Name',
    columns: [
      {
        Header: 'FirstName',
        accessor: 'firstName',
      },
      {
        Header: 'LastName',
        accessor: 'lastName',
      },
    ],
  },
  {
    Header: 'Info',
    columns: [
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
    ],
  },
];
