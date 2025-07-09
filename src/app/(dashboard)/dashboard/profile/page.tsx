export default function Profile() {
    return (
        <section>
            <hgroup className={"flex flex-col items-center justify-center space-y-4 text-center pt-18"}>
                <h3 className={"text-4xl md:text-6xl text-secondary-foreground"}>Bookmarked Profiles</h3>
                <p className={"w-full max-w-2xl text-muted-foreground"}>
                    6 profiles match your preferences
                </p>
            </hgroup>
        </section>
    )
}