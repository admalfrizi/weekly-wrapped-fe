"use client"

import { DataTableColumnHeader } from "@/components/data-tables/data-table-column-header"
import { DataTableRowActions } from "@/components/data-tables/data-table-row-actions"
import type { ColumnDef } from "@tanstack/react-table"

interface ActivityColumnsOptions {
  onEdit?: (book: Activity) => void
  onDelete?: (book: Activity) => void
}

export function activityColumns({ onEdit, onDelete }: ActivityColumnsOptions = {}): ColumnDef<Activity>[] {
  return [
    {
      id: "no",
      header: ({ column }) => <DataTableColumnHeader column={column} title="No" />,
      cell: ({ row, table }) => {
        const { pageIndex, pageSize } = table.getState().pagination
        return pageIndex * pageSize + row.index + 1
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "category.name",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Kategori" />,
    },
    {
      accessorKey: "value",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Berapa Lama" />,
    },
    {
      accessorKey: "note",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Catatan" />,
    },
    {
      accessorKey: "occurred_at",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Tanggal Kapna " />,
    },
    {
      accessorKey: "actions",
      header: "Aksi",
      cell: ({ row }) => (
        <DataTableRowActions
          onEdit={onEdit ? () => onEdit(row.original) : undefined}
          onDelete={onDelete ? () => onDelete(row.original) : undefined}
        />
      ),
    },
  ]
}