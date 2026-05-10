import SectionHeader from "../components/SectionHeader";

export default function About() {
  return (
    <section className="py-20">
      <div className="section-shell">
        <SectionHeader
          eyebrow="About HIMATIF"
          title="Who We Are?"
          subtitle="Profil singkat Himpunan Mahasiswa Teknik Informatika STMIK AMIKBANDUNG."
        />
        <div className="mx-auto max-w-5xl space-y-10">
          <div className="glass rounded-3xl p-8 shadow-glow">
            <h3 className="mb-4 text-3xl font-bold">Who We Are?</h3>
            <p className="text-lg leading-relaxed text-brand-gray">
              HIMATIF (Himpunan Mahasiswa Teknik Informatika) is a student
              organization that serves as a home for Informatics Engineering
              students. We were established as a platform to develop students’
              academic potential, soft skills, and leadership abilities. Driven
              by a spirit of solidarity and innovation, we are committed to
              creating an ecosystem that supports the growth of every member as
              they face the challenges of an ever-evolving technological world.
            </p>
          </div>

          <div className="glass rounded-3xl p-8 shadow-glow">
            <h3 className="mb-6 text-3xl font-bold">Vision &amp; Mission</h3>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h4 className="mb-3 text-2xl font-bold">Vision</h4>
                <p className="leading-relaxed text-brand-gray">
                  To become a student organization that is outstanding,
                  adaptable, and innovative in the field of technology, and
                  actively makes positive contributions to the campus and the
                  community.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h4 className="mb-3 text-2xl font-bold">Mission</h4>
                <ul className="list-disc space-y-2 pl-5 leading-relaxed text-brand-gray">
                  <li>Improving skills in the field of informatics</li>
                  <li>Fostering creativity and positive activities</li>
                  <li>
                    Strengthening solidarity among computer science students
                  </li>
                  <li>Connecting students with the business world</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
