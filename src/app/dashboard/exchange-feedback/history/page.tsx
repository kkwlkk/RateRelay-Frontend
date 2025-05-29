'use client';

import { DataTable, PaginationParams, PaginationResponse, ColumnDef } from '@/components/DataTable/DataTable';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';

// Example data type
type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  createdAt: string;
};

export default function UsersPage() {
  // Example columns definition with various patterns
  const columns: ColumnDef<User>[] = [
    {
      id: 'name',
      header: 'Name',
      accessorKey: 'name',
      sortable: true,
    },
    {
      id: 'email',
      header: 'Email',
      accessorKey: 'email',
    },
    {
      id: 'role',
      header: 'Role',
      accessorKey: 'role',
      sortable: true,
      // Custom cell renderer for roles
      cell: (row) => {
        const roleColors = {
          'Admin': 'bg-red-100 text-red-800 border-red-200',
          'Editor': 'bg-blue-100 text-blue-800 border-blue-200',
          'User': 'bg-green-100 text-green-800 border-green-200',
        };
        
        // @ts-expect-error asdadasd
        const colorClass = roleColors[row.role] || 'bg-gray-100 text-gray-800 border-gray-200';
        
        return (
          <Badge className={colorClass}>
            {row.role}
          </Badge>
        );
      }
    },
    {
      id: 'status',
      header: 'Status',
      accessorKey: 'status',
      sortable: true,
      cell: (row) => (
        <Badge 
          className={row.status === 'active' 
            ? 'bg-emerald-100 text-emerald-800 border-emerald-200' 
            : 'bg-gray-100 text-gray-800 border-gray-200'
          }
        >
          {row.status}
        </Badge>
      )
    },
    {
      id: 'createdAt',
      header: 'Created At',
      accessorKey: 'createdAt',
      sortable: true,
      cell: (row) => new Date(row.createdAt).toLocaleDateString(),
    },
    {
      id: 'actions',
      header: 'Actions',
      // Custom cell renderer for actions column
      cell: (row) => (
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              console.log('Edit user:', row);
            }}
          >
            <Edit className="w-4 h-4 mr-1" /> Edit
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              console.log('Delete user:', row);
            }}
          >
            <Trash2 className="w-4 h-4 mr-1" /> Delete
          </Button>
        </div>
      ),
    },
  ];
  
  // Example data fetching function that would call your API
  const fetchUsers = async (params: PaginationParams): Promise<PaginationResponse<User>> => {
    console.log('Fetching with params:', params);
    
    // In a real application, you would make a fetch request to your API
    // For example:
    // const response = await fetch(
    //   `/api/users?page=${params.page}&pageSize=${params.pageSize}` +
    //   `${params.sortBy ? `&sortBy=${params.sortBy}` : ''}` +
    //   `${params.sortOrder ? `&sortOrder=${params.sortOrder}` : ''}` +
    //   `${params.filters ? `&filters=${JSON.stringify(params.filters)}` : ''}`
    // );
    // return await response.json();
    
    // For this example, we'll just return mock data with a delay
    return new Promise((resolve) => {
      // Simulate API call delay
      setTimeout(() => {
        // Create mock users based on pagination params
        const mockUsers: User[] = Array.from({ length: params.pageSize }, (_, i) => {
          const index = (params.page - 1) * params.pageSize + i;
          return {
            id: index + 1,
            name: `User ${index + 1}`,
            email: `user${index + 1}@example.com`,
            role: index % 3 === 0 ? 'Admin' : index % 3 === 1 ? 'Editor' : 'User',
            status: index % 5 === 0 ? 'inactive' : 'active',
            createdAt: new Date(Date.now() - index * 86400000).toISOString(),
          };
        });
        
        // Sort the data if required
        if (params.sortBy) {
          mockUsers.sort((a, b) => {
            // @ts-expect-error asdadasd
            const valueA = a[params.sortBy!];
            // @ts-expect-error asdadasd
            const valueB = b[params.sortBy!];
            
            if (typeof valueA === 'string' && typeof valueB === 'string') {
              return params.sortOrder === 'desc' 
                ? valueB.localeCompare(valueA) 
                : valueA.localeCompare(valueB);
            }
            
            return params.sortOrder === 'desc' 
              ? (valueB > valueA ? 1 : -1) 
              : (valueA > valueB ? 1 : -1);
          });
        }
        
        // Return paginated response
        resolve({
          data: mockUsers,
          metadata: {
            totalCount: 100, // Total number of records
            pageSize: params.pageSize,
            currentPage: params.page,
            totalPages: Math.ceil(100 / params.pageSize),
          }
        });
      }, 500); // Simulate network delay
    });
  };
  
  return (
    <div className="container">
      <h1 className="text-2xl font-bold mb-6">Exchange Feedback History</h1>
      <DataTable<User>
        columns={columns}
        fetchData={fetchUsers}
        queryKey="users-table" // Unique key for React Query cache
        defaultPageSize={10}
        defaultSortBy="createdAt"
        defaultSortOrder="desc"
        onRowClick={(row) => {
          console.log('Row clicked:', row);
          // Navigate to user detail page or open modal
        }}
        // Optional: customize empty state message
        noDataMessage={
          <div className="text-center py-8">
            <h3 className="text-lg font-semibold mb-2">No users found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your filters or adding new users.</p>
            <Button>Add New User</Button>
          </div>
        }
      />
    </div>
  );
}