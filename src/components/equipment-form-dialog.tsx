"use client"

import { useState } from "react"
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription 
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Equipment } from "./dashboard"

const VALID_CATEGORIES = ['Laptop', 'Monitor', 'Smartphone', 'Tablet', 'Printer', 'Network Equipment'];
const VALID_STATUSES = ['Available', 'Assigned', 'Maintenance', 'Retired'];

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  equipment?: Equipment | null;
}

export function EquipmentFormDialog({ open, onOpenChange, onSuccess, equipment }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isEditing = !!equipment;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      category: formData.get("category") as string,
      serial_number: formData.get("serial_number") as string,
      status: formData.get("status") as string,
      location: formData.get("location") as string,
      purchase_date: formData.get("purchase_date") as string,
    };

    try {
      const url = isEditing ? `/api/equipment/${equipment.id}` : "/api/equipment";
      const method = isEditing ? "PUT" : "POST";
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Something went wrong");
      }

      onSuccess();
      onOpenChange(false);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Equipment" : "Add Equipment"}</DialogTitle>
          <DialogDescription>
            {isEditing ? "Update the details of this equipment below." : "Fill in the details to add new equipment to the inventory."}
          </DialogDescription>
        </DialogHeader>
        
        {error && (
          <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="grid gap-4 py-4" id="equipment-form">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" defaultValue={equipment?.name} required placeholder="e.g. MacBook Pro M3" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="serial_number">Serial Number</Label>
            <Input id="serial_number" name="serial_number" defaultValue={equipment?.serial_number} required placeholder="e.g. C02XABCDXYZ" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select name="category" defaultValue={equipment?.category || VALID_CATEGORIES[0]}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {VALID_CATEGORIES.map(c => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select name="status" defaultValue={equipment?.status || VALID_STATUSES[0]}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {VALID_STATUSES.map(s => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" name="location" defaultValue={equipment?.location} required placeholder="e.g. Lisbon Office" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="purchase_date">Purchase Date</Label>
            <Input 
              id="purchase_date" 
              name="purchase_date" 
              type="date" 
              defaultValue={equipment?.purchase_date || new Date().toISOString().split('T')[0]} 
              required 
            />
          </div>
        </form>

        <DialogFooter>
          <Button variant="outline" type="button" onClick={() => onOpenChange(false)} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" form="equipment-form" disabled={loading}>
            {loading ? "Saving..." : "Save Equipment"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
