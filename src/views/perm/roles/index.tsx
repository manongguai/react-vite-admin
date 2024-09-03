import { getAllRoles } from '@/api/role'

export default function RolesPage() {
  getAllRoles()
  return <div>角色管理</div>
}
