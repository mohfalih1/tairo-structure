import type { TableHeader } from '@/components/app-table/types'

export const tableHeader: TableHeader[] = [
    {
        key: 'id',
        label: 'التسلسل',
    },
    {
        key: 'name',
        label: 'اسم الشخص',
    },
    // {
    //     key: 'role',
    //     label: 'الصفة',
    // },
    {
        key: 'phonenumber',
        label: 'رقم الهاتف',
    },
    {
        key: 'role',
        label: 'الدور',
    },
    // {
    //     key: 'gender',
    //     label: 'الجنس',
    // },
    // {
    //     key: 'birthDay',
    //     label: 'تاريخ الميلاد',
    // },
    {
        key: 'actions',
        label: 'الاجرائات',
    },
]
