import Link from "next/link";
import { notFound } from "next/navigation";
import { ProfileAuthBanner } from "@/components/auth/profile-auth-banner";
import { Footer } from "@/components/shared/footer";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { ContentImage } from "@/components/shared/content-image";
import { TaskPostCard } from "@/components/shared/task-post-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SchemaJsonLd } from "@/components/seo/schema-jsonld";
import { buildPostUrl } from "@/lib/task-data";
import { buildPostMetadata, buildTaskMetadata } from "@/lib/seo";
import { fetchTaskPostBySlug, fetchTaskPosts } from "@/lib/task-data";
import { SITE_CONFIG } from "@/lib/site-config";
import { FileText, MessageSquare, HelpCircle, ExternalLink, Globe, Mail, MapPin, Users, BarChart3, UserPlus } from "lucide-react";

export const revalidate = 3;

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const sanitizeRichHtml = (html: string) =>
  html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<iframe[^>]*>[\s\S]*?<\/iframe>/gi, "")
    .replace(/<object[^>]*>[\s\S]*?<\/object>/gi, "")
    .replace(/\son[a-z]+\s*=\s*(['"]).*?\1/gi, "")
    .replace(/\shref\s*=\s*(['"])javascript:.*?\1/gi, ' href="#"');

const formatRichHtml = (raw?: string | null, fallback = "Profile details will appear here once available.") => {
  const source = typeof raw === "string" ? raw.trim() : "";
  if (!source) return `<p>${escapeHtml(fallback)}</p>`;
  if (/<[a-z][\s\S]*>/i.test(source)) return sanitizeRichHtml(source);
  return source
    .split(/\n{2,}/)
    .map((paragraph) => `<p>${escapeHtml(paragraph.replace(/\n/g, " ").trim())}</p>`)
    .join("");
};

export async function generateStaticParams() {
  const posts = await fetchTaskPosts("profile", 50);
  if (!posts.length) {
    return [{ username: "placeholder" }];
  }
  return posts.map((post) => ({ username: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }) {
  const resolvedParams = await params;
  try {
    const post = await fetchTaskPostBySlug("profile", resolvedParams.username);
    return post ? await buildPostMetadata("profile", post) : await buildTaskMetadata("profile");
  } catch (error) {
    console.warn("Profile metadata lookup failed", error);
    return await buildTaskMetadata("profile");
  }
}

export default async function ProfileDetailPage({ params }: { params: Promise<{ username: string }> }) {
  const resolvedParams = await params;
  const post = await fetchTaskPostBySlug("profile", resolvedParams.username);
  if (!post) {
    notFound();
  }
  const content = (post.content || {}) as Record<string, any>;
  const logoUrl = typeof content.logo === "string" ? content.logo : undefined;
  const brandName =
    (content.brandName as string | undefined) ||
    (content.companyName as string | undefined) ||
    (content.name as string | undefined) ||
    post.title;
  const website = content.website as string | undefined;
  const domain = website ? website.replace(/^https?:\/\//, "").replace(/\/.*$/, "") : undefined;
  const description =
    (content.description as string | undefined) ||
    post.summary ||
    "Profile details will appear here once available.";
  const descriptionHtml = formatRichHtml(description);
  const suggestedArticles = await fetchTaskPosts("article", 6);
  const baseUrl = SITE_CONFIG.baseUrl.replace(/\/$/, "");
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
        name: "Profiles",
        item: `${baseUrl}/profile`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: brandName,
        item: `${baseUrl}/profile/${post.slug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <NavbarShell />
      <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
        <ProfileAuthBanner />
        <SchemaJsonLd data={breadcrumbData} />
        <div className="space-y-8">
          {/* Profile Header Card */}
          <Card className="overflow-hidden border-0 shadow-lg">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8">
              <div className="flex flex-col items-center space-y-6 md:flex-row md:items-start md:space-x-8 md:space-y-0">
                <div className="relative">
                  <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-white shadow-xl">
                    {logoUrl ? (
                      <ContentImage src={logoUrl} alt={post.title} fill className="object-cover" sizes="128px" intrinsicWidth={128} intrinsicHeight={128} />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 text-3xl font-bold text-white">
                        {post.title.slice(0, 1).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="absolute -bottom-2 -right-2 rounded-full bg-green-500 p-2 shadow-lg">
                    <div className="h-4 w-4 rounded-full bg-white"></div>
                  </div>
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <div className="space-y-2">
                    <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">{brandName}</h1>
                    {domain && (
                      <div className="flex items-center justify-center gap-2 text-gray-600 md:justify-start">
                        <Globe className="h-4 w-4" />
                        <span className="text-sm font-medium">{domain}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-4 space-y-4">
                    <div 
                      className="prose prose-gray max-w-none text-gray-700"
                      dangerouslySetInnerHTML={{ __html: descriptionHtml }}
                    />
                    
                    <div className="flex flex-col gap-3 sm:flex-row">
                      {website && (
                        <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                          <Link href={website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                            <ExternalLink className="h-4 w-4" />
                            Visit Official Site
                          </Link>
                        </Button>
                      )}
                      <Button asChild size="lg" variant="outline" className="border-blue-500 text-blue-600 hover:bg-blue-50">
                        <Link href="/login" className="flex items-center gap-2">
                          <UserPlus className="h-4 w-4" />
                          Follow
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Tabs Section */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-0">
              <Tabs defaultValue="translations" className="w-full">
                <div className="border-b bg-gray-50 px-6 py-4">
                  <TabsList className="grid w-full grid-cols-3 bg-transparent">
                    <TabsTrigger value="translations" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                      <FileText className="mr-2 h-4 w-4" />
                      TRANSLATIONS
                    </TabsTrigger>
                    <TabsTrigger value="notes" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      NOTES
                    </TabsTrigger>
                    <TabsTrigger value="questions" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                      <HelpCircle className="mr-2 h-4 w-4" />
                      QUESTIONS
                    </TabsTrigger>
                  </TabsList>
                </div>
                
                <div className="p-6">
                  <TabsContent value="translations" className="mt-0">
                    <div className="space-y-4">
                      <CardDescription className="text-base">
                        No translations from this user
                      </CardDescription>
                      <p className="text-sm text-gray-500">
                        The user has not added any translations yet.
                      </p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="notes" className="mt-0">
                    <div className="space-y-4">
                      <CardDescription className="text-base">
                        No notes from this user
                      </CardDescription>
                      <p className="text-sm text-gray-500">
                        The user has not added any notes yet.
                      </p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="questions" className="mt-0">
                    <div className="space-y-4">
                      <CardDescription className="text-base">
                        No questions from this user
                      </CardDescription>
                      <p className="text-sm text-gray-500">
                        The user has not asked any questions yet.
                      </p>
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </CardContent>
          </Card>

        {suggestedArticles.length ? (
          <section className="mt-12">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">Suggested articles</h2>
              <Link href="/articles" className="text-sm font-medium text-primary hover:underline">
                View all
              </Link>
            </div>
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {suggestedArticles.slice(0, 3).map((article) => (
                <TaskPostCard
                  key={article.id}
                  post={article}
                  href={buildPostUrl("article", article.slug)}
                  compact
                />
              ))}
            </div>
            <nav className="mt-6 rounded-2xl border border-border bg-card/60 p-4">
              <p className="text-sm font-semibold text-foreground">Related links</p>
              <ul className="mt-2 space-y-2 text-sm">
                {suggestedArticles.slice(0, 3).map((article) => (
                  <li key={`related-${article.id}`}>
                    <Link
                      href={buildPostUrl("article", article.slug)}
                      className="text-primary underline-offset-4 hover:underline"
                    >
                      {article.title}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/profile" className="text-primary underline-offset-4 hover:underline">
                    Browse all profiles
                  </Link>
                </li>
              </ul>
            </nav>
          </section>
        ) : null}
        </div>
      </main>
      <Footer />
    </div>
  );
}
