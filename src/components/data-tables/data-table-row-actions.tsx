import { Button } from "../ui/button"

interface DataTableRowActionsProps {
  onEdit?: () => void
  onDelete?: () => void
}

export function DataTableRowActions({ onEdit, onDelete }: DataTableRowActionsProps) {
  return (
    <div className="flex flex-row gap-x-3">
      <Button variant="outline" className="bg-cyan-600 text-white" onClick={onEdit}>
        Edit Data
      </Button>
      <Button variant="destructive" onClick={onDelete}>
        Hapus
      </Button>
    </div>
  )
}