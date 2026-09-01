export default function StatisticsSection() {
  return (
    <section
      className={"flex flex-col items-center justify-center gap-8 px-4 py-32 md:gap-16 md:px-0"}
    >
      <div className={"flex flex-col gap-4 md:flex-row md:gap-16"}>
        <hgroup>
          <h4 className={"text-center text-4xl text-primary"}>50K+</h4>
          <p className={"text-center text-sm text-muted-foreground"}>ACTIVE MEMBERS</p>
        </hgroup>
        <hgroup>
          <h4 className={"text-center text-4xl text-primary"}>10K+</h4>
          <p className={"text-center text-sm text-muted-foreground"}>SUCCESS STORIES</p>
        </hgroup>
        <hgroup>
          <h4 className={"text-center text-4xl text-primary"}>100%</h4>
          <p className={"text-center text-sm text-muted-foreground"}>VERIFIED</p>
        </hgroup>
      </div>
      <div className="flex flex-col gap-2 md:flex-row md:gap-8">
        <p className={"text-muted-foreground md:text-center"}>✅ 100% Verified Profiles</p>
        <p className={"text-muted-foreground md:text-center"}>✅ Privacy Protected</p>
        <p className={"text-muted-foreground md:text-center"}>✅ Personal Matchmaker</p>
      </div>
    </section>
  );
}
