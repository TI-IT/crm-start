import { format } from 'date-fns';

export const COLUMNS = [
  {
    Header: 'Id',
    accessor: '_id',
  },
  {
    Header: 'Поставщик',
    accessor: 'contractor',
  },
  {
    Header: 'Тип',
    accessor: 'type',
  },
  {
    Header: 'Категория',
    accessor: 'category',
  },
  {
    Header: 'Подкатегория',
    accessor: 'subCategory',
  },
  {
    Header: 'Наименование',
    accessor: 'name',
  },
  {
    Header: 'Артикул',
    accessor: 'article',
  },
  {
    Header: 'Отделка',
    accessor: 'finishing',
  },
  {
    Header: 'Ед-из.',
    accessor: 'unit',
  },
  {
    Header: 'Себестоимость',
    accessor: 'costPrice',
  },
  {
    Header: 'Сылка фото',
    accessor: 'urlImage',
  },
];
