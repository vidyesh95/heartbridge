import FooterSection from "@/components/home/footer-section";
import {Card, CardContent} from "@/components/ui/card";

export default function PrivacyPolicy() {
    return (
        <section>
            <div className={"flex flex-col items-center justify-center gap-16 px-4 md:px-0 py-32 bg-secondary"}>
                <hgroup className={"space-y-4 md:space-y-8 text-center"}>
                    <h3 className={"text-4xl md:text-6xl text-secondary-foreground"}>Privacy Policy</h3>
                    <p className={"max-w-xl text-muted-foreground"}>
                        Last updated: December 2025
                    </p>
                </hgroup>
                <Card className={"w-full max-w-5xl"}>
                    <CardContent>
                        <ol className="space-y-8 list-none p-0 [counter-reset:section-counter]">
                            <li className="space-y-4">
                                <h4 className="text-2xl font-semibold text-secondary-foreground before:content-[counter(section-counter)'.\00a0'] before:[counter-increment:section-counter]">
                                    Information We Collect
                                </h4>
                                <p>We collect information you provide directly to us, including:</p>
                                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                    <li>Personal information (name, email, phone number, date of birth)</li>
                                    <li>Profile information (photos, education, occupation, family details)</li>
                                    <li>Preferences and partner requirements</li>
                                    <li>Communication data when you contact us or other members</li>
                                    <li>Payment information for premium services</li>
                                </ul>
                            </li>
                            <li className="space-y-4">
                                <h4 className="text-2xl font-semibold text-secondary-foreground before:content-[counter(section-counter)'.\00a0'] before:[counter-increment:section-counter]">
                                    How We Use Your Information
                                </h4>
                                <p>We use the information we collect to:</p>
                                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                    <li>Provide and maintain our matrimonial services</li>
                                    <li>Match you with compatible profiles</li>
                                    <li>Communicate with you about our services</li>
                                    <li>Process payments and prevent fraud</li>
                                    <li>Improve our services and user experience</li>
                                    <li>Comply with legal obligations</li>
                                </ul>
                            </li>
                            <li className="space-y-4">
                                <h4 className="text-2xl font-semibold text-secondary-foreground before:content-[counter(section-counter)'.\00a0'] before:[counter-increment:section-counter]">
                                    Information Sharing and Disclosure
                                </h4>
                                <p>We may share your information in the following circumstances:</p>
                                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                    <li>With other members when you express mutual interest</li>
                                    <li>With our trusted service providers who assist in our operations</li>
                                    <li>When required by law or to protect our rights</li>
                                    <li>With your explicit consent</li>
                                </ul>
                                <p>We never sell your personal information to third parties.</p>
                            </li>
                            <li className="space-y-4">
                                <h4 className="text-2xl font-semibold text-secondary-foreground before:content-[counter(section-counter)'.\00a0'] before:[counter-increment:section-counter]">
                                    Data Security
                                </h4>
                                <p>We implement appropriate security measures to protect your personal information:</p>
                                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                    <li>Encryption of sensitive data in transit and at rest</li>
                                    <li>Regular security audits and updates</li>
                                    <li>Limited access to personal information on a need-to-know basis</li>
                                    <li>Secure data centers with physical and digital protection</li>
                                </ul>
                            </li>
                            <li className="space-y-4">
                                <h4 className="text-2xl font-semibold text-secondary-foreground before:content-[counter(section-counter)'.\00a0'] before:[counter-increment:section-counter]">
                                    Your Rights and Choices
                                </h4>
                                <p>You have the right to:</p>
                                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                    <li>Access and update your personal information</li>
                                    <li>Delete your account and personal data</li>
                                    <li>Control who can view your profile</li>
                                    <li>Opt-out of marketing communications</li>
                                    <li>Request a copy of your data</li>
                                </ul>
                            </li>
                            <li className="space-y-4">
                                <h4 className="text-2xl font-semibold text-secondary-foreground before:content-[counter(section-counter)'.\00a0'] before:[counter-increment:section-counter]">
                                    Data Retention
                                </h4>
                                <p>We retain your personal information for as long as your account is active or as
                                    needed to provide you services. If you wish to delete your account, we will delete
                                    your personal information within 30 days, except where we are required to retain it
                                    for legal purposes.</p>
                            </li>
                            <li className="space-y-4">
                                <h4 className="text-2xl font-semibold text-secondary-foreground before:content-[counter(section-counter)'.\00a0'] before:[counter-increment:section-counter]">
                                    Cookies and Tracking
                                </h4>
                                <p>We use cookies and similar tracking technologies to enhance your experience on our
                                    platform. You can control cookie settings through your browser preferences.</p>
                            </li>
                            <li className="space-y-4">
                                <h4 className="text-2xl font-semibold text-secondary-foreground before:content-[counter(section-counter)'.\00a0'] before:[counter-increment:section-counter]">
                                    Changes to This Policy
                                </h4>
                                <p>We may update this Privacy Policy from time to time. We will notify you of any
                                    material changes by posting the new Privacy Policy on this page and updating
                                    the &ldquo;Last updated&rdquo; date.</p>
                            </li>
                            <li className="space-y-4">
                                <h4 className="text-2xl font-semibold text-secondary-foreground before:content-[counter(section-counter)'.\00a0'] before:[counter-increment:section-counter]">Contact
                                    Us</h4>
                                <p>If you have any questions about this Privacy Policy, please contact us at:</p>
                                <ul className="list-none space-y-2 text-muted-foreground">
                                    <li>Email: privacy@heartbridgeclassic.com</li>
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