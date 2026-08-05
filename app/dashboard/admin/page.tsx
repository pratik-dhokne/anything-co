"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { Input } from "@/components/ui/input";
import { Users, Briefcase, IndianRupee, ShieldAlert } from "lucide-react";

import { updateDoc, doc } from "firebase/firestore";
import { toast } from "sonner";
import {
  Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DashboardShell, StatCards } from "@/components/dashboard-shell";

const title = "Admin Dashboard — Anything.co";
const description = "Marketplace analytics: requests, GMV, partner verification queue and disputes.";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";




type ServiceRequest = {
  id: string;
  name: string;
  phone: string;
  category: string;
  location: string;
  details: string;
  status: string;
  createdAt: any;
};


// export const Route = createFileRoute("/dashboard/admin")({
//   component: AdminDashboard,
//   head: () => ({
//     meta: [
//       { title },
//       { name: "description", content: description },
//       { property: "og:title", content: title },
//       { property: "og:description", content: description },
//       { property: "og:type", content: "website" },
//       { property: "og:url", content: "/dashboard/admin" },
//       { name: "robots", content: "noindex" },
//     ],
//     links: [{ rel: "canonical", href: "/dashboard/admin" }],
//   }),
// });

const volume = [
  { m: "Feb", v: 12400 }, { m: "Mar", v: 14100 }, { m: "Apr", v: 13600 },
  { m: "May", v: 17200 }, { m: "Jun", v: 18900 }, { m: "Jul", v: 21500 },
];

const mix = [
  { name: "Home", value: 42 },
  { name: "Vehicle", value: 18 },
  { name: "Tech", value: 16 },
  { name: "Events", value: 13 },
  { name: "Delivery", value: 11 },
];

const colors = ["var(--primary)", "var(--accent)", "var(--success)", "var(--chart-3)", "var(--chart-4)"];

const queue = [
  ["PixelForge Studio", "Website Development", "Mumbai", "Pending"],
  ["Nova Event Co.", "Event Management", "Hyderabad", "In review"],
  ["QuickFix Motors", "Roadside Assistance", "Jaipur", "Pending"],
  ["GreenLeaf Pest", "Pest Control", "Chennai", "Approved"],
];

export default function AdminDashboard() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedDate, setSelectedDate] = useState("");
  const [sortOrder, setSortOrder] = useState("Newest");
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);




  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const q = query(collection(db, "service_requests"));

        const snapshot = await getDocs(q);

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<ServiceRequest, "id">),
        }));

        setRequests(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  //update status



  const updateStatus = async (
    id: string,
    status: "Accepted" | "Rejected"
  ) => {
    try {
      await updateDoc(doc(db, "service_requests", id), {
        status,
      });

      setRequests((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, status }
            : item
        )
      );

      toast.success(`Request ${status}`);
    } catch (err) {
      console.log(err);
      toast.error("Error updating request");
    }
  };

  const filteredRequests = requests
    .filter((request) => {

      // Search
      const matchesSearch =
        request.name.toLowerCase().includes(search.toLowerCase()) ||
        request.phone.includes(search) ||
        request.category.toLowerCase().includes(search.toLowerCase());

      if (!matchesSearch) return false;

      // Status
      if (
        statusFilter !== "All" &&
        request.status !== statusFilter
      ) {
        return false;
      }

      // Date
      if (selectedDate) {
        if (!request.createdAt?.toDate) return false;

        const requestDate = request.createdAt
          .toDate()
          .toISOString()
          .split("T")[0];

        if (requestDate !== selectedDate)
          return false;
      }

      return true;
    })
    .sort((a, b) => {
      if (!a.createdAt?.toDate || !b.createdAt?.toDate)
        return 0;

      return sortOrder === "Newest"
        ? b.createdAt.toDate().getTime() -
        a.createdAt.toDate().getTime()
        : a.createdAt.toDate().getTime() -
        b.createdAt.toDate().getTime();
    });

  const totalRequests = requests.length;

  const pendingRequests = requests.filter(
    (r) => r.status === "Pending"
  ).length;

  const acceptedRequests = requests.filter(
    (r) => r.status === "Accepted"
  ).length;

  const rejectedRequests = requests.filter(
    (r) => r.status === "Rejected"
  ).length;

  return (



    <DashboardShell
      role="Admin"
      title="Marketplace analytics"
      subtitle="Platform health across customers, partners and payments."
    >



      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 mb-6">

        <Card>
          <CardContent className="p-4 sm:p-6 text-center">
            <h3 className="text-sm sm:text-base text-gray-500">Total Requests</h3>
            <p className="text-2xl sm:text-3xl font-bold">
              {totalRequests}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6 text-center">
            <h3 className="text-sm sm:text-base text-yellow-500">
              Pending
            </h3>

            <p className="text-2xl sm:text-3xl font-bold">
              {pendingRequests}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6 text-center">
            <h3 className="text-sm sm:text-base text-green-600">
              Accepted
            </h3>

            <p className="text-2xl sm:text-3xl font-bold">
              {acceptedRequests}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6 text-center">
            <h3 className="text-sm sm:text-base text-red-600">
              Rejected
            </h3>

            <p className="text-2xl sm:text-3xl font-bold">
              {rejectedRequests}
            </p>
          </CardContent>
        </Card>

      </div>
      {/* <StatCards
        items={[
          { icon: Briefcase, label: "Requests (30d)", value: "21,500", hint: "+13.8%" },
          { icon: Users, label: "Active partners", value: "12,412" },
          { icon: IndianRupee, label: "GMV (30d)", value: "₹8.4 Cr", hint: "+9.2%" },
          { icon: ShieldAlert, label: "Open disputes", value: "23" },
        ]}
      /> */}

      {/* <div className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <Card className="border-0 shadow-soft">
          <CardHeader>
            <CardTitle className="text-base">Request volume</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={volume}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="m" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }}
                />
                <Bar dataKey="v" fill="var(--primary)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-soft">
          <CardHeader>
            <CardTitle className="text-base">Category mix</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={mix} dataKey="value" nameKey="name" innerRadius={55} outerRadius={95} paddingAngle={3}>
                  {mix.map((_, i) => (
                    <Cell key={i} fill={colors[i]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div> */}

      <Card className="border-0 shadow-soft">
        <CardHeader>
          <CardTitle className="text-base">Service requests</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          {/* <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Partner</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>City</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>


            <TableBody>

              {requests.map((request) => (

                //   <TableRow key={name}>
                //     <TableCell className="font-medium">{name}</TableCell>
                //     <TableCell>{cat}</TableCell>
                //     <TableCell>{city}</TableCell>
                //     <TableCell>
                //       <Badge variant={status === "Approved" ? "secondary" : "default"}>{status}</Badge>
                //     </TableCell>
                //     <TableCell className="text-right">
                //       <Button size="sm" variant="outline" className="rounded-full">
                //         Review
                //       </Button>
                //     </TableCell>
                //   </TableRow>
                // ))}
                <TableRow key={request.id}>
                  <TableCell className="font-medium">
                    {request.name}
                  </TableCell>

                  <TableCell>
                    {request.category}
                  </TableCell>

                  <TableCell>
                    {request.location}
                  </TableCell>

                  <TableCell>
                    <Badge>
                      {request.status}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-full"
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table> */}


          <div className="mb-6 grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full rounded-md border p-2 text-sm"
            >
              <option value="All">All Requests</option>
              <option value="Pending">Pending</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
            </select>

            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full rounded-md border p-2 text-sm"
            >
              <option value="Newest">Newest First</option>
              <option value="Oldest">Oldest First</option>
            </select>

            <input
              type="date"
              className="w-full rounded-md border p-2 text-sm"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />

          </div>

          <div className="mb-6">
            <Input
              type="text"
              placeholder="Search by customer, phone or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full"
            />
          </div>

          <div>
            {loading ? (
                <p>Loading...</p>
              ) : requests.length === 0 ? (
                <p>No service requests found.</p>
              ) : (
                <div className="grid gap-5">
                  {filteredRequests.map((request) => (
                    <Card
                      key={request.id}
                      className={
                        "rounded-xl shadow-sm p-4 sm:p-5 border-2 " +
                        (request.status === "Accepted"
                          ? "border-green-600"
                          : request.status === "Rejected"
                            ? "border-red-600"
                            : "border-yellow-500")
                      }
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <h2 className="text-lg font-bold truncate">
                          {request.name}
                        </h2>

                        <Badge
                          className={
                            request.status === "Accepted"
                              ? "bg-green-600 text-white shrink-0"
                              : request.status === "Rejected"
                                ? "bg-red-600 text-white shrink-0"
                                : "bg-yellow-500 text-black shrink-0"
                          }
                        >
                          {request.status}
                        </Badge>
                      </div>

                      <div className="mt-4 grid gap-3 sm:grid-cols-2">

                        <p>
                          <span className="font-semibold">Phone :</span>{" "}
                          {request.phone}
                        </p>

                        <p>
                          <span className="font-semibold">Category :</span>{" "}
                          {request.category}
                        </p>

                        <p>
                          <span className="font-semibold">Location :</span>{" "}
                          {request.location}
                        </p>

                        <p>
                          <span className="font-semibold">Description :</span>{" "}
                          {request.details}
                        </p>

                        <p>
                          <span className="font-semibold">Requested On :</span>{" "}
                          {request.createdAt?.toDate
                            ? request.createdAt.toDate().toLocaleString()
                            : "Not Available"}
                        </p>

                      </div>

                      <div className="mt-5 flex gap-2">

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              className="flex-1 sm:flex-none bg-green-600 hover:bg-green-700"
                              disabled={request.status !== "Pending"}
                            >
                              Accept
                            </Button>
                          </AlertDialogTrigger>

                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Accept Request?
                              </AlertDialogTitle>

                              <AlertDialogDescription>
                                Are you sure you want to accept this request?
                              </AlertDialogDescription>
                            </AlertDialogHeader>

                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>

                              <AlertDialogAction
                                onClick={() => updateStatus(request.id, "Accepted")}
                              >
                                Yes, Accept
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="destructive"
                              className="flex-1 sm:flex-none"
                              disabled={request.status !== "Pending"}
                            >
                              Reject
                            </Button>
                          </AlertDialogTrigger>

                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Reject Request?
                              </AlertDialogTitle>

                              <AlertDialogDescription>
                                Are you sure you want to reject this request?
                              </AlertDialogDescription>
                            </AlertDialogHeader>

                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>

                              <AlertDialogAction
                                onClick={() => updateStatus(request.id, "Rejected")}
                              >
                                Yes, Reject
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>

                      </div>
                    </Card>
                  ))}
                </div>
              )}
          </div>
        </CardContent>
      </Card>
    </DashboardShell>
  );
}