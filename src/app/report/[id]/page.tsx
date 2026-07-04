import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import { Sparkles, ArrowLeft, Star, BookOpen, Flame, Droplets, Mountain, Wind } from "lucide-react";
import Link from "next/link";
import { ReportActions } from "@/components/report/report-actions";
import { TrackView } from "@/components/analytics/track-view";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const report = await prisma.report.findUnique({ where: { id: params.id } });
  if (!report) return { title: "Report — Personal Metadata" };
  const title = `${report.firstName}'s Personal Metadata`;
  const description = `${report.firstName}'s free symbolic self-reflection report — numerology, Western astrology, and Chinese astrology.`;
  const ogImage = `/api/reports/${report.id}/og`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: ogImage, width: 1080, height: 1080 }],
    },
    twitter: { card: "summary_large_image", title, description, images: [ogImage] },
  };
}

export default async function ReportPage({
  params,
}: {
  params: { id: string };
}) {
  const report = await prisma.report.findUnique({
    where: { id: params.id },
  });

  if (!report || report.status !== "COMPLETED") {
    notFound();
  }

  await prisma.report.update({
    where: { id: params.id },
    data: { viewedAt: new Date() },
  });

  const content = report.content as any;
  const sections = content.sections || [];

  // Helper for element icon
  const getElementIcon = (element: string) => {
    switch (element?.toLowerCase()) {
      case 'fire': return <Flame className="w-5 h-5" />;
      case 'water': return <Droplets className="w-5 h-5" />;
      case 'earth': return <Mountain className="w-5 h-5" />;
      case 'air': return <Wind className="w-5 h-5" />;
      default: return <Star className="w-5 h-5" />;
    }
  };

  return (
    <main className="min-h-screen bg-midnight">
      <TrackView event="report_view" />
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-midnight/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-container mx-auto px-5 md:px-8 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center text-lunar-gray hover:text-soft-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="text-sm">Personal Metadata</span>
          </Link>
          <ReportActions reportId={report.id} firstName={report.firstName} variant="header" />
        </div>
      </header>

      <div className="max-w-container mx-auto px-5 md:px-8 py-12 md:py-20">
        {/* Cover */}
        <section className="text-center mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-mystic-blue rounded-full text-sm text-aurora-violet mb-6">
            <Sparkles className="w-4 h-4" />
            Free Symbolic Report
          </div>
          <h1 className="font-serif text-4xl md:text-6xl text-soft-white mb-4">
            Personal Metadata Report
          </h1>
          <p className="text-xl text-celestial-gold font-serif mb-2">
            Prepared for {report.firstName} {report.lastName}
          </p>
          <p className="text-lunar-gray text-sm">
            Generated on {formatDate(report.createdAt)}
          </p>
          <p className="text-lunar-gray text-xs mt-2 max-w-md mx-auto">
            A symbolic self-reflection profile based on your name and birth data using the Pythagorean numerology system.
          </p>
        </section>

        {/* Table of Contents */}
        <nav className="hidden md:block mb-16 p-6 bg-cosmic-slate rounded-card border border-white/5">
          <h2 className="font-serif text-lg text-soft-white mb-4">Contents</h2>
          <div className="flex flex-wrap gap-3">
            {sections.map((section: any) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="px-4 py-2 bg-white/5 rounded-btn text-sm text-mist-gray hover:text-celestial-gold hover:bg-white/10 transition-colors"
              >
                {section.title}
              </a>
            ))}
            <a
              href="#pythagorean-table"
              className="px-4 py-2 bg-white/5 rounded-btn text-sm text-mist-gray hover:text-celestial-gold hover:bg-white/10 transition-colors"
            >
              Pythagorean System
            </a>
          </div>
        </nav>

        {/* Sections */}
        <div className="space-y-16 md:space-y-24">
          {sections.map((section: any) => (
            <section key={section.id} id={section.id} className="scroll-mt-24">
              <div className="max-w-2xl mx-auto">
                <h2 className="font-serif text-3xl md:text-4xl text-soft-white mb-2">
                  {section.title}
                </h2>
                {section.subtitle && (
                  <p className="text-celestial-gold text-lg mb-6">{section.subtitle}</p>
                )}
                <div className="prose prose-invert prose-lg max-w-none">
                  <p className="text-mist-gray leading-relaxed whitespace-pre-line">
                    {section.body}
                  </p>
                </div>

                {/* Data Cards */}
                {section.data && section.id === "numerology" && (
                  <div className="mt-8">
                    <h3 className="font-serif text-xl text-soft-white mb-4">
                      Your Pythagorean Numbers
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {Object.entries(section.data.numbers || {}).map(([key, value]) => (
                        <div
                          key={key}
                          className="p-4 bg-cosmic-slate rounded-card border border-white/5 text-center"
                        >
                          <div className="text-2xl font-bold text-celestial-gold">{String(value)}</div>
                          <div className="text-xs text-lunar-gray mt-1 capitalize">
                            {key.replace(/([A-Z])/g, " $1").trim()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {section.data?.practicalPrompt && (
                  <div className="mt-6 p-4 bg-mystic-blue/50 rounded-card border border-aurora-violet/20">
                    <p className="text-sm text-aurora-violet font-semibold mb-1">
                      Reflection Prompt
                    </p>
                    <p className="text-mist-gray text-sm italic">
                      {section.data.practicalPrompt}
                    </p>
                  </div>
                )}

                {section.data?.reflectionQuestion && (
                  <div className="mt-6 p-4 bg-mystic-blue/50 rounded-card border border-aurora-violet/20">
                    <p className="text-sm text-aurora-violet font-semibold mb-1">
                      Reflect on
                    </p>
                    <p className="text-mist-gray text-sm italic">
                      {section.data.reflectionQuestion}
                    </p>
                  </div>
                )}

                {section.data?.strengths && (
                  <div className="mt-8">
                    <h3 className="font-serif text-xl text-soft-white mb-4">
                      Your Symbolic Strengths
                    </h3>
                    <div className="space-y-4">
                      {section.data.strengths.map((s: any, i: number) => (
                        <div
                          key={i}
                          className="p-4 bg-cosmic-slate rounded-card border border-white/5"
                        >
                          <h4 className="text-soft-white font-semibold mb-1">
                            {s.title}
                          </h4>
                          <p className="text-mist-gray text-sm">{s.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {section.data?.practices && (
                  <div className="mt-8">
                    <h3 className="font-serif text-xl text-soft-white mb-4">
                      Practical Practices
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {section.data.practices.map((p: any, i: number) => (
                        <div
                          key={i}
                          className="p-4 bg-cosmic-slate rounded-card border border-white/5"
                        >
                          <h4 className="text-soft-white font-semibold mb-1">{p.title}</h4>
                          <p className="text-mist-gray text-sm mb-2">{p.description}</p>
                          <div className="flex gap-2 text-xs text-lunar-gray">
                            <span>{p.duration}</span>
                            <span>·</span>
                            <span>{p.frequency}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>
          ))}

          {/* Pythagorean Numerology System Table */}
          <section id="pythagorean-table" className="scroll-mt-24">
            <div className="max-w-2xl mx-auto">
              <h2 className="font-serif text-3xl md:text-4xl text-soft-white mb-2">
                The Pythagorean Numerology System
              </h2>
              <p className="text-celestial-gold text-lg mb-6">
                How your numbers were calculated
              </p>
              <p className="text-mist-gray leading-relaxed mb-8">
                Your report is built on the Pythagorean numerology system, one of the most widely used 
                symbolic frameworks for self-reflection. Each number in your profile carries a specific 
                meaning based on ancient symbolic traditions.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 px-4 text-soft-white font-semibold">Number</th>
                      <th className="text-left py-3 px-4 text-soft-white font-semibold">Name</th>
                      <th className="text-left py-3 px-4 text-soft-white font-semibold">Your Value</th>
                      <th className="text-left py-3 px-4 text-soft-white font-semibold">Calculated From</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    <tr>
                      <td className="py-3 px-4 text-celestial-gold font-bold">1</td>
                      <td className="py-3 px-4 text-soft-white">Life Path Number</td>
                      <td className="py-3 px-4 text-mist-gray">{report.lifePathNumber}</td>
                      <td className="py-3 px-4 text-lunar-gray">Day + Month + Year of birth</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-celestial-gold font-bold">2</td>
                      <td className="py-3 px-4 text-soft-white">Expression / Destiny</td>
                      <td className="py-3 px-4 text-mist-gray">{report.expressionNumber}</td>
                      <td className="py-3 px-4 text-lunar-gray">Full name (all letters)</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-celestial-gold font-bold">3</td>
                      <td className="py-3 px-4 text-soft-white">Soul Urge / Heart's Desire</td>
                      <td className="py-3 px-4 text-mist-gray">{report.soulUrgeNumber}</td>
                      <td className="py-3 px-4 text-lunar-gray">Vowels in full name</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-celestial-gold font-bold">4</td>
                      <td className="py-3 px-4 text-soft-white">Personality Number</td>
                      <td className="py-3 px-4 text-mist-gray">{report.personalityNumber}</td>
                      <td className="py-3 px-4 text-lunar-gray">Consonants in full name</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-celestial-gold font-bold">5</td>
                      <td className="py-3 px-4 text-soft-white">Birthday Number</td>
                      <td className="py-3 px-4 text-mist-gray">{report.birthdayNumber}</td>
                      <td className="py-3 px-4 text-lunar-gray">Day of birth only</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-celestial-gold font-bold">6</td>
                      <td className="py-3 px-4 text-soft-white">Maturity Number</td>
                      <td className="py-3 px-4 text-mist-gray">{report.maturityNumber}</td>
                      <td className="py-3 px-4 text-lunar-gray">Life Path + Expression</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-celestial-gold font-bold">7</td>
                      <td className="py-3 px-4 text-soft-white">Attitude Number</td>
                      <td className="py-3 px-4 text-mist-gray">{report.attitudeNumber}</td>
                      <td className="py-3 px-4 text-lunar-gray">Day + Month of birth</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-8 p-4 bg-mystic-blue/30 rounded-card border border-aurora-violet/20">
                <div className="flex items-start gap-3">
                  <BookOpen className="w-5 h-5 text-aurora-violet flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-aurora-violet font-semibold mb-1">
                      About the Pythagorean System
                    </p>
                    <p className="text-mist-gray text-sm leading-relaxed">
                      Named after the ancient Greek philosopher Pythagoras, this system assigns 
                      numerical values to letters (A=1, B=2, ..., I=9, J=1, etc.) and reduces 
                      them to single digits (1-9) or master numbers (11, 22, 33). Each number 
                      represents a different facet of your symbolic identity. This system is used 
                      for reflection and entertainment, not as a scientific or predictive tool.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Disclaimer */}
        <div className="mt-20 md:mt-28 pt-8 border-t border-white/5">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-lunar-gray text-sm leading-relaxed">
              This report is a reflection and entertainment tool based on the Pythagorean numerology 
              system, Western astrology, and Chinese astrology traditions. It is not scientific,
              medical, psychological, legal, financial, or professional advice. Use it
              as a mirror for self-exploration, not as a definitive guide.
            </p>
            <div className="mt-8">
              <ReportActions reportId={report.id} firstName={report.firstName} variant="footer" />
            </div>
            <p className="mt-6 text-xs text-lunar-gray">
              Want to explore more? Generate a report for someone you care about.
            </p>
            <Link
              href="/form"
              className="inline-block mt-2 text-celestial-gold hover:text-warm-amber transition-colors text-sm"
            >
              Create another report →
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
