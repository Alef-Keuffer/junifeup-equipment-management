"use client"
import React, { useState, useEffect } from 'react';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Edit } from "lucide-react";
import { EquipmentFormDialog } from './equipment-form-dialog';
import { DeleteEquipmentDialog } from './delete-equipment-dialog';

export type Equipment = {
  id: number;
  name: string;
  category: string;
  serial_number: string;
  status: string;
  location: string;
  purchase_date: string;
};

export default function Dashboard() {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Dialog States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [equipmentToDelete, setEquipmentToDelete] = useState<Equipment | null>(null);

  const fetchEquipment = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/equipment');
      const data = await res.json();
      if (res.ok && Array.isArray(data)) {
        setEquipment(data);
      } else {
        console.error("Failed to load equipment:", data);
        setEquipment([]);
      }
    } catch (e) {
      console.error(e);
      setEquipment([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEquipment();
  }, []);

  const handleAdd = () => {
    setSelectedEquipment(null);
    setIsFormOpen(true);
  };

  const handleEdit = (item: Equipment) => {
    setSelectedEquipment(item);
    setIsFormOpen(true);
  };

  const handleDelete = (item: Equipment) => {
    setEquipmentToDelete(item);
    setIsDeleteOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Available': return 'bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20';
      case 'Assigned': return 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 border-blue-500/20';
      case 'Maintenance': return 'bg-orange-500/10 text-orange-500 hover:bg-orange-500/20 border-orange-500/20';
      case 'Retired': return 'bg-slate-500/10 text-slate-500 hover:bg-slate-500/20 border-slate-500/20';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground">Equipment Inventory</h1>
          <p className="text-muted-foreground mt-2">Manage your company's equipment, locations, and statuses.</p>
        </div>
        <Button size="lg" className="gap-2 shadow-sm transition-all hover:shadow-md" onClick={handleAdd}>
          <Plus className="w-4 h-4" />
          Add Equipment
        </Button>
      </div>

      <div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow>
              <TableHead className="w-[200px]">Name</TableHead>
              <TableHead>Serial Number</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Location</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center h-32 text-muted-foreground">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <span>Loading equipment...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : equipment.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center h-32 text-muted-foreground">
                  No equipment found. Click "Add Equipment" to get started.
                </TableCell>
              </TableRow>
            ) : (
              equipment.map((item) => (
                <TableRow key={item.id} className="group hover:bg-muted/50 transition-colors">
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">{item.serial_number}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`${getStatusColor(item.status)} font-medium`}>
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{item.location}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => handleEdit(item)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive/70 hover:text-destructive hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => handleDelete(item)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <EquipmentFormDialog 
        open={isFormOpen} 
        onOpenChange={setIsFormOpen} 
        onSuccess={fetchEquipment}
        equipment={selectedEquipment} 
      />
      
      <DeleteEquipmentDialog 
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onSuccess={fetchEquipment}
        equipment={equipmentToDelete}
      />
    </div>
  );
}
