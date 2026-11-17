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

  return <div>Admin Users Page</div>;
}

export default AdminUserPage;
