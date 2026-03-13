import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft, Award, BookOpen, Star, Clock, DollarSign, Users,
  CheckCircle2, FileText, ExternalLink, Layers, Target, GraduationCap
} from "lucide-react";
import { certifications, trainings, providers } from "@/data/mockData";
import { cn } from "@/lib/utils";

const V2CatalogueDetailPage = () => {
  const { type, id } = useParams<{ type: string; id: string }>();
  const navigate = useNavigate();

  const isCert = type === "cert";
  const item = isCert
    ? certifications.find((c) => c.id === Number(id))
    : trainings.find((t) => t.id === Number(id));

  if (!item) {
    return (
      <div className="p-8 text-center">
        <p className="text-muted-foreground">Item not found</p>
        <Button variant="outline" className="mt-4" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Go Back
        </Button>
      </div>
    );
  }

  const providerInfo = providers.find((p) => p.name === item.provider);
  const cert = isCert ? (item as typeof certifications[0]) : null;
  const training = !isCert ? (item as typeof trainings[0]) : null;

  return (
    <div className="p-8 animate-fade-in max-w-5xl mx-auto">
      {/* Back button */}
      <Button variant="ghost" size="sm" className="mb-6 gap-2 text-muted-foreground" onClick={() => navigate(-1)}>
        <ArrowLeft className="h-4 w-4" /> Back to Catalogue
      </Button>

      {/* Hero */}
      <div className="relative rounded-2xl overflow-hidden mb-8">
        <div className={cn(
          "h-48 flex items-end p-8",
          isCert
            ? "bg-gradient-to-br from-accent/20 via-accent/10 to-primary/10"
            : "bg-gradient-to-br from-info/20 via-info/10 to-primary/10"
        )}>
          {/* Decorative icon */}
          <div className="absolute top-6 right-8 opacity-10">
            {isCert
              ? <Award className="h-32 w-32 text-accent" />
              : <BookOpen className="h-32 w-32 text-info" />
            }
          </div>
          <div className="relative z-10 flex items-end gap-5">
            <div className={cn(
              "w-16 h-16 rounded-xl flex items-center justify-center shrink-0 backdrop-blur-sm border",
              isCert ? "bg-accent/20 border-accent/30" : "bg-info/20 border-info/30"
            )}>
              {isCert ? <Award className="h-8 w-8 text-accent" /> : <BookOpen className="h-8 w-8 text-info" />}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline" className="text-xs bg-background/60 backdrop-blur-sm">{item.code}</Badge>
                <Badge className={cn(
                  "text-xs",
                  isCert ? "bg-accent/15 text-accent hover:bg-accent/15" : "bg-info/15 text-info hover:bg-info/15"
                )}>
                  {isCert ? "Certification" : "Course"}
                </Badge>
                {cert?.isQatarRecommended && (
                  <Badge className="bg-accent/15 text-accent hover:bg-accent/15 text-xs gap-1">
                    <Star className="h-3 w-3" /> Qatar Recommended
                  </Badge>
                )}
              </div>
              <h1 className="text-2xl font-bold text-foreground">{item.title}</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content - 2 cols */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" /> Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </CardContent>
          </Card>

          {/* Skills Gained */}
          {item.skills && item.skills.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Target className="h-4 w-4 text-primary" /> Skills You'll Gain
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {item.skills.map((s) => (
                    <Badge key={s} variant="outline" className="text-xs px-3 py-1.5 border-primary/30 text-primary">
                      {s}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Prerequisites */}
          {cert?.prerequisites && cert.prerequisites.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Layers className="h-4 w-4 text-primary" /> Prerequisites
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {cert.prerequisites.map((p, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
                      {p}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Exam Format */}
          {cert?.examFormat && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-primary" /> Exam Format
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{cert.examFormat}</p>
              </CardContent>
            </Card>
          )}

          {/* AI Reasoning (certs only) */}
          {cert?.aiReasoning && (
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Star className="h-4 w-4 text-primary" /> Why Daleel Recommends This
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">{cert.aiReasoning}</p>
                {cert.aiConfidence && (
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">AI Confidence:</span>
                    <Badge className="bg-primary/15 text-primary hover:bg-primary/15">{cert.aiConfidence}%</Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Training prep info */}
          {training?.prepForCertCode && (
            <Card className="border-accent/20 bg-accent/5">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Award className="h-4 w-4 text-accent" /> Certification Preparation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  This course prepares you for the <strong>{training.prepForCertCode}</strong> certification exam.
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar - 1 col */}
        <div className="space-y-6">
          {/* Quick Facts */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Facts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { icon: DollarSign, label: "Cost", value: `QAR ${item.cost.toLocaleString()}` },
                { icon: Clock, label: "Duration", value: item.duration },
                { icon: Users, label: "Level", value: item.level },
                { icon: Layers, label: "Competency", value: item.competencyName },
                ...(training?.format ? [{ icon: BookOpen, label: "Format", value: training.format }] : []),
                ...(cert?.validityMonths ? [{ icon: Clock, label: "Validity", value: `${cert.validityMonths} months` }] : []),
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{label}</p>
                    <p className="text-sm font-medium text-foreground">{value}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Provider */}
          {providerInfo && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Provider</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">{providerInfo.name.slice(0, 3)}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{providerInfo.fullName}</p>
                    <p className="text-xs text-muted-foreground">{providerInfo.country}</p>
                  </div>
                </div>
                {providerInfo.website && (
                  <a
                    href={providerInfo.website}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 flex items-center gap-2 text-xs text-primary hover:underline"
                  >
                    <ExternalLink className="h-3.5 w-3.5" /> Visit Website
                  </a>
                )}
              </CardContent>
            </Card>
          )}

          {/* CTA */}
          <Button className="w-full gap-2">
            {isCert ? <Award className="h-4 w-4" /> : <BookOpen className="h-4 w-4" />}
            Add to My CDP
          </Button>
        </div>
      </div>
    </div>
  );
};

export default V2CatalogueDetailPage;
