export default function StatisticsSection() {
    return (
        <section className={"flex flex-col items-center justify-center gap-8 md:gap-16 px-4 md:px-0 py-32 bg-red-500"}>
            <div className={"flex flex-col md:flex-row gap-4 md:gap-16"}>
                <hgroup>
                    <h4 className={"text-4xl text-primary text-center"}>50K+</h4>
                    <p className={"text-sm text-muted-foreground text-center"}>ACTIVE MEMBERS</p>
                </hgroup>
                <hgroup>
                    <h4 className={"text-4xl text-primary text-center"}>10K+</h4>
                    <p className={"text-sm text-muted-foreground text-center"}>SUCCESS STORIES</p>
                </hgroup>
                <hgroup>
                    <h4 className={"text-4xl text-primary text-center"}>100%</h4>
                    <p className={"text-sm text-muted-foreground text-center"}>VERIFIED</p>
                </hgroup>
            </div>
            <div className="flex flex-col md:flex-row gap-2 md:gap-8">
                <p className={"md:text-center text-muted-foreground"}>✅ 100% Verified Profiles</p>
                <p className={"md:text-center text-muted-foreground"}>✅ Privacy Protected</p>
                <p className={"md:text-center text-muted-foreground"}>✅ Personal Matchmaker</p>
            </div>
        </section>
    )
}