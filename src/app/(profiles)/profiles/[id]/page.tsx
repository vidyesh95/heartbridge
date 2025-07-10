export default async function Profile({ params, }: { params: Promise<{ id: string; }> }) {
    const {id} = await params
    return (
        <section>
            <hgroup className={"flex flex-col items-center justify-center space-y-4 text-center pt-18"}>
                <h3 className={"text-4xl md:text-6xl text-secondary-foreground"}>Profile {id}</h3>
                <p className={"w-full max-w-2xl text-muted-foreground"}>
                    viewing dynamic profile
                </p>
            </hgroup>
        </section>
    )
}