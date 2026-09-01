"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { authClient } from "@/lib/auth-client";

const PAGE_SIZE = 20;

export function AdminUsersTable() {
  const queryClient = useQueryClient();
  const { data: session } = authClient.useSession();
  const currentUserId = session?.user.id;
  const [search, setSearch] = useState("");
  const [offset, setOffset] = useState(0);
  const [actionError, setActionError] = useState<string | null>(null);

  const usersQuery = useQuery({
    queryKey: ["admin-users", search, offset],
    queryFn: async () => {
      const { data, error } = await authClient.admin.listUsers({
        query: {
          limit: PAGE_SIZE,
          offset,
          sortBy: "createdAt",
          sortDirection: "desc",
          ...(search.trim()
            ? {
                searchValue: search.trim(),
                searchField: "email" as const,
                searchOperator: "contains" as const,
              }
            : {}),
        },
      });
      if (error) {
        throw new Error(error.message ?? "Failed to load users");
      }
      return data;
    },
  });

  const invalidateUsers = () => queryClient.invalidateQueries({ queryKey: ["admin-users"] });

  const setRole = useMutation({
    mutationFn: async ({ userId, role }: { userId: string; role: "admin" | "user" }) => {
      const { error } = await authClient.admin.setRole({ userId, role });
      if (error) {
        throw new Error(error.message ?? "Failed to update role");
      }
    },
    onSuccess: invalidateUsers,
    onError: (error: Error) => setActionError(error.message),
  });

  const banUser = useMutation({
    mutationFn: async (userId: string) => {
      const { error } = await authClient.admin.banUser({
        userId,
        banReason: "Banned by admin",
      });
      if (error) {
        throw new Error(error.message ?? "Failed to ban user");
      }
    },
    onSuccess: invalidateUsers,
    onError: (error: Error) => setActionError(error.message),
  });

  const unbanUser = useMutation({
    mutationFn: async (userId: string) => {
      const { error } = await authClient.admin.unbanUser({ userId });
      if (error) {
        throw new Error(error.message ?? "Failed to unban user");
      }
    },
    onSuccess: invalidateUsers,
    onError: (error: Error) => setActionError(error.message),
  });

  const users = usersQuery.data?.users ?? [];
  const total = usersQuery.data?.total ?? 0;
  const canGoNext = offset + PAGE_SIZE < total;
  const canGoPrevious = offset > 0;
  const isMutating = setRole.isPending || banUser.isPending || unbanUser.isPending;

  return (
    <Card>
      <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <CardTitle>Users</CardTitle>
        <form
          className="w-full sm:max-w-xs"
          onSubmit={(event) => {
            event.preventDefault();
            const form = new FormData(event.currentTarget);
            setOffset(0);
            setSearch(String(form.get("search") ?? ""));
          }}
        >
          <Input name="search" placeholder="Search by email" defaultValue={search} />
        </form>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {actionError ? <p className="text-sm text-destructive">{actionError}</p> : null}
        {usersQuery.error ? (
          <p className="text-sm text-destructive">
            {usersQuery.error instanceof Error ? usersQuery.error.message : "Failed to load users"}
          </p>
        ) : null}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {usersQuery.isPending ? (
              <TableRow>
                <TableCell colSpan={5} className="text-muted-foreground">
                  Loading users...
                </TableCell>
              </TableRow>
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-muted-foreground">
                  No users found.
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => {
                const role = Array.isArray(user.role) ? user.role[0] : (user.role ?? "user");
                const isCurrentUser = user.id === currentUserId;
                return (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Select
                        value={role === "admin" ? "admin" : "user"}
                        disabled={isMutating || isCurrentUser}
                        onValueChange={(value) =>
                          setRole.mutate({ userId: user.id, role: value as "admin" | "user" })
                        }
                      >
                        <SelectTrigger size="sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="user">user</SelectItem>
                          <SelectItem value="admin">admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      {user.banned ? (
                        <Badge variant="destructive">Banned</Badge>
                      ) : (
                        <Badge variant="secondary">Active</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {user.banned ? (
                        <Button
                          size="sm"
                          variant="outline"
                          disabled={isMutating || isCurrentUser}
                          onClick={() => unbanUser.mutate(user.id)}
                        >
                          Unban
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="destructive"
                          disabled={isMutating || isCurrentUser}
                          onClick={() => banUser.mutate(user.id)}
                        >
                          Ban
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            {total} user{total === 1 ? "" : "s"}
          </span>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              disabled={!canGoPrevious || usersQuery.isPending}
              onClick={() => setOffset((current) => Math.max(0, current - PAGE_SIZE))}
            >
              Previous
            </Button>
            <Button
              size="sm"
              variant="outline"
              disabled={!canGoNext || usersQuery.isPending}
              onClick={() => setOffset((current) => current + PAGE_SIZE)}
            >
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
