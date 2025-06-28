export default function FrequentlyAskedQuestionsSection() {
    return(
        <section className={"flex flex-col items-center justify-center gap-16 px-4 md:px-0 py-32 bg-secondary"}>
            <div className={"space-y-4 md:space-y-8 text-center"}>
                <h3 className={"text-4xl md:text-6xl text-secondary-foreground"}>Frequently Asked Questions</h3>
                <p className={"max-w-xl text-muted-foreground"}>
                    Find answers to common questions about HeartBridge
                </p>
            </div>
        </section>
    )
}