import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";
import { certifications } from "@/data/mockData";

const CertificationsPage = () => (
  <div className="p-8 animate-fade-in space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Certifications</h1>
        <p className="text-sm text-muted-foreground">Manage certification catalogue and providers</p>
      </div>
      <Button className="gap-2"><Plus className="h-4 w-4" /> Add Certification</Button>
    </div>

    <Card>
      <CardHeader className="pb-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search certifications..." className="pl-9" />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Provider</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Cost (QAR)</TableHead>
              <TableHead>Qatar Rec.</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {certifications.map((cert) => (
              <TableRow key={cert.id}>
                <TableCell className="font-mono font-medium">{cert.code}</TableCell>
                <TableCell>{cert.title}</TableCell>
                <TableCell className="text-muted-foreground">{cert.provider}</TableCell>
                <TableCell><Badge variant="outline">{cert.level}</Badge></TableCell>
                <TableCell>{cert.cost.toLocaleString()}</TableCell>
                <TableCell>
                  {cert.isQatarRecommended && <Badge className="bg-accent/15 text-accent hover:bg-accent/15 text-[10px]">Yes</Badge>}
                </TableCell>
                <TableCell className="text-right space-x-1">
                  <Button variant="ghost" size="icon"><Pencil className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </div>
);

export default CertificationsPage;
