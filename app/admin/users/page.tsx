import { Suspense } from "react";

import Link from "next/link";

import {
  Table,
  TableHead,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { getAllUsers } from "@/lib/actions/user.actions";

import { requireAdmin } from "@/lib/auth-gaurd";

import Pagination from "@/components/shared/pagination";
import DeleteDialog from "@/components/shared/deleteDialog";

import { formatId } from "@/lib/utils";

type SearchParams = Promise<{ page: string }>;

function AdminUserPage(props: { searchParams: SearchParams }) {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <AdminUserContent searchParams={props.searchParams} />
    </Suspense>
  );
}

async function AdminUserContent(props: { searchParams: SearchParams }) {
  await requireAdmin();
  const { page = "1" } = await props.searchParams;
  const users = await getAllUsers({ page: Number(page) });

  const showUsers = users.data.map((user) => (
    <TableRow key={user.id}>
      <TableCell className="text-left">{formatId(user.id)}</TableCell>
      <TableCell className="text-left">{user.name}</TableCell>
      <TableCell className="text-left">{user.email}</TableCell>
      <TableCell className="text-left">
        {user.role === "user" ? (
          <Badge variant="secondary">User</Badge>
        ) : (
          <Badge variant="default">Admin</Badge>
        )}
      </TableCell>
      <TableCell className="text-right">
        <Link href={`/admin/users/${user.id}`}>
          <Button variant="outline" size="sm">
            Edit
          </Button>
        </Link>
      </TableCell>
    </TableRow>
  ));

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <h1 className="font-bold text-3xl lg:text-4xl">Users</h1>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">Id</TableHead>
              <TableHead className="text-left">Name</TableHead>
              <TableHead className="text-left">Email</TableHead>
              <TableHead className="text-left">Role</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>{showUsers}</TableBody>
        </Table>

        {users.totalPages > 1 && (
          <Pagination page={Number(page) || 1} totalPages={users?.totalPages} />
        )}
      </div>
    </div>
  );
}

export default AdminUserPage;
