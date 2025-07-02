import {Card, CardContent} from "@/components/ui/card";
import FooterSection from "@/components/home/footer-section";

export default function TermsOfService() {
    return (
        <section>
            <div className={"flex flex-col items-center justify-center gap-16 px-4 md:px-0 py-32 bg-secondary"}>
                <hgroup className={"space-y-4 md:space-y-8 text-center"}>
                    <h3 className={"text-4xl md:text-6xl text-secondary-foreground"}>Terms of Service</h3>
                    <p className={"max-w-xl text-muted-foreground"}>
                        Last updated: December 2025
                    </p>
                </hgroup>
                <Card className={"w-full max-w-5xl"}>
                    <CardContent>
                        <ol className="space-y-8 list-none p-0 [counter-reset:section-counter]">
                            <li className="space-y-4">
                                <h4 className="text-2xl font-semibold text-secondary-foreground before:content-[counter(section-counter)'.\00a0'] before:[counter-increment:section-counter]">
                                    Acceptance of Terms
                                </h4>
                                <p>
                                    By accessing and using HeartBridge matrimonial services, you accept and agree to be
                                    bound by the terms and provision of this agreement. If you do not agree to abide by
                                    the above, please do not use this service.
                                </p>
                            </li>
                            <li className="space-y-4">
                                <h4 className="text-2xl font-semibold text-secondary-foreground before:content-[counter(section-counter)'.\00a0'] before:[counter-increment:section-counter]">
                                    Eligibility
                                </h4>
                                <p>To use our services, you must:</p>
                                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                    <li>Be at least 18 years of age</li>
                                    <li>Be legally eligible to marry under applicable law</li>
                                    <li>Provide accurate and truthful information</li>
                                    <li>Not be married or in a committed relationship</li>
                                    <li>Use the service for legitimate matrimonial purposes only</li>
                                </ul>
                            </li>
                            <li className="space-y-4">
                                <h4 className="text-2xl font-semibold text-secondary-foreground before:content-[counter(section-counter)'.\00a0'] before:[counter-increment:section-counter]">
                                    User Responsibilities
                                </h4>
                                <p>As a user of our platform, you agree to:</p>
                                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                    <li>Provide accurate, current, and complete information</li>
                                    <li>Maintain the security of your password and account</li>
                                    <li>Respect other users and communicate appropriately</li>
                                    <li>Not create fake or duplicate profiles</li>
                                    <li>Not use the service for commercial purposes</li>
                                    <li>Comply with all applicable laws and regulations</li>
                                </ul>
                            </li>
                            <li className="space-y-4">
                                <h4 className="text-2xl font-semibold text-secondary-foreground before:content-[counter(section-counter)'.\00a0'] before:[counter-increment:section-counter]">
                                    Prohibited Activities
                                </h4>
                                <p>You may not use our platform to:</p>
                                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                    <li>Upload inappropriate, offensive, or misleading content</li>
                                    <li>Harass, abuse, or harm other users</li>
                                    <li>Solicit money or personal favors</li>
                                    <li>Promote other websites or services</li>
                                    <li>Attempt to gain unauthorized access to our systems</li>
                                    <li>Use automated scripts or bots</li>
                                </ul>
                            </li>
                            <li className="space-y-4">
                                <h4 className="text-2xl font-semibold text-secondary-foreground before:content-[counter(section-counter)'.\00a0'] before:[counter-increment:section-counter]">
                                    Privacy and Data Protection
                                </h4>
                                <p>
                                    Your privacy is important to us. Please review our Privacy Policy, which also
                                    governs your use of the service, to understand our practices regarding your personal
                                    information.
                                </p>
                            </li>
                            <li className="space-y-4">
                                <h4 className="text-2xl font-semibold text-secondary-foreground before:content-[counter(section-counter)'.\00a0'] before:[counter-increment:section-counter]">
                                    Payment and Subscription Terms
                                </h4>
                                <p>For premium services:</p>
                                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                    <li>All fees are non-refundable unless otherwise stated</li>
                                    <li>Subscriptions auto-renew unless cancelled</li>
                                    <li>We reserve the right to change pricing with notice</li>
                                    <li>Payment information must be accurate and current</li>
                                </ul>
                            </li>
                            <li className="space-y-4">
                                <h4 className="text-2xl font-semibold text-secondary-foreground before:content-[counter(section-counter)'.\00a0'] before:[counter-increment:section-counter]">
                                    Content Ownership and Rights
                                </h4>
                                <p>
                                    You retain ownership of the content you submit to our platform. However, by
                                    uploading content, you grant us a license to use, display, and distribute that
                                    content as part of our service.
                                </p>
                            </li>
                            <li className="space-y-4">
                                <h4 className="text-2xl font-semibold text-secondary-foreground before:content-[counter(section-counter)'.\00a0'] before:[counter-increment:section-counter]">
                                    Disclaimer of Warranties
                                </h4>
                                <p>
                                    Our service is provided &ldquo;as is&rdquo; without warranties of any kind. We do
                                    not guarantee that you will find a suitable match or that our service will meet your
                                    specific requirements.
                                </p>
                            </li>
                            <li className="space-y-4">
                                <h4 className="text-2xl font-semibold text-secondary-foreground before:content-[counter(section-counter)'.\00a0'] before:[counter-increment:section-counter]">
                                    Limitation of Liability
                                </h4>
                                <p>
                                    HeartBridge Classic shall not be liable for any indirect, incidental, special,
                                    consequential, or punitive damages resulting from your use of the service.
                                </p>
                            </li>
                            <li className="space-y-4">
                                <h4 className="text-2xl font-semibold text-secondary-foreground before:content-[counter(section-counter)'.\00a0'] before:[counter-increment:section-counter]">
                                    Termination
                                </h4>
                                <p>
                                    We may terminate or suspend your account at any time for any reason, including
                                    violation of these terms. You may also terminate your account at any time through
                                    your account settings.
                                </p>
                            </li>
                            <li className="space-y-4">
                                <h4 className="text-2xl font-semibold text-secondary-foreground before:content-[counter(section-counter)'.\00a0'] before:[counter-increment:section-counter]">
                                    Changes to Terms
                                </h4>
                                <p>
                                    We reserve the right to modify these terms at any time. We will notify users of
                                    significant changes by posting the updated terms on our website.
                                </p>
                            </li>
                            <li className="space-y-4">
                                <h4 className="text-2xl font-semibold text-secondary-foreground before:content-[counter(section-counter)'.\00a0'] before:[counter-increment:section-counter]">
                                    Contact Information
                                </h4>
                                <p>If you have any questions about these Terms of Service, please contact us at:</p>
                                <ul className="list-none space-y-2 text-muted-foreground">
                                    <li>Email: legal@heartbridgeclassic.com</li>
                                    <li>Phone: +91 98765 43210</li>
                                    <li>Address: 123 Wedding Street, Love Plaza, Mumbai, Maharashtra 400001</li>
                                </ul>
                            </li>
                        </ol>
                    </CardContent>
                </Card>
            </div>
            <FooterSection/>
        </section>
    )
}