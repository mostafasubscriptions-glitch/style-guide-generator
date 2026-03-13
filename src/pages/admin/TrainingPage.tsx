import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";
import { trainings } from "@/data/mockData";

const TrainingPage = () => (
  <div className="p-8 animate-fade-in space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Training Courses</h1>
        <p className="text-sm text-muted-foreground">Manage training catalogue and providers</p>
      </div>
      <Button className="gap-2"><Plus className="h-4 w-4" /> Add Course</Button>
    </div>

    <Card>
      <CardHeader className="pb-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search courses..." className="pl-9" />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Provider</TableHead>
              <TableHead>Format</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Cost (QAR)</TableHead>
              <TableHead>Cert Prep</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {trainings.map((t) => (
              <TableRow key={t.id}>
                <TableCell className="font-mono font-medium">{t.code}</TableCell>
                <TableCell>{t.title}</TableCell>
                <TableCell className="text-muted-foreground">{t.provider}</TableCell>
                <TableCell><Badge variant="outline" className="text-[10px]">{t.format}</Badge></TableCell>
                <TableCell>{t.level}</TableCell>
                <TableCell>{t.cost}</TableCell>
                <TableCell>{t.prepForCertCode ? <Badge className="bg-accent/15 text-accent hover:bg-accent/15 text-[10px]">{t.prepForCertCode}</Badge> : "—"}</TableCell>
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

export default TrainingPage;
