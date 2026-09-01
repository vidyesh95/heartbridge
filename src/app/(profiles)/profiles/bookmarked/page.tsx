export default function Bookmarked() {
  return (
    <section>
      <hgroup className={"flex flex-col items-center justify-center space-y-4 pt-18 text-center"}>
        <h3 className={"text-4xl text-secondary-foreground md:text-6xl"}>Bookmarked Profiles</h3>
        <p className={"w-full max-w-2xl text-muted-foreground"}>
          6 profiles match your preferences
        </p>
      </hgroup>
    </section>
  );
}
