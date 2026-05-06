"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

import { Footer } from "@/components/shared/footer";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { TaskPostCard } from "@/components/shared/task-post-card";
import { SchemaJsonLd } from "@/components/seo/schema-jsonld";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { buildPostUrl, fetchTaskPostBySlug, fetchTaskPosts } from "@/lib/task-data";
import { SITE_CONFIG } from "@/lib/site-config";
import { FileText, Download, ArrowLeft, Eye, Share2, Calendar, Tag, ExternalLink, Clock, FileDown, Check } from "lucide-react";

// ShareButton Component
function ShareButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement("textarea");
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative">
      <Button 
        variant="outline" 
        size="lg" 
        className="border-slate-300"
        onClick={handleShare}
      >
        {copied ? (
          <>
            <Check className="mr-2 h-5 w-5 text-green-600" />
            Copied!
          </>
        ) : (
          <>
            <Share2 className="mr-2 h-5 w-5" />
            Share
          </>
        )}
      </Button>
      {copied && (
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 rounded-lg bg-green-600 px-3 py-2 text-sm text-white shadow-lg animate-in fade-in-0 zoom-in-95 duration-200">
          URL copied to clipboard!
        </div>
      )}
    </div>
  );
}

export default function PdfDetailPage() {
  const params = useParams();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [related, setRelated] = useState<any[]>([]);
  
  useEffect(() => {
    async function loadData() {
      try {
        const slug = params.slug as string;
        const postData = await fetchTaskPostBySlug("pdf", slug);
        
        if (!postData) {
          notFound();
          return;
        }
        
        setPost(postData);
        
        // Load related posts
        const content = postData.content && typeof postData.content === "object" ? postData.content : {};
        const contentAny = content as Record<string, unknown>;
        const category = typeof contentAny.category === "string" ? contentAny.category : "";
        
        const relatedPosts = (await fetchTaskPosts("pdf", 6))
          .filter((item: any) => item.slug !== slug)
          .filter((item: any) => {
            if (!category) return true;
            const itemContent = item.content && typeof item.content === "object" ? item.content : {};
            const itemCategory = typeof (itemContent as Record<string, unknown>).category === "string"
              ? (itemContent as Record<string, unknown>).category
              : "";
            return itemCategory === category;
          })
          .slice(0, 3);
        
        setRelated(relatedPosts);
      } catch (error) {
        console.warn("PDF detail lookup failed", error);
      } finally {
        setLoading(false);
      }
    }
    
    loadData();
  }, [params.slug]);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <NavbarShell />
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-slate-600">Loading PDF...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (!post) {
    notFound();
    return null;
  }
  
  const content = post.content && typeof post.content === "object" ? post.content : {};
  const contentAny = content as Record<string, unknown>;
  const fileUrl =
    (typeof contentAny.fileUrl === "string" && contentAny.fileUrl) ||
    (typeof contentAny.pdfUrl === "string" && contentAny.pdfUrl) ||
    "";

  if (!fileUrl || !/^https?:\/\//i.test(fileUrl)) {
    notFound();
    return null;
  }

  const viewerUrl = `${fileUrl}#toolbar=0&navpanes=0&scrollbar=0`;
  const baseUrl = SITE_CONFIG.baseUrl.replace(/\/$/, "");
  const category = typeof contentAny.category === "string" ? contentAny.category : "";
  const fileSize = typeof contentAny.fileSize === "string" ? contentAny.fileSize : "";
  const pageCount = typeof contentAny.pageCount === "number" ? contentAny.pageCount : null;
  const currentUrl = `${baseUrl}/pdf/${post.slug}`;
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "PDF Library",
        item: `${baseUrl}/pdf`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${baseUrl}/pdf/${post.slug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <SchemaJsonLd data={breadcrumbData} />
        
        {/* Header Section */}
        <div className="mb-8 space-y-6">
          <Link
            href="/pdf"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to PDF Library
          </Link>
          
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-red-100 p-3">
                  <FileText className="h-6 w-6 text-red-600" />
                </div>
                <Badge variant="secondary" className="bg-red-50 text-red-700">
                  PDF Document
                </Badge>
              </div>
              <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">{post.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
                {pageCount && (
                  <div className="flex items-center gap-1">
                    <FileText className="h-4 w-4" />
                    {pageCount} pages
                  </div>
                )}
                {fileSize && (
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {fileSize}
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Button asChild size="lg" className="bg-red-600 hover:bg-red-700">
                <a
                  href={fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2"
                >
                  <Download className="h-5 w-5" />
                  Download PDF
                </a>
              </Button>
              <ShareButton url={currentUrl} />
            </div>
          </div>
        </div>

        {/* PDF Viewer Section */}
        <Card className="mb-8 overflow-hidden border-0 shadow-2xl">
          <CardHeader className="border-b bg-slate-50 px-6 py-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Eye className="h-5 w-5 text-slate-600" />
                Document Preview
              </CardTitle>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  Interactive Viewer
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="text-slate-600 hover:text-slate-900"
                >
                  <a
                    href={fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Open in New Tab
                  </a>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative overflow-hidden bg-slate-100">
              <iframe
                src={viewerUrl}
                title={post.title}
                className="h-[70vh] w-full border-0"
                loading="lazy"
              />
              <div className="absolute bottom-4 left-4 rounded-lg bg-white/90 px-3 py-2 shadow-lg backdrop-blur-sm">
                <p className="text-xs font-medium text-slate-700">
                  Use mouse wheel to scroll • Click to zoom
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {related.length ? (
          <section className="space-y-8">
            {/* Related Documents Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Related Documents</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Discover similar PDFs in our collection
                </p>
              </div>
              <Link
                href="/pdf"
                className="flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
              >
                View All
                <ArrowLeft className="h-4 w-4 rotate-180" />
              </Link>
            </div>

            {/* Related Documents Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <TaskPostCard
                  key={item.id}
                  post={item}
                  href={buildPostUrl("pdf", item.slug)}
                  taskKey="pdf"
                />
              ))}
            </div>

            {/* Quick Links Section */}
            <Card className="border-0 bg-slate-50/50 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <FileText className="h-5 w-5 text-slate-600" />
                  Quick Navigation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <Link
                    href="/pdf"
                    className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white p-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:border-slate-300"
                  >
                    <FileText className="h-4 w-4" />
                    Browse Library
                  </Link>
                  {related.slice(0, 3).map((item) => (
                    <Link
                      key={`quick-${item.id}`}
                      href={buildPostUrl("pdf", item.slug)}
                      className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white p-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:border-slate-300"
                    >
                      <FileText className="h-4 w-4" />
                      {item.title.length > 20 ? item.title.slice(0, 20) + "..." : item.title}
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
        ) : null}
      </main>
      <Footer />
    </div>
  );
}
