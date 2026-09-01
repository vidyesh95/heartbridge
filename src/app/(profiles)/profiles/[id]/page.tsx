export default async function Profile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <section>
      <hgroup className={"flex flex-col items-center justify-center space-y-4 pt-18 text-center"}>
        <h3 className={"text-4xl text-secondary-foreground md:text-6xl"}>Profile {id}</h3>
        <p className={"w-full max-w-2xl text-muted-foreground"}>viewing dynamic profile</p>
      </hgroup>
    </section>
  );
}
