export default function StatisticsSection() {
  return (
    <section className="flex flex-col items-center justify-center gap-8 px-4 py-32 md:gap-16 md:px-0">
      <div className="flex flex-col gap-4 md:flex-row md:gap-16">
        <hgroup>
          <h4 className="text-center text-4xl text-primary">4</h4>
          <p className="text-center text-sm text-muted-foreground">COUNTRIES</p>
        </hgroup>
        <hgroup>
          <h4 className="text-center text-4xl text-primary">30</h4>
          <p className="text-center text-sm text-muted-foreground">DEMO PROFILES TO BROWSE</p>
        </hgroup>
        <hgroup>
          <h4 className="text-center text-4xl text-primary">Free</h4>
          <p className="text-center text-sm text-muted-foreground">NO MEMBERSHIP FEE</p>
        </hgroup>
      </div>
      <div className="flex flex-col gap-2 md:flex-row md:gap-8">
        <p className="text-muted-foreground md:text-center">Country-aware profiles</p>
        <p className="text-muted-foreground md:text-center">Export or delete your data</p>
        <p className="text-muted-foreground md:text-center">Message after a mutual like</p>
      </div>
    </section>
  );
}
